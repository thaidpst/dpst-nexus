import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { AppComponent } from './app.component';
import { PageAdminUserTableComponent } from './page-admin-panel/page-admin-user-table/page-admin-user-table.component';
import { PageCheckStatusComponent } from './page-check-status/page-check-status.component';
import { PageContactComponent } from './page-contact/page-contact.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageRegisterComponent } from './page-register/page-register.component';
import { PageUserHistoryComponent } from './page-user-panel/page-user-history/page-user-history.component';
import { PageUserProfileComponent } from './page-user-panel/page-user-profile/page-user-profile.component';

import { GuestRouteGuard, UserRouteGuard } from './services/auth-guard.service';
import { UserinfoService } from './services/userinfo.service';

const routes: Routes = [
  { path: '', component: PageHomeComponent },
  {
    path: 'login', component: PageLoginComponent,
    canActivate: [GuestRouteGuard]
  },
  {
    path: 'register', component: PageRegisterComponent,
    canActivate: [GuestRouteGuard]
  },
  {
    path: 'check-status', component: PageCheckStatusComponent,
    canActivate: [UserRouteGuard]
  },
  { path: 'contact', component: PageContactComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [GuestRouteGuard, UserRouteGuard]
})
export class AppRoutingModule { }
