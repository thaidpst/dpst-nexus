import { Component, OnInit } from '@angular/core';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-page-user-history',
  templateUrl: './page-user-history.component.html',
  styleUrls: ['./page-user-history.component.css']
})
export class PageUserHistoryComponent implements OnInit {

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.pageService.setPage('History');
  }

}
