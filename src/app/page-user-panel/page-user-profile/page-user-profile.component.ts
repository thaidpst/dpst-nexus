import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserinfoService } from '../../services/userinfo.service';

@Component({
  selector: 'app-page-user-profile',
  templateUrl: './page-user-profile.component.html',
  styleUrls: ['./page-user-profile.component.css']
})
export class PageUserProfileComponent implements OnInit {

  private _userDetail;

  constructor(
    private userinfoService: UserinfoService,
    private route: ActivatedRoute
  ) { }

  get userDetail() {
    return this._userDetail;
  }

  ngOnInit() {
    const userinfo = Object.assign({}, this.userinfoService.getUserinfo());
    this.userinfoService.getUserDetail(userinfo)
      .then(result => {
        if (result !== null && result.status) {
          this._userDetail = result.data;
        }
      });
  }

}
