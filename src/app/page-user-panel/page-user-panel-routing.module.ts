import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageUserEditProfileComponent } from './page-user-edit-profile/page-user-edit-profile.component';
import { PageUserHistoryComponent } from './page-user-history/page-user-history.component';
import { PageUserPanelComponent } from './page-user-panel.component';
import { PageUserProfileComponent } from './page-user-profile/page-user-profile.component';
import { PageUserSettingComponent } from './page-user-setting/page-user-setting.component';

import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  { path: 'user-panel', component: PageUserPanelComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      { path: '',
        children: [
          { path: 'profile', component: PageUserProfileComponent, data: { pagename: 'Profile' } },
          { path: 'edit-profile', component: PageUserEditProfileComponent, data: { pagename: 'Edit Profile' } },
          { path: 'history', component: PageUserHistoryComponent, data: { pagename: 'History' } },
          { path: 'settings', component: PageUserSettingComponent, data: { pagename: 'Settings' } },
          { path: '', redirectTo: 'profile', pathMatch: 'full' }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PageUserPanelRoutingModule { }
