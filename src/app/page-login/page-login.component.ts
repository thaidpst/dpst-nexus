import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { SocketioService } from '../services/socketio.service';
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
  private loginMsg: string;

  constructor(
    private socketioService: SocketioService,
    private settingService: SettingService,
    private authService: AuthenticationService,
    private userinfoService: UserinfoService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.userinfoService.getUserinfo() !== null)
      this.router.navigate(['/']);
  }

  memberLogIn(form: NgForm) {
    this.authService.login(form.value)
      .then(result => {
        if (result.status) {
          if (form.value.rememberme === true)
            this.cookieService.setUserLoginCookie(result.data);
          else this.cookieService.clearUserLoginCookie();

          this.loginFail = false;
          this.loginSuccess(result.data);
          form.resetForm();
        } else {
          this.loginFail = true;
          this.loginMsg = result.data;
        }
      });
  }
  loginSuccess(userInfo) {
    this.socketioService.login(userInfo.username);
    this.userinfoService.setUserinfo(userInfo);
    this.router.navigate(['/']);
  }

}
