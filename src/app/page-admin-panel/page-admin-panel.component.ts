import { Component, OnInit } from '@angular/core';

import { PageService } from '../services/page.service';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-page-admin-panel',
  templateUrl: './page-admin-panel.component.html',
  styleUrls: ['./page-admin-panel.component.css']
})
export class PageAdminPanelComponent implements OnInit {

  constructor(
    private pageService: PageService,
    private settingService: SettingService
  ) { }

  ngOnInit() {

  }

}
