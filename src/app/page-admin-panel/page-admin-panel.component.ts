import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SocketioService } from '../services/socketio.service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-page-admin-panel',
  templateUrl: './page-admin-panel.component.html',
  styleUrls: ['./page-admin-panel.component.css']
})
export class PageAdminPanelComponent implements OnInit {

  private getUsersSubscription: Subscription;
  private users = null;

  constructor(
    private socketioService: SocketioService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.getUsersSubscription = this.adminService.observeUsers().subscribe(result=>{
      if (result.status) {
        this.users = result.data;
      }
    });

    this.socketioService.getSocket().on('update-new-users', function() {
      this.adminService.getUsers();
    }.bind(this));
    this.socketioService.getSocket().on('announce-account-active', function() {
      this.adminService.getUsers();
    }.bind(this));
    this.socketioService.getSocket().on('announce-account-delete', function() {
      this.adminService.getUsers();
    }.bind(this));

    this.adminService.getUsers();
  }

  setAccountActive(userId) {
    this.adminService.setAccoundActive(userId).then(result=>{
      if (result.status) {
        this.adminService.getUsers();
        this.socketioService.accountActive(userId);
      }
    });
  }
  deleteAccount(userId) {
    this.adminService.deleteAccount(userId).then(result=>{
      if (result.status) {
        this.adminService.getUsers();
        this.socketioService.deleteAccount(userId);
      }
    });
  }

  ngOnDestroy() {
    this.getUsersSubscription.unsubscribe();
  }

}
