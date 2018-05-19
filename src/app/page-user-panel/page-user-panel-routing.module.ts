import { UserRouteGuard } from '../services/auth-guard.service';
import { UserinfoService } from '../services/userinfo.service';
import { NgModule, Injectable } from '@angular/core';
import {
  RouterModule, Routes, Resolve, ActivatedRouteSnapshot,
  RouterStateSnapshot, Router, CanActivate, CanActivateChild
} from '@angular/router';

import { PageUserEditProfileComponent } from './page-user-edit-profile/page-user-edit-profile.component';
import { PageUserHistoryComponent } from './page-user-history/page-user-history.component';
import { PageUserPanelComponent } from './page-user-panel.component';
import { PageUserProfileComponent } from './page-user-profile/page-user-profile.component';
import { PageUserSettingComponent } from './page-user-setting/page-user-setting.component';

import { Observable } from 'rxjs/Observable';


@Injectable()
class UserPanelResolver implements Resolve<String> {
  constructor(private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<String> | String {
    route.parent.data = { pagename: route.data.pagename };
    return route.data.pagename;
  }
}

const routes: Routes = [
  {
    path: 'user-panel', component: PageUserPanelComponent,
    canActivate: [UserRouteGuard],
    canActivateChild: [UserRouteGuard],
    children: [
      {
        path: 'profile', component: PageUserProfileComponent,
        data: { pagename: 'Profile' }, resolve: { pagename: UserPanelResolver }
      },
      {
        path: 'edit-profile', component: PageUserEditProfileComponent,
        data: { pagename: 'Edit Profile' }, resolve: { pagename: UserPanelResolver }
      },
      {
        path: 'history', component: PageUserHistoryComponent,
        data: { pagename: 'History' }, resolve: { pagename: UserPanelResolver }
      },
      {
        path: 'settings', component: PageUserSettingComponent,
        data: { pagename: 'Settings' }, resolve: { pagename: UserPanelResolver }
      },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserRouteGuard, UserPanelResolver]
})
export class PageUserPanelRoutingModule { }
