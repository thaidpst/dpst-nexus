import { Component, OnInit } from '@angular/core';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-page-admin-email-blast',
  templateUrl: './page-admin-email-blast.component.html',
  styleUrls: ['./page-admin-email-blast.component.css']
})
export class PageAdminEmailBlastComponent implements OnInit {

  constructor(
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.pageService.setPage('Email Blast');
  }

}
