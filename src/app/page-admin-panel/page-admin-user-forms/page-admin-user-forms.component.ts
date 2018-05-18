import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SocketioService } from '../../services/socketio.service';
import { PageService } from '../../services/page.service';
import { SettingService } from '../../services/setting.service';
import { UserinfoService } from '../../services/userinfo.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-page-admin-user-forms',
  templateUrl: './page-admin-user-forms.component.html',
  styleUrls: ['./page-admin-user-forms.component.css']
})
export class PageAdminUserFormsComponent implements OnInit {

  private pagination = [];
  
  private getAdminFormsSubscription: Subscription;
  private formCategory = [];  
  private criteria = {
    page: 0, start: 0, limit: 25, totalForms: 0,
    sort: 'None', search: 'EmptyNone', category: 'None'
  };
  private adminForms = null;

  private getSubmittedFormsSubscription: Subscription;
  private currentForm = null;  
  private tableCriteria = {page: 0, start: 0, limit: 25, totalForms: 0, sort: 'None'};
  private submittedForms = null;

  private formOnHand = null;

  constructor(
    private socketioService: SocketioService,
    private pageService: PageService,
    private settingService: SettingService,
    private userinfoService: UserinfoService,
    private formService: FormService
  ) { }

  ngOnInit() {
    if (this.formService.getMode()=='ByPass' && this.formService.getRole()=='Admin') {
      this.tableCriteria = this.formService.getCriteria();
      this.currentForm = this.formService.getCurrentForm();
      this.formService.setMode();
    }

    // Subscription
    this.getAdminFormsSubscription = this.formService.observeAdminForms().subscribe(result=>{
      if (result.status) {
        this.adminForms = result.data;
        this.criteria.totalForms = result.totalForms;

        this.pagination = [];
        let count = 0;
        while (count*this.criteria.limit < this.criteria.totalForms) {
          this.pagination.push(count);          
          count += 1;
        }
      }
    });
    this.getSubmittedFormsSubscription = this.formService.observeAdminSubmittedForms().subscribe(result=>{
      if (result.status) {
        this.submittedForms = result.data;
        this.tableCriteria.totalForms = result.totalForms;
        
        this.pagination = [];
        let count = 0;
        while (count*this.tableCriteria.limit < this.tableCriteria.totalForms) {
          this.pagination.push(count);          
          count += 1;
        }
      }
    });

    // Initialize
    this.formService.getFormCategory().then(result=>{
      if (result.status) this.formCategory = result.data;
    });
    if (this.currentForm===null) this.formService.adminGetActiveForms(this.criteria);
    else this.formService.adminGetSubmittedForms(this.currentForm, this.tableCriteria);

    // Get announcement from Socket.io
    this.socketioService.getSocket().on('announce-form-submitted', function(formId) {
      this.socketioUpdateProcess(formId);
    }.bind(this));
    this.socketioService.getSocket().on('announce-form-deleted', function(form) {
      this.socketioUpdateProcess(form.formId);
    }.bind(this));
    this.socketioService.getSocket().on('announce-form-status', function(formId) {
      this.socketioUpdateProcess(formId);
    }.bind(this));
  }
  socketioUpdateProcess(formId) {
    if (this.currentForm===null && this.adminForms!==null) {
      let formList = this.adminForms.map(d=>{return d._id});
      if (formList.indexOf(formId)>-1) this.formService.adminGetActiveForms(this.criteria);
    } else if (this.currentForm!==null) {
      if (this.currentForm._id==formId) this.formService.adminGetSubmittedForms(this.currentForm, this.tableCriteria);
    }
  }

  // Page 1 process
  formPreview(form) {
    if (form.previewUrl===undefined || form.previewUrl===null || form.previewUrl=='') return 'assets/img/formPreview/base.jpg';
    else return form.previewUrl;
  }
  formOwner(form) {
    if (form.owner===undefined || form.owner===null || form.owner=='') return 'DPST.';
    else return form.owner;
  }
  dateFromObjectId(objectId) {
    let date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
  }
  changeFormCategory(category) {
    if (category=='All forms') this.criteria.category = 'None';
    else this.criteria.category = category;
    this.formService.adminGetActiveForms(this.criteria);
  }

  formLimitChange(limit) {
    this.criteria.page = 0;
    this.criteria.start = 0;
    this.criteria.limit = limit;
    this.criteria.totalForms = 0;
    this.pagination = [];
    this.adminForms = null;
    this.formService.adminGetActiveForms(this.criteria);
  }
  paginationChangePage(page) {
    this.criteria.page = page;
    this.criteria.start = page * this.criteria.limit;
    this.formService.adminGetActiveForms(this.criteria);
  }
  previouseFormPage() {
    if (this.criteria.page > 0) {
      this.criteria.page -= 1;
      this.criteria.start = this.criteria.page * this.criteria.limit;
      this.formService.adminGetActiveForms(this.criteria);
    }
  }
  nextFormPage() {
    if ((this.criteria.page+1)*this.criteria.limit < this.criteria.totalForms) {
      this.criteria.page += 1;
      this.criteria.start = this.criteria.page * this.criteria.limit;
      this.formService.adminGetActiveForms(this.criteria);
    }
  }
  formSortChange(sort) {
    this.criteria.sort = sort;
    this.formService.adminGetActiveForms(this.criteria);
  }
  formSearch(keyword) {
    keyword = keyword.trim();
    if ((this.criteria.search=='EmptyNone' && keyword=='') || this.criteria.search==keyword) {}
    else if (keyword=='') {
      this.criteria.search = 'EmptyNone';
      this.formService.adminGetActiveForms(this.criteria);
    } else {      
      this.criteria.search = keyword;
      this.formService.adminGetActiveForms(this.criteria);
    }
  }

  // Page 2 process
  goToFormSubmissionTable(form) {
    this.currentForm = form;
    this.formService.adminGetSubmittedForms(this.currentForm, this.tableCriteria);
  }
  goBackToFormPage() {
    this.currentForm = null;
    this.tableCriteria = {page: 0, start: 0, limit: 25, totalForms: 0, sort: 'None'};
    this.submittedForms = null;
    this.formService.setMode();
    this.formService.adminGetActiveForms(this.criteria)
  }

  submittedFormLimitChange(limit) {
    this.tableCriteria.page = 0;
    this.tableCriteria.start = 0;
    this.tableCriteria.limit = limit;
    this.tableCriteria.totalForms = 0;
    this.pagination = [];
    this.submittedForms = null;
    this.formService.adminGetSubmittedForms(this.currentForm, this.tableCriteria);
  }
  paginationSubmittedChangePage(page) {
    this.tableCriteria.page = page;
    this.tableCriteria.start = page * this.tableCriteria.limit;
    this.formService.adminGetSubmittedForms(this.currentForm, this.tableCriteria);
  }
  previouseSubmittedFormPage() {
    if (this.tableCriteria.page > 0) {
      this.tableCriteria.page -= 1;
      this.tableCriteria.start = this.tableCriteria.page * this.tableCriteria.limit;
      this.formService.adminGetSubmittedForms(this.currentForm, this.tableCriteria);
    }
  }
  nextSubmittedFormPage() {
    if ((this.tableCriteria.page+1)*this.tableCriteria.limit < this.tableCriteria.totalForms) {
      this.tableCriteria.page += 1;
      this.tableCriteria.start = this.tableCriteria.page * this.tableCriteria.limit;
      this.formService.adminGetSubmittedForms(this.currentForm, this.tableCriteria);
    }
  }
  submittedFormSortChange(sort) {
    this.tableCriteria.sort = sort;
    this.formService.adminGetSubmittedForms(this.currentForm, this.tableCriteria);
  }

  setSubmittedFormStatus(form, status) {
    let approver = Object.assign({}, this.userinfoService.getUserinfo());
    this.formService.setSubmittedFormStatus(form, status, approver).then(result=>{
      if (result.status) {
        this.socketioService.submittedFormStatusChange(form);
      }
    });
  }
  viewSubmittedForm(form) {
    if (this.userinfoService.getUserinfo().level >= 7) {
      this.formService.setMode('ByPass', form, 'Admin', this.currentForm, this.tableCriteria);
      this.pageService.setPage('Government form');
      this.pageService.setSubpage(this.currentForm.accessCode);
    } else {
      this.pageService.setPage('Homepage');
    }
  }

  // Delete submitted form process
  tryToDeleteSubmittedForm(form) {this.formOnHand = form;}
  goBackToSubmittedFormTable() {
    this.formOnHand = null;
    this.formService.adminGetSubmittedForms(this.currentForm, this.tableCriteria);
  }
  deleteSubmittedForm() {
    if (this.formOnHand!==null) {
      this.formService.deleteSubmittedForm(this.formOnHand.userId, this.formOnHand).then(result=>{
        if (result.status) {
          this.submittedForms = null;
          this.socketioService.deletedUserForm(this.formOnHand);
          this.formOnHand = null;
        }
      });
    }
  }

  ngOnDestroy() {
    this.getAdminFormsSubscription.unsubscribe();
    this.getSubmittedFormsSubscription.unsubscribe();
    if (this.formService.getRole()!='Admin') this.formService.setMode();

    // Unbind Socket.io
    this.socketioService.getSocket().removeAllListeners('announce-form-submitted');
    this.socketioService.getSocket().removeAllListeners('announce-form-deleted');
    this.socketioService.getSocket().removeAllListeners('announce-form-status');
  }

}
