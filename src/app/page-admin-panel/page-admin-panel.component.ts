import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-page-admin-panel',
  templateUrl: './page-admin-panel.component.html',
  styleUrls: ['./page-admin-panel.component.css']
})
export class PageAdminPanelComponent implements OnInit {

  pageName: string;

  constructor(
    private settingService: SettingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(data => {
        this.pageName = data.pagename;
      });
  }
}
