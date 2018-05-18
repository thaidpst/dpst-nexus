import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PageService } from '../services/page.service';
import { SettingService } from '../services/setting.service';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-page-gov-forms',
  templateUrl: './page-gov-forms.component.html',
  styleUrls: ['./page-gov-forms.component.css']
})
export class PageGovFormsComponent implements OnInit {

  private formCatagory = [];

  private getFormsSubscription: Subscription;
  private criteria = {
    page: 0, start: 0, limit: 25, totalForms: 0,
    sort: 'None', search: 'EmptyNone', category: 'None'
  };
  private pagination = [];
  private forms = null;

  constructor(
    private pageService: PageService,
    private settingService: SettingService,
    private formService: FormService
  ) { }

  ngOnInit() {
    this.formService.getFormCategory().then(result=>{
      if (result.status) this.formCatagory = result.data;
    });

    this.getFormsSubscription = this.formService.observeForms().subscribe(result=>{
      if (result.status) {
        this.forms = result.data;
        this.criteria.totalForms = result.totalForms;

        this.pagination = [];
        let count = 0;
        while (count*this.criteria.limit < this.criteria.totalForms) {
          this.pagination.push(count);          
          count += 1;
        }
      }
    });
    this.formService.getActiveForms(this.criteria);
  }

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
    this.formService.getActiveForms(this.criteria);
  }
  goToForm(form) {
    this.pageService.setPage('Government form');
    this.pageService.setSubpage(form.accessCode);
    this.formService.setMode();
  }

  formLimitChange(limit) {
    this.criteria.page = 0;
    this.criteria.start = 0;
    this.criteria.limit = limit;
    this.criteria.totalForms = 0;
    this.pagination = [];
    this.forms = null;
    this.formService.getActiveForms(this.criteria);
  }
  paginationChangePage(page) {
    this.criteria.page = page;
    this.criteria.start = page * this.criteria.limit;
    this.formService.getActiveForms(this.criteria);
  }
  previouseFormPage() {
    if (this.criteria.page > 0) {
      this.criteria.page -= 1;
      this.criteria.start = this.criteria.page * this.criteria.limit;
      this.formService.getActiveForms(this.criteria);
    }
  }
  nextFormPage() {
    if ((this.criteria.page+1)*this.criteria.limit < this.criteria.totalForms) {
      this.criteria.page += 1;
      this.criteria.start = this.criteria.page * this.criteria.limit;
      this.formService.getActiveForms(this.criteria);
    }
  }
  formSortChange(sort) {
    this.criteria.sort = sort;
    this.formService.getActiveForms(this.criteria);
  }
  formSearch(keyword) {
    keyword = keyword.trim();
    if ((this.criteria.search=='EmptyNone' && keyword=='') || this.criteria.search==keyword) {}
    else if (keyword=='') {
      this.criteria.search = 'EmptyNone';
      this.formService.getActiveForms(this.criteria);
    } else {      
      this.criteria.search = keyword;
      this.formService.getActiveForms(this.criteria);
    }
  }

  ngOnDestroy() {
    this.getFormsSubscription.unsubscribe();
  }

}
