import { Injectable } from '@angular/core';

@Injectable()
export class PageService {

  private page = 'Homepage';
  private subpage = '';

  constructor() { }

  setPage(page) {
    this.page = page;
    this.subpage = '';
  }
  getPage() {return this.page}

  setSubpage(subpage) {this.subpage = subpage}
  getSubpage() {return this.subpage}

}
