import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';

import { SocketioService } from '../services/socketio.service';
import { SettingService } from '../services/setting.service';
import { UserinfoService } from '../services/userinfo.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css']
})
export class HeaderNavbarComponent implements OnInit {

  private host;

  constructor(
    private elementRef: ElementRef,
    private socketioService: SocketioService,
    private settingService: SettingService,
    private userinfoService: UserinfoService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.host = d3.select(this.elementRef.nativeElement);
  }

  ngOnInit() {
  }

  unactive() {
    this.host.selectAll('.sub-menu').classed('active', false);
    this.host.selectAll('.has-subnav').classed('active', false);
    this.host.selectAll('.navbar').classed('active', false);
  }
  unactiveSubMenu() {
    this.host.selectAll('.sub-menu').classed('active', false);
  }

  toggleSubnav(selector) {
    let toggle = !this.host.select(selector).classed('active');
    this.host.selectAll(selector).classed('active', toggle);
  }
  autoCloseNavbar() {
    // this.host.select('.menu-link').classed('active', true);
    // this.host.select('.navbar').classed('active', false);
  }

  memberLogOut() {
    this.socketioService.logout();
    this.userinfoService.setUserinfo(null);
    this.cookieService.clearUserLoginCookie();
    this.router.navigate(['/']);
  }

}
