import { Component, OnInit } from '@angular/core';

import { SettingService } from '../../services/setting.service';
import { UserinfoService } from '../../services/userinfo.service';

@Component({
  selector: 'app-page-user-profile',
  templateUrl: './page-user-profile.component.html',
  styleUrls: ['./page-user-profile.component.css']
})
export class PageUserProfileComponent implements OnInit {

  private userOnHand = null;

  constructor(
    private settingService: SettingService,
    private userinfoService: UserinfoService
  ) { }

  ngOnInit() {
    let userinfo = Object.assign({}, this.userinfoService.getUserinfo());
    this.userinfoService.getUserDetail(userinfo)
      .then(result=>{
        if (result!==null && result.status) {
          this.userOnHand = result.data;
        }
      });
  }

  viewUserPosition() {
    if (this.userOnHand.position===undefined) return 'N/A';
    else return this.userOnHand.position;
  }
  viewUserAbout() {
    if (this.userOnHand.about===undefined) return 'N/A';
    else return this.userOnHand.about;
  }

}
