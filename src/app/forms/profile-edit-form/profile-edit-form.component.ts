import { TranslateComponent } from '../../languages/translate.component';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SettingService } from '../../services/setting.service';
import { UserinfoService } from '../../services/userinfo.service';

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.css']
})
export class ProfileEditFormComponent extends TranslateComponent implements OnInit {

  @Input() userDetail;
  @Output() userDetailUpdated: EventEmitter<any> = new EventEmitter();

  constructor(
    settings: SettingService,
    private userinfoService: UserinfoService
  ) {
    super(settings);
  }

  ngOnInit() {
  }

  viewUserPosition() {
    if (this.userDetail.position === undefined) return 'N/A';
    else return this.userDetail.position;
  }
  viewUserAbout() {
    if (this.userDetail.about === undefined) return 'N/A';
    else return this.userDetail.about;
  }

  defaultValue(value) {
    if (value === undefined) return '';
    else return value;
  }

  userProfileImage() {
    if (this.userDetail.profileUrl === undefined || this.userDetail.profileUrl === null || this.userDetail.profileUrl === '')
      return 'assets/img/profile/base.jpg';
    else return this.userDetail.profileUrl;
  }

  editProfileDetail(form: NgForm) {
    const keys = Object.keys(form.value),
      updatedUserDetail = {};

    for (let i = 0; i < keys.length; i++) {
      if (form.value[keys[i]] !== '') {
        let cleanValue = form.value[keys[i]].replace(new RegExp('"', 'g'), '');
        cleanValue = cleanValue.trim();
        updatedUserDetail[keys[i]] = cleanValue;
      }
    }

    const userinfo = Object.assign({}, this.userDetail),
      userId = userinfo.userId;
    this.userinfoService.updateUserDetail(userId, updatedUserDetail)
      .then(result => {
        this.userDetailUpdated.emit(result);
      });
  }

}
