import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SettingService } from '../../services/setting.service';
import { UserinfoService } from '../../services/userinfo.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-privilage-setting-form',
  templateUrl: './admin-privilage-setting-form.component.html',
  styleUrls: ['./admin-privilage-setting-form.component.css']
})
export class AdminPrivilageSettingFormComponent implements OnInit {

  @Input() userinfo;
  @Output() userinfoUpdated: EventEmitter<any> = new EventEmitter();
  private selfAccount = false;

  private levelSelection: number;
  private levels = [
    {value: 10, desc: '10 - Owner'},
    {value: 9, desc: '9 - Admin'},
    {value: 8, desc: '8 - Manager'},
    {value: 7, desc: '7 - Author'},
    {value: 6, desc: '6 - Contributor'},
    {value: 5, desc: '5 - Moderator'},
    {value: 4, desc: '4 - DPST. senior member'},
    {value: 3, desc: '3 - DPST. member'},
    {value: 2, desc: '2 - Member'},
    {value: 1, desc: '1 - User'}
  ];
  private possibleLevel;

  constructor(
    private settingService: SettingService,
    private userinfoService: UserinfoService,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.levelSelection = this.userinfo.level;

    this.possibleLevel = [];
    const copy = Object.assign({}, this.userinfoService.getUserinfo()),
        limit = copy.level;
    this.selfAccount = this.userinfo.userId === copy._id;

    for (let i = 0; i < this.levels.length; i++) {
      if (this.levels[i].value < limit) this.possibleLevel.push(this.levels[i]);
    }
  }

  defaultValue(value) {
    if (value === undefined) return '';
    else return value;
  }

  restricted() {
    if (this.userinfoService.getUserinfo() === null || this.userinfo === undefined) return true;
    else if (this.userinfo.userId === this.userinfoService.getUserinfo()._id) return false;
    else if (this.userinfo.level < this.userinfoService.getUserinfo().level) return false;
    else return true;
  }

  editAdminPrivilage(form: NgForm) {
    if (this.selfAccount) form.value.level = this.userinfo.level;

    const copy = Object.assign({}, this.userinfo),
        userId = copy.userId,
        updatedUserinfo = form.value;
    this.adminService.updateUserPrivilage(userId, updatedUserinfo)
      .then(result =>  {
        this.userinfoUpdated.emit(result);
      });
  }

}
