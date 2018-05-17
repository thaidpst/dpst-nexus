import { Component, OnInit, enableProdMode } from '@angular/core';

import { SocketioService } from './services/socketio.service';
import { UserinfoService } from './services/userinfo.service';
import { CookieService } from './services/cookie.service';
import { Router } from '@angular/router';

enableProdMode();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private socketioService: SocketioService,
    private userinfoService: UserinfoService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.socketioService.connect();

    // Get announcement from Socket.io
    this.socketioService.getSocket().on('announce-account-status', function(userId) {
      if (this.userinfoService.getUserinfo() !== null && userId === this.userinfoService.getUserinfo()._id) {
        this.userinfoService.update();
        this.router.navigate(['/check-status']);
      }
    }.bind(this));
    this.socketioService.getSocket().on('announce-account-delete', function(userId) {
      if (this.userinfoService.getUserinfo() !== null && userId === this.userinfoService.getUserinfo()._id) {
        this.socketioService.logout();
        this.userinfoService.setUserinfo(null);
        this.router.navigate(['/']);
      }
    }.bind(this));
    this.socketioService.getSocket().on('announce-account-privilage', function(userId) {
      if (this.userinfoService.getUserinfo() !== null && userId === this.userinfoService.getUserinfo()._id) {
        this.userinfoService.update();
        this.router.navigate(['/']);
      }
    }.bind(this));
  }

}
