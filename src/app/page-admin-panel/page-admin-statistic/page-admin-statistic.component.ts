import { Component, OnInit } from '@angular/core';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-page-admin-statistic',
  templateUrl: './page-admin-statistic.component.html',
  styleUrls: ['./page-admin-statistic.component.css']
})
export class PageAdminStatisticComponent implements OnInit {

  constructor(
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.pageService.setPage('Statistics');
  }

}
