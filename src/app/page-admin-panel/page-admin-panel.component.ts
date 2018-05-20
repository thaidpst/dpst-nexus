import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { SocketioService } from '../services/socketio.service';
import { SettingService } from '../services/setting.service';

import { TranslateComponent } from '../languages/translate.component';

import { UserinfoService } from '../services/userinfo.service';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-page-admin-panel',
  templateUrl: './page-admin-panel.component.html',
  styleUrls: ['./page-admin-panel.component.css']
})
export class PageAdminPanelComponent extends TranslateComponent implements OnInit, OnDestroy {

  pageName: String;
  private pageNameSubscription: Subscription;

  private pendingFormSubscription: Subscription;
  private pendingFormNumber = 0;

  constructor(
    settings: SettingService,
    private socketioService: SocketioService,
    private userinfoService: UserinfoService,
    private formService: FormService,
    private route: ActivatedRoute
  ) {
    super(settings);
  }

  ngOnInit() {
    this.pageNameSubscription = this.route.data
      .subscribe(data => {
        this.pageName = data.pagename;
      });
    this.pendingFormSubscription = this.formService.observePendingFormNumber().subscribe(result => {
      if (result.status) this.pendingFormNumber = result.data;
    });
    this.formService.getPendingFormNumber();

    // Get form announcement from Socket.io
    this.socketioService.getSocket().on('announce-form-pending-number', function () {
      this.formService.getPendingFormNumber();
    }.bind(this));
  }

  ngOnDestroy() {
    this.pageNameSubscription.unsubscribe();
    this.pendingFormSubscription.unsubscribe();

    // Unbind Socket.io
    this.socketioService.getSocket().removeAllListeners('announce-form-pending-number');
  }
}
