import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SocketioService } from '../services/socketio.service';
import { PageService } from '../services/page.service';
import { SettingService } from '../services/setting.service';
import { UserinfoService } from '../services/userinfo.service';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-page-admin-panel',
  templateUrl: './page-admin-panel.component.html',
  styleUrls: ['./page-admin-panel.component.css']
})
export class PageAdminPanelComponent implements OnInit {

  private pendingFormSubscription: Subscription;
  private pendingFormNumber = 0;

  constructor(
    private socketioService: SocketioService,
    private pageService: PageService,
    private settingService: SettingService,
    private userinfoService: UserinfoService,
    private formService: FormService
  ) { }

  ngOnInit() {
    this.pendingFormSubscription = this.formService.observePendingFormNumber().subscribe(result=>{
      if (result.status) this.pendingFormNumber = result.data;
    });
    this.formService.getPendingFormNumber();

    // Get form announcement from Socket.io
    this.socketioService.getSocket().on('announce-form-pending-number', function() {
      this.formService.getPendingFormNumber();
    }.bind(this));
  }

  ngOnDestroy() {
    this.pendingFormSubscription.unsubscribe();

    // Unbind Socket.io
    this.socketioService.getSocket().removeAllListeners('announce-form-pending-number');
  }

}
