import { Component, OnInit } from '@angular/core';

import { PageService } from '../services/page.service';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-page-user-panel',
  templateUrl: './page-user-panel.component.html',
  styleUrls: ['./page-user-panel.component.css']
})
export class PageUserPanelComponent implements OnInit {

  constructor(
    private pageService: PageService,
    private settingService: SettingService
  ) { }

  ngOnInit() {
  }

  subpageTranslation() {
    if (this.pageService.getSubpage()=='Profile') return 'ประวัติส่วนตัว';
    else if (this.pageService.getSubpage()=='Edit profile') return 'เเก้ไขประวัติส่วนตัว';
    else if (this.pageService.getSubpage()=='History') return 'ประวัติการใช้งาน';
    else if (this.pageService.getSubpage()=='Setting') return 'ตั้งค่า';
    else return '';
  }

}
