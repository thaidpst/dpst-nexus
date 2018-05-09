import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SocketioService } from '../services/socketio.service';
import { PageService } from '../services/page.service';
import { SettingService } from '../services/setting.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserinfoService } from '../services/userinfo.service';
import { AdminService } from '../services/admin.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.css']
})
export class PageRegisterComponent implements OnInit {

  private passNotMatch = false;
  private passTooShort = false;
  private usernameInUse = false;
  private emailInUse = false;

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

  registerMember(form: NgForm) {
    if (form.value.password !== form.value.confirmPassword) {
      this.passNotMatch = true; this.passTooShort = false; this.usernameInUse = false; this.emailInUse = false;
    } else {
      this.authService.register(form.value)
        .then(response =>  {
          if (response.status) {
            this.registerSuccess(form.value);
            form.resetForm();
            this.passNotMatch = false; this.passTooShort = false; this.usernameInUse = false; this.emailInUse = false;
          } else {
            if (response.data == 0) {
              this.passNotMatch = false;
              this.passTooShort = true;
              this.usernameInUse = false;
              this.emailInUse = false;
            }
            else if (response.data == -1) {
              this.passNotMatch = false;
              this.passTooShort = false;
              this.usernameInUse = true;
              this.emailInUse = false;
            }
            else if (response.data == -2) {
              this.passNotMatch = false;
              this.passTooShort = false;
              this.usernameInUse = false;
              this.emailInUse = true;
            }
          }
        });
    }
  }
  registerSuccess(formValue) {
    this.socketioService.newMember(formValue.username);
    this.authService.login(formValue)
      .then(result =>  {
        this.socketioService.login(result.data.username);
        this.userinfoService.setUserinfo(result.data);
        this.pageService.setPage('Check status');
        this.cookieService.setUserLoginCookie(result.data);
      });
  }

}
