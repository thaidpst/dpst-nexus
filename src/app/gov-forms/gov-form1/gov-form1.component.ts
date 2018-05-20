import { Component, OnInit, EventEmitter, Output, OnDestroy, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SocketioService } from '../../services/socketio.service';
import { SettingService } from '../../services/setting.service';
import { UserinfoService } from '../../services/userinfo.service';
import { FormService } from '../../services/form.service';

import { TranslateComponent } from './../../languages/translate.component';

import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { PDFAnnotationData } from 'pdfjs-dist';
import { FormControl } from '@angular/forms';
import { FormInput } from '../../schemas/form-input';
import * as d3 from 'd3';

@Component({
  selector: 'app-gov-form1',
  templateUrl: './gov-form1.component.html',
  styleUrls: ['./gov-form1.component.css']
})
export class GovForm1Component extends TranslateComponent implements OnInit, OnDestroy {

  // Inputs
  private accessCode = 'gov-form1';
  private requiredProof = false;

  private form = null;
  private userDetail = null;
  private _formSubmitted = false;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();

  readonly dpiRatio = 96 / 72;
  public inputList: FormInput[] = [];
  private inputNames = [];

  private loadForm = null; // Keep track of this.formService.getForm()
  private checkboxValue = {};  

  constructor(
    settings: SettingService,
    private socketioService: SocketioService,
    private userinfoService: UserinfoService,
    private formService: FormService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    super(settings);
  }

  ngOnInit() {
    this.formService.getFormDetail(this.accessCode)
      .then(result => { if (result.status) this.form = result.data;});

    const userinfo = Object.assign({}, this.userinfoService.getUserinfo());
    this.userinfoService.getUserDetail(userinfo)
      .then(result => { if (result.status) this.userDetail = result.data; });

    // Load form
    this.loadForm = Object.assign({}, this.formService.getForm());
    this.socketioService.getSocket().on('announce-form-user-status', function (form) {
      this.externalFormUpdateProcess(form._id);
    }.bind(this));
    this.socketioService.getSocket().on('announce-form-deleted', function (form) {
      this.externalFormUpdateProcess(form._id);
    }.bind(this));
  }
  externalFormUpdateProcess(formId) {
    if (this.loadForm !== null && this.loadForm._id === formId) {
      this.goToUserHistoryPage();
    }
  }

  pdfPath() {return '../public/forms/' + this.form.pdfForm;}
  pdfLoadComplete(pdf: PDFDocumentProxy) {
    d3.timeout(()=>{
      let bbox = d3.select(this.elementRef.nativeElement).select('.canvasWrapper').node().getBoundingClientRect();
      d3.select(this.elementRef.nativeElement).select('.button-container')
        .style('width', bbox.width+'px')
        .style('top', (bbox.height+20)+'px');
    }, 200);

    for (let i = 1; i<=pdf.numPages; i++) {
      let currentPage = null; // track the current page
      pdf.getPage(i)
        .then(p => {
          currentPage = p;
          return p.getAnnotations(); // get the annotations of the current page
        })
        .then(ann => {
          // ugly cast due to missing typescript definitions, please contribute to complete @types/pdfjs-dist
          const annotations = (<any>ann) as PDFAnnotationData[];

          annotations
            .filter(a=>a.subtype==='Widget') // get the form field annotation only
            .forEach(a=>{
              // get the rectangle that represent the single field and resize it according to the current DPI
              const fieldRect = currentPage.getViewport(this.dpiRatio)
                .convertToViewportRectangle(a.rect);

              this.addFormInput(a, fieldRect); // add the corresponding input
            });
        });
    }
  }
  addFormInput(annotation, rect: number[] = null) {
    if (annotation.fieldName==='ลงชื่อ') {
      let tempAnnotation = Object.assign({}, annotation),
          tempRect = rect.slice(0, rect.length);
      tempAnnotation.fieldName = 'dpstSignature';
      tempRect[1] -= 29;
      tempRect[3] -= 29;
      this.inputList.push(this.createFormInput(annotation, tempRect));
      this.inputList.push(this.createFormInput(tempAnnotation, rect));
    } else this.inputList.push(this.createFormInput(annotation, rect));
  }
  createFormInput(annotation, rect: number[] = null) {
    let formControl = new FormControl(annotation.buttonValue || '');

    const input = new FormInput();
    input.name = annotation.fieldName.replace(/ /g, '-');
    input.name = input.name.replace(/\./g, '-');
    input.name = input.name.replace(/--/g, '-');
    if (this.inputNames.indexOf(input.name)<0) this.inputNames.push(input.name);
    else {
      let repeated = this.inputNames.filter(d=>{return d==input.name});
      this.inputNames.push(input.name);
      input.name = input.name + repeated.length;
    }

    if (annotation.fieldType==='Tx') {
      input.type = 'text';
      input.value = annotation.buttonValue || '';
    } else if (annotation.fieldType==='Btn') {
      input.type = 'checkbox';
      input.value = '';
    }

    if (rect) {
      input.top = rect[1] - (rect[1] - rect[3]);
      input.left = rect[0];
      input.height = (rect[1] - rect[3]);
      input.width = (rect[2] - rect[0]);
    }

    return input;
  }

  getInputPosition(formInput: FormInput) {
    return {
        top: `${formInput.top}px`,
        left: `${formInput.left}px`,
        height: `${formInput.height}px`,
        width: `${formInput.width}px`,
    };
  }
  checkboxChange(event, name) {
    this.checkboxValue[name] = event.currentTarget.checked;
  }
  default(value) {
    if (value === undefined) return '';
    else return value;
  }

  goToFormsPage() {
    // this.router.navigate(['/forms/all-forms']);
    this.router.navigate(['/forms']);
  }
  goToUserHistoryPage() {
    this.router.navigate(['/user-panel/history']);
  }

  submitGovForm(govForm: NgForm) {
    let values = {...govForm.value, ...this.checkboxValue};
    this.formService.submitForm(this.userDetail.userId, this.form._id, values)
      .then(result => {
        this._formSubmitted = true;
        this.formService.formSubmitted.emit(result);
        // this.formSubmitted.emit(result);
      });
  }
  editSubmittedGovForm(govForm: NgForm) {
    if (this.formService.getForm() !== null) {
      let checkbox = {};
      Object.keys(this.loadForm.formValue).map(key=>{
        if (this.loadForm.formValue[key]==true) checkbox[key] = true;
      });
      let values = {...govForm.value, ...checkbox, ...this.checkboxValue};
      this.formService.editSubmittedGovForm(this.formService.getForm()._id, values)
        .then(result => {
          if (result.status) {
            this.router.navigate(['/user-panel/history']);
          }
        });
    }
  }
  deleteSubmittedForm() {
    if (this.loadForm !== null) {
      this.formService.deleteSubmittedForm(this.userinfoService.getUserinfo()._id, this.loadForm).then(result => {
        if (result.status) {
          this.socketioService.deletedUserForm(this.loadForm);
          this.router.navigate(['/user-panel/history']);
        }
      });
    }
  }

  // Admin privilage
  backToAdminForms() {
    if (this.userinfoService.getUserinfo().level >= 7) {
      this.router.navigate(['/admin-panel/submitted-forms']);
    } else {
      this.formService.setMode();
      this.router.navigate(['/']);
    }
  }
  adminSetSubmittedFormStatus(status) {
    if (this.userinfoService.getUserinfo().level >= 7) {
      const approver = Object.assign({}, this.userinfoService.getUserinfo());
      this.formService.setSubmittedFormStatus(this.loadForm, status, approver).then(result => {
        if (result.status) {
          this.socketioService.submittedFormStatusChange(this.loadForm);
          this.router.navigate(['/admin-panel/submitted-forms']);
        }
      });
    } else {
      this.formService.setMode();
      this.router.navigate(['/']);
    }
  }
  adminDeleteSubmittedForm() {
    if (this.userinfoService.getUserinfo().level >= 7) {
      this.formService.deleteSubmittedForm(this.loadForm.userId, this.loadForm).then(result => {
        if (result.status) {
          this.socketioService.deletedUserForm(this.loadForm);
          this.router.navigate(['/admin-panel/submitted-forms']);
        }
      });
    } else {
      this.formService.setMode();
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    if (this.formService.getRole() !== 'Admin' || this.formService.getMode() !== 'ByPass') this.formService.setMode();

    // Unbind Socket.io
    this.socketioService.getSocket().removeAllListeners('announce-form-user-status');
    this.socketioService.getSocket().removeAllListeners('announce-form-deleted');
  }

}
