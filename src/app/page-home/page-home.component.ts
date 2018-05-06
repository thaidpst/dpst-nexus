import { Component, OnInit } from '@angular/core';

import { PageService } from '../services/page.service';
import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent implements OnInit {

  constructor(
    private pageService: PageService,
    private settingService: SettingService
  ) { }

  ngOnInit() {
  }

}
