import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

// Services
import { SocketioService } from './services/socketio.service';
import { PageService } from './services/page.service';
import { SettingService } from './services/setting.service';
import { AuthenticationService } from './services/authentication.service';
import { UserinfoService } from './services/userinfo.service';
import { AdminService } from './services/admin.service';
import { CookieService } from './services/cookie.service';

// Components
import { AppComponent } from './app.component';
import { HeaderNavbarComponent } from './header-navbar/header-navbar.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageContactComponent } from './page-contact/page-contact.component';
import { FooterComponent } from './footer/footer.component';
import { PageCheckStatusComponent } from './page-check-status/page-check-status.component';
import { PageAdminPanelComponent } from './page-admin-panel/page-admin-panel.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderNavbarComponent,
    PageHomeComponent,
    PageLoginComponent,
    PageRegisterComponent,
    PageContactComponent,
    FooterComponent,
    PageCheckStatusComponent,
    PageAdminPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    SocketioService,
    PageService,
    SettingService,
    AuthenticationService,
    UserinfoService,
    AdminService,
    CookieService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
