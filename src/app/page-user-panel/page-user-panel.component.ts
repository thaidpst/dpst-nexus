import { TranslateComponent } from '../languages/translate.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-page-user-panel',
  templateUrl: './page-user-panel.component.html',
  styleUrls: ['./page-user-panel.component.css']
})
export class PageUserPanelComponent extends TranslateComponent implements OnInit {

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
