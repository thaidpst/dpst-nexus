import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SocketioService } from '../../services/socketio.service';
import { SettingService } from '../../services/setting.service';
import { UserinfoService } from '../../services/userinfo.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-page-user-history',
  templateUrl: './page-user-history.component.html',
  styleUrls: ['./page-user-history.component.css']
})
export class PageUserHistoryComponent implements OnInit, OnDestroy {

  private getSubmittedFormsSubscription: Subscription;
  private criteria = {
    page: 0, start: 0, limit: 25, totalSubmittedForms: 0,
    sort: 'None', search: 'EmptyNone'
  };
  private pagination = [];
  private submittedForms = null;

  private subpage = 'History';

  private formOnHand = null;

  constructor(
    private socketioService: SocketioService,
    private settingService: SettingService,
    private userinfoService: UserinfoService,
    private formService: FormService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getSubmittedFormsSubscription = this.formService.observeSubmittedForms().subscribe(result => {
      if (result.status) {
        this.submittedForms = result.data;
        this.criteria.totalSubmittedForms = result.totalSubmittedForms;
        this.pagination = [];
        let count = 0;
        while (count * this.criteria.limit < this.criteria.totalSubmittedForms) {
          this.pagination.push(count);
          count += 1;
        }
      }
    });
    this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);

    // Get announcement from Socket.io
    this.socketioService.getSocket().on('announce-form-user-status', function (form) {
      this.formTableUpdateProcess(form.userId);
    }.bind(this));
    this.socketioService.getSocket().on('announce-form-deleted', function (form) {
      this.formTableUpdateProcess(form.userId);
    }.bind(this));
  }
  formTableUpdateProcess(formUserId) {
    if (formUserId === this.userinfoService.getUserinfo()._id) {
      this.subpage = 'History';
      this.formOnHand = null;
      this.formService.setMode();
      this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
    }
  }

  dateFromObjectId(objectId) {
    const date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
  }

  formLimitChange(limit) {
    this.criteria.page = 0;
    this.criteria.start = 0;
    this.criteria.limit = limit;
    this.criteria.totalSubmittedForms = 0;
    this.pagination = [];
    this.submittedForms = null;
    this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
  }
  paginationChangePage(page) {
    this.criteria.page = page;
    this.criteria.start = page * this.criteria.limit;
    this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
  }
  previouseFormPage() {
    if (this.criteria.page > 0) {
      this.criteria.page -= 1;
      this.criteria.start = this.criteria.page * this.criteria.limit;
      this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
    }
  }
  nextFormPage() {
    if ((this.criteria.page + 1) * this.criteria.limit < this.criteria.totalSubmittedForms) {
      this.criteria.page += 1;
      this.criteria.start = this.criteria.page * this.criteria.limit;
      this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
    }
  }
  formSortChange(sort) {
    this.criteria.sort = sort;
    this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
  }
  formSearch(keyword) {
    keyword = keyword.trim();
    if ((this.criteria.search === 'EmptyNone' && keyword === '') || this.criteria.search === keyword) {
    } else if (keyword === '') {
      this.criteria.search = 'EmptyNone';
      this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
    } else {
      this.criteria.search = keyword;
      this.formService.getSubmittedForms(this.userinfoService.getUserinfo()._id, this.criteria);
    }
  }

  goBackToSubmittedForm() { this.subpage = 'History'; this.formOnHand = null; }

  // Delete form process
  tryDeleteForm(form) { this.subpage = 'Try delete'; this.formOnHand = form; }
  deleteSubmittedForm() {
    if (this.formOnHand !== null) {
      this.formService.deleteSubmittedForm(this.userinfoService.getUserinfo()._id, this.formOnHand).then(result => {
        if (result.status) {
          this.socketioService.deletedUserForm(this.formOnHand);
          this.formOnHand = null;
          this.pagination = [];
          this.submittedForms = null;
          this.subpage = 'History';
        }
      });
    }
  }

  // Edit form process
  editSubmittedForm(form) {
    this.router.navigate(['/form/' + form.form.accessCode]);
    this.formService.setMode('Edit', form);
  }

  // View form process
  viewSubmittedForm(form) {
    this.router.navigate(['/form/' + form.form.accessCode]);
    this.formService.setMode('View', form);
  }

  ngOnDestroy() {
    this.getSubmittedFormsSubscription.unsubscribe();

    // Unbind Socket.io
    this.socketioService.getSocket().removeAllListeners('announce-form-user-status');
    this.socketioService.getSocket().removeAllListeners('announce-form-deleted');
  }

}
