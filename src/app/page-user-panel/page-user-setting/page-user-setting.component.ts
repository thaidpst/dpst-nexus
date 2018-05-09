import { Component, OnInit } from '@angular/core';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-page-user-setting',
  templateUrl: './page-user-setting.component.html',
  styleUrls: ['./page-user-setting.component.css']
})
export class PageUserSettingComponent implements OnInit {

  constructor(private pageService: PageService) { }

  ngOnInit() {
    this.pageService.setPage('Settings');
  }

}
