import { Component, OnInit, enableProdMode } from '@angular/core';

import { SocketioService } from './services/socketio.service';
import { PageService } from './services/page.service';
import { AuthenticationService } from './services/authentication.service';
import { UserinfoService } from './services/userinfo.service';
import { CookieService } from './services/cookie.service';

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
    private authenticationService: AuthenticationService,
    private userinfoService: UserinfoService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.socketioService.connect();

    // Get announcement from Socket.io
    this.socketioService.getSocket().on('announce-account-status', function(userId) {
      if (this.userinfoService.getUserinfo()!==null && userId==this.userinfoService.getUserinfo()._id) {
        this.userinfoService.update();
        this.pageService.setPage('Check status');
      }
    }.bind(this));
    this.socketioService.getSocket().on('announce-account-delete', function(userId) {
      if (this.userinfoService.getUserinfo()!==null && userId==this.userinfoService.getUserinfo()._id) {
        this.socketioService.logout();
        this.userinfoService.setUserinfo(null);
        this.pageService.setPage('Homepage');
      }
    }.bind(this));
    this.socketioService.getSocket().on('announce-account-privilage', function(userId) {
      if (this.userinfoService.getUserinfo()!==null && userId==this.userinfoService.getUserinfo()._id) {
        this.userinfoService.update();
        this.pageService.setPage('Homepage');
      }
    }.bind(this));

    // Check remember me login
    this.cookieService.checkRememberLogin()
      .then(result=>{
        if (result.status) {
          this.authenticationService.loginWithCookie(result.data)
            .then(result2=>{
              if (result2.status) {
                this.socketioService.login(result2.data.username);
                this.userinfoService.setUserinfo(result2.data);
              }
            });
        }
      });
  }

}
