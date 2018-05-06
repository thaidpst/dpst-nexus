import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SocketioService } from '../services/socketio.service';
import { PageService } from '../services/page.service';
import { SettingService } from '../services/setting.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserinfoService } from '../services/userinfo.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {

  private loginFail = false;

  constructor(
    private socketioService: SocketioService,
    private pageService: PageService,
    private settingService: SettingService,
    private authService: AuthenticationService,
    private userinfoService: UserinfoService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
  }

  memberLogIn(form: NgForm) {
    this.authService.login(form.value)
      .then(result=>{
        if (result.status) {
          if (form.value.rememberme==true) this.cookieService.setUserLoginCookie(result.data);
          else this.cookieService.clearUserLoginCookie();

          this.loginFail = false;
          this.loginSuccess(result.data);
          form.resetForm();
        } else {
          this.loginFail = true;
        }
      });
  }
  loginSuccess(userInfo) {
    this.socketioService.login(userInfo.username);
    this.userinfoService.setUserinfo(userInfo);
    this.pageService.setPage('Homepage');
  }

}
