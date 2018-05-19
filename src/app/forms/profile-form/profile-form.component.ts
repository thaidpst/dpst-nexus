import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { SettingService } from '../../services/setting.service';

import { TranslateComponent } from '../../languages/translate.component';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent extends TranslateComponent implements OnInit {

  @Input() userDetail;

  constructor(
    settings: SettingService,
    private domSanitizer: DomSanitizer
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

  userProfileImage() {
    if (this.userDetail.profileUrl === undefined || this.userDetail.profileUrl === null || this.userDetail.profileUrl === '')
      return 'assets/img/profile/base.jpg';
    else {
      const imgPath = this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../public/profile/' + this.userDetail.profileUrl
      );
      return imgPath;
    }
  }

}
