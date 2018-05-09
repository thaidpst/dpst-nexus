import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PageService } from '../../services/page.service';
import { UserinfoService } from '../../services/userinfo.service';

@Component({
  selector: 'app-page-user-edit-profile',
  templateUrl: './page-user-edit-profile.component.html',
  styleUrls: ['./page-user-edit-profile.component.css']
})
export class PageUserEditProfileComponent implements OnInit {

  private userDetail = null;

  constructor(
    private pageService: PageService,
    private userinfoService: UserinfoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.pageService.setPage('Edit Profile');
    const userinfo = Object.assign({}, this.userinfoService.getUserinfo());
    this.userinfoService.getUserDetail(userinfo)
      .then(result =>  {
        if (result !== null && result.status) {
          this.userDetail = result.data;
        }
      });
  }

  userDetailUpdatedDone(result) {
    if (result.status) {
      this.router.navigate(['/user-panel/profile']);
    }
  }

}
