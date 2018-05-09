import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

import { UserinfoService } from './userinfo.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private userinfoService: UserinfoService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('AuthGuard#canActivate called');
    return true; // TODO
    // return this.userinfoService.getUserinfo() !== null;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}
