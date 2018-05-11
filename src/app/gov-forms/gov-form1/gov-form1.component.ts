import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  private accessCode = 'gov-form1';
  private form = null;
  private userDetail = null;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();

  constructor(
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
  }

  default(value) {
    if (value===undefined) return '';
    else return value;
  }
  goToFormsPage() {
    this.pageService.setPage('Forms'); this.pageService.setSubpage('All forms');
    this.formService.setMode();
  }
  goToUserHistoryPage() {
    this.pageService.setPage('User panel'); this.pageService.setSubpage('History');
    this.formService.setMode();
  }
  goToAdminPanel() {
    if (this.userinfoService.getUserinfo().level >= 7) {
      this.pageService.setPage('Admin panel'); this.pageService.setSubpage('User table');
      this.formService.setMode();
    } else {
      this.pageService.setPage('Homepage');
      this.formService.setMode();
    }
  }

  submitGovForm(govForm: NgForm) {
    this.formService.submitForm(this.userDetail.userId, this.form._id, govForm.value)
      .then(result=>{
        this.formService.setMode();        
        this.formSubmitted.emit(result);
      });
  }
  editSubmittedGovForm(govForm: NgForm) {
    if (this.formService.getForm()!==null) {
      this.formService.editSubmittedGovForm(this.formService.getForm()._id, govForm.value)
        .then(result=>{       
          if (result.status) {
            if (this.userinfoService.getUserinfo().level >= 7 && this.formService.getRole()=='Admin') {
              this.pageService.setPage('Admin panel'); this.pageService.setSubpage('User table');
              this.formService.setMode();
            } else {
              this.pageService.setPage('User panel'); this.pageService.setSubpage('History');
              this.formService.setMode();
            }
          }
        });
    }
  }

}
