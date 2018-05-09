import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../services/auth-guard.service';

import { PageAdminEmailBlastComponent } from './page-admin-email-blast/page-admin-email-blast.component';
import { PageAdminPanelComponent } from './page-admin-panel.component';
import { PageAdminStatisticComponent } from './page-admin-statistic/page-admin-statistic.component';
import { PageAdminUserTableComponent } from './page-admin-user-table/page-admin-user-table.component';

const routes: Routes = [
  { path: 'admin-panel', component: PageAdminPanelComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      { path: '',
        children: [
          { path: 'user-table', component: PageAdminUserTableComponent, data: { pagename: 'User Table' } },
          { path: 'stats', component: PageAdminStatisticComponent, data: { pagename: 'Statistics' } },
          { path: 'email-blast', component: PageAdminEmailBlastComponent, data: { pagename: 'E-mail Blast' } },
          { path: '', redirectTo: 'user-table', pathMatch: 'full' }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class PageAdminPanelRoutingModule { }
