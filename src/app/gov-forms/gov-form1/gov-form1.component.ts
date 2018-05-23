import { Component, OnInit, EventEmitter, Output, OnDestroy, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gov-form1',
  templateUrl: './gov-form1.component.html',
  styleUrls: ['./gov-form1.component.css']
})
export class GovForm1Component extends TranslateComponent implements OnInit, OnDestroy {

  // Inputs
  private accessCode = null;
  private routerSubscription;
  private userDetail = null;

  readonly dpiRatio = 96 / 72;
  private pageHeight = 0;

  private form = null;
  private inputList: FormInput[] = [];
  private inputNames = [];

  private loadForm = null; // Keep track of this.formService.getForm()
  private _inputTextFields = {};
  private checkboxValue = {};

  private _pdfContent;

  private _formSubmitted = false;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();

  constructor(
    settings: SettingService,
    private socketioService: SocketioService,
    private userinfoService: UserinfoService,
    private formService: FormService,
    private router: Router,
    private _router: ActivatedRoute,
    private elementRef: ElementRef,
    private domSanitizer: DomSanitizer
  ) {
    super(settings);
  }

  get inputTextFields() {
    return this._inputTextFields;
  }
  get pdfContent() {
    return this._pdfContent;
  }

  ngOnInit() {
    this.routerSubscription = this._router.params.subscribe(params => {
      if (params.accessCode !== undefined) {
        this.accessCode = params.accessCode;

        this.formService.getFormDetail(this.accessCode)
          .then(result => { if (result.status) this.form = result.data; });

        const userinfo = Object.assign({}, this.userinfoService.getUserinfo());
        this.userinfoService.getUserDetail(userinfo)
          .then(result => { if (result.status) this.userDetail = result.data; });
      }
    });

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

  pdfPath() { return '../public/forms/' + this.form.pdfForm; }
  pdfLoadComplete(pdf: PDFDocumentProxy) {
    d3.timeout(() => {
      const host = d3.select(this.elementRef.nativeElement);
      const bbox1 = host.select('.canvasWrapper').node().getBoundingClientRect(),
        bbox2 = host.select('.pdfViewer.removePageBorders').node().getBoundingClientRect();
      d3.select(this.elementRef.nativeElement).select('.button-container')
        .style('width', bbox1.width + 'px')
        .style('top', (bbox2.height + 20) + 'px');

      this.pageHeight = host.select('.page').node().getBoundingClientRect().height + 10;
      for (let i = 1; i <= pdf.numPages; i++) {
        let currentPage = null; // track the current page
        pdf.getPage(i)
          .then(p => {
            currentPage = p;
            console.log(p.getAnnotations());
            return p.getAnnotations(); // get the annotations of the current page
          })
          .then(ann => {
            const annotations = (<any>ann) as PDFAnnotationData[];

            annotations
              .filter(a => a.subtype === 'Widget') // get the form field annotation only
              .forEach(a => {
                // get the rectangle that represent the single field and resize it according to the current DPI
                const fieldRect = currentPage.getViewport(this.dpiRatio)
                  .convertToViewportRectangle(a.rect);

                this.addFormInput(a, fieldRect, i); // add the corresponding input
              });
          });
      }
    }, 200);
  }
  addFormInput(annotation, rect: number[] = null, page = 0) {
    if (annotation.fieldName === 'ลงชื่อ') {
      const tempAnnotation = Object.assign({}, annotation),
        tempRect = rect.slice(0, rect.length);
      tempAnnotation.fieldName = 'dpstSignature';
      tempRect[1] -= 29;
      tempRect[3] -= 29;
      this.inputList.push(this.createFormInput(annotation, tempRect, page));
      this.inputList.push(this.createFormInput(tempAnnotation, rect, page));
    } else this.inputList.push(this.createFormInput(annotation, rect, page));
  }
  createFormInput(annotation, rect: number[] = null, page) {
    // const formControl = new FormControl(annotation.buttonValue || '');

    const input = new FormInput(annotation.fieldName);
    input.name = annotation.fieldName.replace(/ /g, '-');
    input.name = input.name.replace(/\./g, '-');
    input.name = input.name.replace(/--/g, '-');
    if (this.inputNames.indexOf(input.name) < 0) this.inputNames.push(input.name);
    else {
      const repeated = this.inputNames.filter(d => d === input.name);
      this.inputNames.push(input.name);
      input.name = input.name + repeated.length;
    }

    if (annotation.fieldType === 'Tx') {
      input.type = 'text';
      // For multiple fields of the same name (used for linking values),
      // use value from the first declaration.
      this._inputTextFields[input.fieldName] =
        this._inputTextFields[input.fieldName] || annotation.fieldValue || '';
      input.textAlignment = annotation.textAlignment;
    } else if (annotation.fieldType === 'Btn') {
      input.type = 'checkbox';
      input.value = '';
    }

    if (rect) {
      input.top = rect[1] - (rect[1] - rect[3]) + (this.pageHeight * (page - 1));
      input.left = rect[0];
      input.height = (rect[1] - rect[3]);
      input.width = (rect[2] - rect[0]);
    }

    return input;
  }

  getInputPosition(formInput: FormInput) {
    const style = {
      top: `${formInput.top}px`,
      left: `${formInput.left}px`,
      height: `${formInput.height}px`,
      width: `${formInput.width}px`,
    };
    if (formInput.textAlignment === 1)
      style['text-align'] = 'center';
    return style;
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
    const values = { ...this._inputTextFields, ...this.checkboxValue };
    this.formService.submitForm(this.userDetail.userId, this.form._id, values)
      .then(result => {
        this._formSubmitted = true;
        this.formService.formSubmitted.emit(result);
        // this.formSubmitted.emit(result);
      });
  }
  editSubmittedGovForm(govForm: NgForm) {
    if (this.formService.getForm() !== null) {
      const checkbox = {};
      Object.keys(this.loadForm.formValue).map(key => {
        if (this.loadForm.formValue[key] === true) checkbox[key] = true;
      });
      const values = { ...this._inputTextFields, ...checkbox, ...this.checkboxValue };
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
    if (this.userinfoService.isAdmin) {
      this.router.navigate(['/admin-panel/submitted-forms']);
    } else {
      this.formService.setMode();
      this.router.navigate(['/']);
    }
  }
  adminSetSubmittedFormStatus(status) {
    if (this.userinfoService.isAdmin) {
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
    if (this.userinfoService.isAdmin) {
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

  downloadPDF() {
    // TODO pipe PDF to browser
    this.formService.downloadPDF(this.formService.getForm()._id)
      .then((data: any) => {
        console.log('pdf-data', data);
        this._pdfContent = data;
        // const pdfFile = new Blob([data._body], { type: 'application/pdf' });
        // this._pdfContent = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(pdfFile));
        // console.log('pdf', this._pdfContent);
      });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    if (this.formService.getRole() !== 'Admin' || this.formService.getMode() !== 'ByPass') this.formService.setMode();

    // Unbind Socket.io
    this.socketioService.getSocket().removeAllListeners('announce-form-user-status');
    this.socketioService.getSocket().removeAllListeners('announce-form-deleted');
  }

}
