import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-page-user-panel',
  templateUrl: './page-user-panel.component.html',
  styleUrls: ['./page-user-panel.component.css']
})
export class PageUserPanelComponent implements OnInit {

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
