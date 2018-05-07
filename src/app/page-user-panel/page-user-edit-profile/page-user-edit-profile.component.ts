import { Component, OnInit } from '@angular/core';

import { UserinfoService } from '../../services/userinfo.service';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-page-user-edit-profile',
  templateUrl: './page-user-edit-profile.component.html',
  styleUrls: ['./page-user-edit-profile.component.css']
})
export class PageUserEditProfileComponent implements OnInit {

  private userDetail = null;

  constructor(
    private userinfoService: UserinfoService,
    private pageService: PageService
  ) { }

  ngOnInit() {
    let userinfo = Object.assign({}, this.userinfoService.getUserinfo());
    this.userinfoService.getUserDetail(userinfo)
      .then(result=>{
        if (result!==null && result.status) {
          this.userDetail = result.data;
        }
      });
  }

  userDetailUpdatedDone(result) {
    if (result.status) {
      this.pageService.setSubpage('Profile');
    }
  }

}
