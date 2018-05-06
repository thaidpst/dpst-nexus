import { Component, OnInit, enableProdMode } from '@angular/core';

import { SocketioService } from './services/socketio.service';
import { PageService } from './services/page.service';
import { UserinfoService } from './services/userinfo.service';

enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private socketioService: SocketioService,
    private pageService: PageService,
    private userinfoService: UserinfoService
  ) { }

  ngOnInit() {
    this.socketioService.connect();

    this.socketioService.getSocket().on('announce-account-active', function(userId) {
      if (this.userinfoService.getUserinfo()!==null && userId==this.userinfoService.getUserinfo()._id) {
        this.userinfoService.update();
      }
    }.bind(this));

    this.socketioService.getSocket().on('announce-account-delete', function(userId) {
      if (this.userinfoService.getUserinfo()!==null && userId==this.userinfoService.getUserinfo()._id) {
        this.socketioService.logout();
        this.userinfoService.setUserinfo(null);
        this.pageService.setPage('Homepage');
      }
    }.bind(this));
  }

}
