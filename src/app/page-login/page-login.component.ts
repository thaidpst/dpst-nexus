import { TranslateComponent } from '../languages/translate.component';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { SettingService } from '../services/setting.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserinfoService } from '../services/userinfo.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent extends TranslateComponent implements OnInit {

  private _loginMsg: string;

  constructor(
    settings: SettingService,
    private authService: AuthenticationService,
    private userinfoService: UserinfoService,
    private cookieService: CookieService,
    private router: Router
  ) {
    super(settings);
  }

  ngOnInit() {
  }

  get loginMsg(): string {
    return this._loginMsg;
  }

  memberLogIn(form: NgForm) {
    this.authService.login(form.value)
      .then(result => {
        if (result.status) {
          if (form.value.rememberme === true)
            this.cookieService.setUserLoginCookie(result.data);
          else this.cookieService.clearUserLoginCookie();

          this._loginMsg = null;
          this.loginSuccess(result.data);
          form.resetForm();
        } else {
          this._loginMsg = result.data;
        }
      });
  }
  loginSuccess(userInfo) {
    this.userinfoService.setUserinfo(userInfo);
    this.router.navigate(['/']);
  }

}
