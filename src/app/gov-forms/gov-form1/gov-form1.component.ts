import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SocketioService } from '../../services/socketio.service';
import { SettingService } from '../../services/setting.service';
import { UserinfoService } from '../../services/userinfo.service';
import { FormService } from '../../services/form.service';

import { TranslateComponent } from './../../languages/translate.component';

@Component({
  selector: 'app-gov-form1',
  templateUrl: './gov-form1.component.html',
  styleUrls: ['./gov-form1.component.css']
})
export class GovForm1Component extends TranslateComponent implements OnInit, OnDestroy {

  // Inputs
  private accessCode = 'gov-form1';
  private formImages = [
    'assets/img/govForms/gov-form1.jpg'
  ];
  private requiredProof = false;

  private form = null;
  private userDetail = null;
  private _formSubmitted = false;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();
  private loadForm = null; // Keep track of this.formService.getForm()

  constructor(
    settings: SettingService,
    private socketioService: SocketioService,
    private userinfoService: UserinfoService,
    private formService: FormService,
    private router: Router
  ) {
    super(settings);
  }

  ngOnInit() {
    this.formService.getFormDetail(this.accessCode)
      .then(result => { if (result.status) this.form = result.data; });

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

  default(value) {
    if (value === undefined) return '';
    else return value;
  }

  goToFormsPage() {
    this.router.navigate(['/forms/all-forms']);
  }
  goToUserHistoryPage() {
    this.router.navigate(['/user-panel/history']);
  }

  submitGovForm(govForm: NgForm) {
    this.formService.submitForm(this.userDetail.userId, this.form._id, govForm.value)
      .then(result => {
        console.log('gov1 submitted');
        this._formSubmitted = true;
        this.formService.formSubmitted.emit(result);
        // this.formSubmitted.emit(result);
      });
  }
  editSubmittedGovForm(govForm: NgForm) {
    if (this.formService.getForm() !== null) {
      this.formService.editSubmittedGovForm(this.formService.getForm()._id, govForm.value)
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
