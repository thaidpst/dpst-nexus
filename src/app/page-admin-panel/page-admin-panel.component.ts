import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SettingService } from '../services/setting.service';

import { TranslateComponent } from '../languages/translate.component';

@Component({
  selector: 'app-page-admin-panel',
  templateUrl: './page-admin-panel.component.html',
  styleUrls: ['./page-admin-panel.component.css']
})
export class PageAdminPanelComponent extends TranslateComponent implements OnInit {

  pageName: string;

  constructor(
    settings: SettingService,
    private route: ActivatedRoute
  ) {
    super(settings);
  }

  ngOnInit() {
    this.route.data
      .subscribe(data => {
        this.pageName = data.pagename;
      });
  }
}
