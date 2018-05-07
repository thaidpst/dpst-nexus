import { Component, OnInit } from '@angular/core';

import { UserinfoService } from '../../services/userinfo.service';

@Component({
  selector: 'app-page-user-profile',
  templateUrl: './page-user-profile.component.html',
  styleUrls: ['./page-user-profile.component.css']
})
export class PageUserProfileComponent implements OnInit {

  private userDetail = null;

  constructor(
    private userinfoService: UserinfoService
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

}
