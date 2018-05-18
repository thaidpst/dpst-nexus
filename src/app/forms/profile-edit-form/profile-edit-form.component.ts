import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { SettingService } from '../../services/setting.service';
import { UserinfoService } from '../../services/userinfo.service';
import { FileuploadService } from '../../services/fileupload.service';

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrls: ['./profile-edit-form.component.css']
})
export class ProfileEditFormComponent implements OnInit {

  @Input() userDetail;
  @Output() userDetailUpdated: EventEmitter<any> = new EventEmitter();
  private profileImage: Array<File> = [];

  constructor(
    private settingService: SettingService,
    private userinfoService: UserinfoService,
    private fileuploadService: FileuploadService,
    private domSanitizer: DomSanitizer
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

  defaultValue(value) {
    if (value===undefined) return '';
    else return value;
  }

  editProfileDetail(form: NgForm) {
    let keys = Object.keys(form.value),
        updatedUserDetail = {};

    for (let i=0; i<keys.length; i++) {
      if (form.value[keys[i]]!='') {
        let cleanValue = form.value[keys[i]].replace(new RegExp('"', 'g'), '');
        cleanValue = cleanValue.trim();
        updatedUserDetail[keys[i]] = cleanValue;
      }
    }
    
    let userinfo = Object.assign({}, this.userDetail),
        userId = userinfo.userId;
    this.userinfoService.updateUserDetail(userId, updatedUserDetail)
      .then(result=>{
        this.userDetailUpdated.emit(result);
      });
  }

  userProfileImage() {
    if (this.userDetail.profileUrl===undefined || this.userDetail.profileUrl===null || this.userDetail.profileUrl=='') return 'assets/img/profile/base.jpg';
    else {
      let imgPath = this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../public/profile/' + this.userDetail.profileUrl
      );
      return imgPath;
    }
  }
  userProfileChange(profileImage: any) {
    this.profileImage = <Array<File>>profileImage.target.files;
    let userinfo = Object.assign({}, this.userDetail);

    let profileData: any = new FormData();
    let file: Array<File> = this.profileImage;
    profileData.append(userinfo.userId, file[0], file[0]['name']); 
    
    this.fileuploadService.deleteUserProfile(userinfo.userId).then(result1=>{
      if (result1.status) {
        this.fileuploadService.uploadUserProfile(userinfo.userId, profileData).then(result2=>{
          if (result2.status) {
            this.userinfoService.getUserDetail({_id: userinfo.userId}).then(result3=>{
              if (result3.status) {
                this.userDetail = result3.data;
              }
            });
          }
        });
      }
    });
  }
  
}
