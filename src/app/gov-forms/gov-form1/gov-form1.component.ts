import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SocketioService } from '../../services/socketio.service';
import { PageService } from '../../services/page.service';
import { SettingService } from '../../services/setting.service';
import { UserinfoService } from '../../services/userinfo.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-gov-form1',
  templateUrl: './gov-form1.component.html',
  styleUrls: ['./gov-form1.component.css']
})
export class GovForm1Component implements OnInit {

  // Inputs
  private accessCode = 'gov-form1';
  private formImages = [
    'assets/img/govForms/gov-form1.jpg'
  ];
  private requiredProof = false;

  private form = null;
  private userDetail = null;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();
  private loadForm = null; // Keep track of this.formService.getForm()

  constructor(
    private socketioService: SocketioService,
    private pageService: PageService,
    private settingService: SettingService,
    private userinfoService: UserinfoService,
    private formService: FormService
  ) { }

  ngOnInit() {
    this.formService.getFormDetail(this.accessCode)
      .then(result=>{if(result.status) this.form = result.data});

    let userinfo = Object.assign({}, this.userinfoService.getUserinfo());
    this.userinfoService.getUserDetail(userinfo)
      .then(result=>{if(result.status) this.userDetail = result.data});

    // Load form
    this.loadForm = Object.assign({}, this.formService.getForm());
    this.socketioService.getSocket().on('announce-form-user-status', function(form) {
      this.externalFormUpdateProcess(form._id);
    }.bind(this));
    this.socketioService.getSocket().on('announce-form-deleted', function(form) {
      this.externalFormUpdateProcess(form._id);
    }.bind(this));
  }
  externalFormUpdateProcess(formId) {
    if (this.loadForm!==null && this.loadForm._id==formId) {
      this.goToUserHistoryPage();
    }
  }

  default(value) {
    if (value===undefined) return '';
    else return value;
  }

  goToFormsPage() {this.pageService.setPage('Forms'); this.pageService.setSubpage('All forms');}
  goToUserHistoryPage() {this.pageService.setPage('User panel'); this.pageService.setSubpage('History');}
  
  submitGovForm(govForm: NgForm) {
    this.formService.submitForm(this.userDetail.userId, this.form._id, govForm.value)
      .then(result=>{
        this.formSubmitted.emit(result);
      });
  }
  editSubmittedGovForm(govForm: NgForm) {
    if (this.formService.getForm()!==null) {
      this.formService.editSubmittedGovForm(this.formService.getForm()._id, govForm.value)
        .then(result=>{       
          if (result.status) {
            this.pageService.setPage('User panel'); this.pageService.setSubpage('History');
          }
        });
    }
  }
  deleteSubmittedForm() {
    if (this.loadForm!==null) {
      this.formService.deleteSubmittedForm(this.userinfoService.getUserinfo()._id, this.loadForm).then(result=>{
        if (result.status) {
          this.socketioService.deletedUserForm(this.loadForm);
          this.goToUserHistoryPage();
        }
      });
    }
  }

  // Admin privilage
  backToAdminForms() {
    if (this.userinfoService.getUserinfo().level>=7) {
      this.pageService.setPage('Admin panel');
      this.pageService.setSubpage('Submitted forms');
    } else {
      this.formService.setMode();
      this.pageService.setPage('Homepage');
    }
  }
  adminSetSubmittedFormStatus(status) {
    if (this.userinfoService.getUserinfo().level>=7) {
      let approver = Object.assign({}, this.userinfoService.getUserinfo());
      this.formService.setSubmittedFormStatus(this.loadForm, status, approver).then(result=>{
        if (result.status) {
          this.socketioService.submittedFormStatusChange(this.loadForm);
          this.pageService.setPage('Admin panel');
          this.pageService.setSubpage('Submitted forms');
        }
      });
    } else {
      this.formService.setMode();
      this.pageService.setPage('Homepage');
    }
  }
  adminDeleteSubmittedForm() {
    if (this.userinfoService.getUserinfo().level>=7) {
      this.formService.deleteSubmittedForm(this.loadForm.userId, this.loadForm).then(result=>{
        if (result.status) {
          this.socketioService.deletedUserForm(this.loadForm);
          this.pageService.setPage('Admin panel');
          this.pageService.setSubpage('Submitted forms');
        }
      });
    } else {
      this.formService.setMode();
      this.pageService.setPage('Homepage');
    }
  }

  ngOnDestroy() {
    if (this.formService.getRole()!='Admin' || this.formService.getMode()!='ByPass') this.formService.setMode();
  
    // Unbind Socket.io
    this.socketioService.getSocket().removeAllListeners('announce-form-user-status');
    this.socketioService.getSocket().removeAllListeners('announce-form-deleted');
  }

}
