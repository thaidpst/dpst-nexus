import { TranslateComponent } from '../languages/translate.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SettingService } from '../services/setting.service';
import { UserinfoService } from '../services/userinfo.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  styleUrls: ['./page-home.component.css']
})
export class PageHomeComponent extends TranslateComponent implements OnInit {

  constructor(
    settings: SettingService,
    private userinfoService: UserinfoService,
    private router: Router
  ) {
    super(settings);
  }

  ngOnInit() {
  }

}
