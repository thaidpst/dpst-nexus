import { TranslateComponent } from '../languages/translate.component';
import { Component, OnInit } from '@angular/core';

import { SettingService } from '../services/setting.service';
import { UserinfoService } from '../services/userinfo.service';

@Component({
  selector: 'app-page-check-status',
  templateUrl: './page-check-status.component.html',
  styleUrls: ['./page-check-status.component.css']
})
export class PageCheckStatusComponent extends TranslateComponent implements OnInit {

  constructor(
    settings: SettingService,
    private userinfoService: UserinfoService
  ) {
    super(settings);
  }

  ngOnInit() {
  }

}
