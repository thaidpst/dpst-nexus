import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SocketioService } from '../../services/socketio.service';
import { SettingService } from '../../services/setting.service';
import { UserinfoService } from '../../services/userinfo.service';
import { FormService } from '../../services/form.service';
import { TranslateComponent } from '../../languages/translate.component';

@Component({
  selector: 'app-page-admin-manage-forms',
  templateUrl: './page-admin-manage-forms.component.html',
  styleUrls: ['./page-admin-manage-forms.component.css']
})
export class PageAdminManageFormsComponent extends TranslateComponent implements OnInit, OnDestroy {

  private pagination = [];

  private getGovFormsSubscription: Subscription;
  private criteria = {
    page: 0, start: 0, limit: 25, totalForms: 0,
    sort: 'None', search: 'EmptyNone'
  };
  private govForms = null;

  private subpage = 'Table';
  private formOnHand = null;

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
    // Subscription
    this.getGovFormsSubscription = this.formService.observeAdminGovForms().subscribe(result => {
      if (result.status) {
        this.govForms = result.data;
        this.criteria.totalForms = result.totalForms;

        this.pagination = [];
        let count = 0;
        while (count * this.criteria.limit < this.criteria.totalForms) {
          this.pagination.push(count);
          count += 1;
        }
      }
    });
    this.formService.adminGetGovForms(this.criteria);
  }

  dateFromObjectId(objectId) {
    const date = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
  }
  requireEvidence(value) {
    if (value) return 'Yes';
    else return 'No';
  }
  formLimitChange(limit) {
    this.criteria.page = 0;
    this.criteria.start = 0;
    this.criteria.limit = limit;
    this.criteria.totalForms = 0;
    this.pagination = [];
    this.govForms = null;
    this.formService.adminGetGovForms(this.criteria);
  }
  paginationChangePage(page) {
    this.criteria.page = page;
    this.criteria.start = page * this.criteria.limit;
    this.formService.adminGetGovForms(this.criteria);
  }
  previouseFormPage() {
    if (this.criteria.page > 0) {
      this.criteria.page -= 1;
      this.criteria.start = this.criteria.page * this.criteria.limit;
      this.formService.adminGetGovForms(this.criteria);
    }
  }
  nextFormPage() {
    if ((this.criteria.page + 1) * this.criteria.limit < this.criteria.totalForms) {
      this.criteria.page += 1;
      this.criteria.start = this.criteria.page * this.criteria.limit;
      this.formService.adminGetGovForms(this.criteria);
    }
  }
  formSortChange(sort) {
    this.criteria.sort = sort;
    this.formService.adminGetGovForms(this.criteria);
  }
  formSearch(keyword) {
    keyword = keyword.trim();
    if ((this.criteria.search === 'EmptyNone' && keyword === '') || this.criteria.search === keyword) {
    } else if (keyword === '') {
      this.criteria.search = 'EmptyNone';
      this.formService.adminGetGovForms(this.criteria);
    } else {
      this.criteria.search = keyword;
      this.formService.adminGetGovForms(this.criteria);
    }
  }

  // Edit gov form process
  setGovFormStatus(form, status) {
    this.formService.setGovFormStatus(form, status).then(result => {
      if (result.status) {
        this.formService.adminGetGovForms(this.criteria);
      }
    });
  }
  viewGovForm(form) {
    // if (this.userinfoService.getUserinfo().level >= 7) {
    //   this.formService.setMode('ByPass', form, 'Admin', this.currentForm, this.tableCriteria);
    //   this.router.navigate(['/form/' + this.currentForm.accessCode]);
    // } else {
    //   this.router.navigate(['/']);
    // }
  }

  // Create gov form process

  // Edit gov form process
  tryToEditGovForm(form) {

  }

  // Delete gov form process
  tryToDeleteGovForm(form) {
    //  this.formOnHand = form;
  }

  ngOnDestroy() {
    this.getGovFormsSubscription.unsubscribe();
  }

}
