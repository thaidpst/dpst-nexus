import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Services
import { AdminService } from './services/admin.service';
import { AuthenticationService } from './services/authentication.service';
import { CookieService } from './services/cookie.service';
import { LanguageService } from './languages/language.service';
import { SettingService } from './services/setting.service';
import { SocketioService } from './services/socketio.service';
import { UserinfoService } from './services/userinfo.service';
import { FormService } from './services/form.service';
import { FileuploadService } from './services/fileupload.service';

// Pipes
import { TranslatePipe } from './languages/translate.pipe';

// Modules
import { AppRoutingModule } from './/app-routing.module';
import { PageAdminPanelRoutingModule } from './page-admin-panel/page-admin-panel-routing.module';
import { PageUserPanelRoutingModule } from './page-user-panel/page-user-panel-routing.module';
import { GovFormsRoutingModule } from './gov-forms/gov-forms-routing.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ProfileModule } from './profile/profile.module';

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
import { PageAdminUserTableComponent } from './page-admin-panel/page-admin-user-table/page-admin-user-table.component';
import { PageAdminStatisticComponent } from './page-admin-panel/page-admin-statistic/page-admin-statistic.component';
import { PageAdminEmailBlastComponent } from './page-admin-panel/page-admin-email-blast/page-admin-email-blast.component';
import { PageUserPanelComponent } from './page-user-panel/page-user-panel.component';
import { PageUserProfileComponent } from './page-user-panel/page-user-profile/page-user-profile.component';
import { PageUserEditProfileComponent } from './page-user-panel/page-user-edit-profile/page-user-edit-profile.component';
import { PageUserSettingComponent } from './page-user-panel/page-user-setting/page-user-setting.component';
import { PageUserHistoryComponent } from './page-user-panel/page-user-history/page-user-history.component';
import { ProfileFormComponent } from './forms/profile-form/profile-form.component';
import { ProfileEditFormComponent } from './forms/profile-edit-form/profile-edit-form.component';
import { AdminPrivilageSettingFormComponent } from './forms/admin-privilage-setting-form/admin-privilage-setting-form.component';
import { PageGovFormsComponent } from './page-gov-forms/page-gov-forms.component';
import { GovForm1Component } from './gov-forms/gov-form1/gov-form1.component';
import { GovFormsComponent } from './gov-forms/gov-forms.component';
import { PageAdminUserFormsComponent } from './page-admin-panel/page-admin-user-forms/page-admin-user-forms.component';
import { PageAdminManageFormsComponent } from './page-admin-panel/page-admin-manage-forms/page-admin-manage-forms.component';
import { CreateGovFormComponent } from './forms/create-gov-form/create-gov-form.component';


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
    PageAdminPanelComponent,
    PageAdminUserTableComponent,
    PageAdminStatisticComponent,
    PageAdminEmailBlastComponent,
    PageUserPanelComponent,
    PageUserProfileComponent,
    PageUserEditProfileComponent,
    PageUserSettingComponent,
    PageUserHistoryComponent,
    ProfileFormComponent,
    ProfileEditFormComponent,
    AdminPrivilageSettingFormComponent,
    TranslatePipe,
    PageGovFormsComponent,
    GovForm1Component,
    GovFormsComponent,
    PageAdminUserFormsComponent,
    PageAdminManageFormsComponent,
    CreateGovFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    GovFormsRoutingModule,
    PageUserPanelRoutingModule,
    PageAdminPanelRoutingModule,
    AppRoutingModule,
    ProfileModule,
    PdfViewerModule
  ],
  providers: [
    SocketioService,
    SettingService,
    AuthenticationService,
    UserinfoService,
    AdminService,
    CookieService,
    LanguageService,
    FormService,
    FileuploadService,
    {
      provide: APP_INITIALIZER,
      useFactory: (userInfoService: UserinfoService) => function() { return userInfoService.init(); },
      deps: [UserinfoService],
      multi: true
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
