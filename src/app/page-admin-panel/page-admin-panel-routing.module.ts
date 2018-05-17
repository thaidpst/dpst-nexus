import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AdminRouteGuard } from '../services/auth-guard.service';

import { PageAdminEmailBlastComponent } from './page-admin-email-blast/page-admin-email-blast.component';
import { PageAdminPanelComponent } from './page-admin-panel.component';
import { PageAdminStatisticComponent } from './page-admin-statistic/page-admin-statistic.component';
import { PageAdminUserTableComponent } from './page-admin-user-table/page-admin-user-table.component';
import { Observable } from 'rxjs/Observable';


@Injectable()
class AdminPanelResolver implements Resolve<String> {
  constructor(private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<String> | String {
    route.parent.data = { pagename: route.data.pagename };
    return route.data.pagename;
  }
}

const routes: Routes = [
  {
    path: 'admin-panel', component: PageAdminPanelComponent,
    canActivate: [AdminRouteGuard],
    canActivateChild: [AdminRouteGuard],
    children: [
      {
        path: 'user-table', component: PageAdminUserTableComponent,
        data: { pagename: 'User Table' }, resolve: { pagename: AdminPanelResolver }
      },
      {
        path: 'stats', component: PageAdminStatisticComponent,
        data: { pagename: 'Statistics' }, resolve: { pagename: AdminPanelResolver }
      },
      {
        path: 'email-blast', component: PageAdminEmailBlastComponent,
        data: { pagename: 'E-mail Blast' }, resolve: { pagename: AdminPanelResolver }
      },
      { path: '', redirectTo: 'user-table', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminRouteGuard, AdminPanelResolver]
})
export class PageAdminPanelRoutingModule { }
