import { Component, OnInit, Input } from '@angular/core';

import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  @Input() userDetail;

  constructor(
    private settingService: SettingService
  ) { }

  ngOnInit() {
  }

  viewUserPosition() {
    if (this.userDetail.position===undefined) return 'N/A';
    else return this.userDetail.position;
  }
  viewUserAbout() {
    if (this.userDetail.about===undefined) return 'N/A';
    else return this.userDetail.about;
  }

  userProfileImage() {
    if (this.userDetail.profileUrl===undefined || this.userDetail.profileUrl===null || this.userDetail.profileUrl=='') return 'assets/img/profile/base.jpg';
    else return this.userDetail.profileUrl;
  }

}