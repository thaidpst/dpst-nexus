import { Component, OnInit } from '@angular/core';

import { SettingService } from '../services/setting.service';
import { UserinfoService } from '../services/userinfo.service';

@Component({
  selector: 'app-page-check-status',
  templateUrl: './page-check-status.component.html',
  styleUrls: ['./page-check-status.component.css']
})
export class PageCheckStatusComponent implements OnInit {

  constructor(
    private settingService: SettingService,
    private userinfoService: UserinfoService
  ) { }

  ngOnInit() {
  }

}
