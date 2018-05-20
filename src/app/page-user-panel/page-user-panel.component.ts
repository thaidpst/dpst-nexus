import { Subscription } from 'rxjs/Subscription';
import { TranslateComponent } from '../languages/translate.component';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SettingService } from '../services/setting.service';

@Component({
  selector: 'app-page-user-panel',
  templateUrl: './page-user-panel.component.html',
  styleUrls: ['./page-user-panel.component.css']
})
export class PageUserPanelComponent extends TranslateComponent implements OnInit, OnDestroy {

  private _pageName: string;
  private pageNameSubscription: Subscription;

  constructor(
    settings: SettingService,
    private route: ActivatedRoute
  ) {
    super(settings);
  }

  get pageName(): string {
    return this._pageName;
  }

  ngOnInit() {
    this.pageNameSubscription = this.route.data
      .subscribe(data => {
        this._pageName = data.pagename;
      });
  }

  ngOnDestroy() {
    this.pageNameSubscription.unsubscribe();
  }
}
