import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';

import { UserinfoService } from './userinfo.service';

@Injectable()
export class GuestRouteGuard implements CanActivate {
  constructor(
    private userinfoService: UserinfoService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userinfoService.isLoggedIn) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

@Injectable()
export class UserRouteGuard implements CanActivate, CanActivateChild {

  constructor(
    private userinfoService: UserinfoService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.userinfoService.isLoggedIn || !this.userinfoService.isActive) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}

@Injectable()
export class AdminRouteGuard implements CanActivate, CanActivateChild {

  constructor(
    private userinfoService: UserinfoService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.userinfoService.isLoggedIn || !this.userinfoService.isActive || !this.userinfoService.isAdmin) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
