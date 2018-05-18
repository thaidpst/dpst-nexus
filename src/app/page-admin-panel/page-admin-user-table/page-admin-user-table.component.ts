import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SocketioService } from '../../services/socketio.service';
import { SettingService } from '../../services/setting.service';
import { UserinfoService } from '../../services/userinfo.service';
import { AdminService } from '../../services/admin.service';

import { TranslateComponent } from '../../languages/translate.component';

@Component({
  selector: 'app-page-admin-user-table',
  templateUrl: './page-admin-user-table.component.html',
  styleUrls: ['./page-admin-user-table.component.css']
})
export class PageAdminUserTableComponent extends TranslateComponent implements OnInit, OnDestroy {

  private getUsersSubscription: Subscription;
  private criteria = {
    page: 0, start: 0, limit: 25, totalUsers: 0,
    sort: 'None', search: 'EmptyNone'
  };
  private pagination = [];
  private users = null;

  private subpage = 'Table';

  private userOnHand = null;

  constructor(
    settings: SettingService,
    private socketioService: SocketioService,
    private userinfoService: UserinfoService,
    private adminService: AdminService,
  ) {
    super(settings);
  }

  ngOnInit() {
    this.getUsersSubscription = this.adminService.observeUsers().subscribe(result => {
      if (result.status) {
        this.users = result.data;
        this.criteria.totalUsers = result.totalUsers;

        this.pagination = [];
        let count = 0;
        while (count * this.criteria.limit < this.criteria.totalUsers) {
          this.pagination.push(count);
          count += 1;
        }
      }
    });
    this.adminService.getUsers(this.criteria);

    this.socketioService.getSocket().on('update-new-users', function() {
      this.adminService.getUsers(this.criteria);
    }.bind(this));
    this.socketioService.getSocket().on('announce-admin-account-status', function() {
      this.adminService.getUsers(this.criteria);
    }.bind(this));
    this.socketioService.getSocket().on('announce-account-delete', function() {
      this.adminService.getUsers(this.criteria);
    }.bind(this));
  }

  setAccountStatus(userinfo, status) {
    this.adminService.setAccoundStatus(userinfo, status).then(result => {
      if (result.status) {
        this.adminService.getUsers(this.criteria);
        this.socketioService.accountStatus(userinfo._id);
      }
    });
  }

  tableLimitChange(limit) {
    this.criteria.page = 0;
    this.criteria.start = 0;
    this.criteria.limit = limit;
    this.criteria.totalUsers = 0;
    this.pagination = [];
    this.users = null;
    this.adminService.getUsers(this.criteria);
  }
  paginationChangePage(page) {
    this.criteria.page = page;
    this.criteria.start = page * this.criteria.limit;
    this.adminService.getUsers(this.criteria);
  }
  previouseTablePage() {
    if (this.criteria.page > 0) {
      this.criteria.page -= 1;
      this.criteria.start = this.criteria.page * this.criteria.limit;
      this.adminService.getUsers(this.criteria);
    }
  }
  nextTablePage() {
    if ((this.criteria.page + 1) * this.criteria.limit < this.criteria.totalUsers) {
      this.criteria.page += 1;
      this.criteria.start = this.criteria.page * this.criteria.limit;
      this.adminService.getUsers(this.criteria);
    }
  }
  tableSortChange(sort) {
    this.criteria.sort = sort;
    this.adminService.getUsers(this.criteria);
  }
  tableSearch(keyword) {
    keyword = keyword.trim();
    if ((this.criteria.search === 'EmptyNone' && keyword === '') || this.criteria.search === keyword) {
    } else if (keyword === '') {
      this.criteria.search = 'EmptyNone';
      this.adminService.getUsers(this.criteria);
    } else {
      this.criteria.search = keyword;
      this.adminService.getUsers(this.criteria);
    }
  }

  goBackToUserTable() { this.subpage = 'Table'; this.userOnHand = null; }

  // Delete user process
  tryDeleteAccount(userinfo) { this.subpage = 'Try delete'; this.userOnHand = userinfo; }
  deleteAccount() {
    if (this.userOnHand !== null) {
      this.adminService.deleteAccount(this.userOnHand).then(result => {
        if (result.status) {
          this.adminService.getUsers(this.criteria);
          this.socketioService.deleteAccount(this.userOnHand._id);
          this.userOnHand = null;
          this.subpage = 'Table';
        }
      });
    }
  }

  // View user process
  viewUserinfo(userinfo) {
    this.userinfoService.getUserDetail(userinfo)
      .then(result => {
        if (result !== null && result.status) {
          this.userOnHand = result.data;
          this.subpage = 'View user';
        }
      });
  }
  viewUserPosition() {
    if (this.userOnHand.position === undefined) return 'N/A';
    else return this.userOnHand.position;
  }
  viewUserAbout() {
    if (this.userOnHand.about === undefined) return 'N/A';
    else return this.userOnHand.about;
  }

  // Edit user information process
  adminEditUserinfo(userinfo) {
    this.userinfoService.getUserDetail(userinfo)
      .then(result => {
        if (result !== null && result.status) {
          this.userOnHand = result.data;
          this.subpage = 'Edit user';
        }
      });
  }
  userDetailUpdatedDone(result) {
    if (result.status) {
      this.subpage = 'Table';
    }
  }

  // Admin privilage process
  goToAdminPrivilageSetting() { this.subpage = 'Admin setting'; }
  userPrivilageUpdatedDone(result) {
    if (result.status) {
      this.adminService.getUsers(this.criteria);
      this.socketioService.accountPrivilage(this.userOnHand.userId);
      this.userOnHand = null;
      this.subpage = 'Table';
    }
  }

  ngOnDestroy() {
    this.getUsersSubscription.unsubscribe();

    // Unbind Socket.io
    this.socketioService.getSocket().removeAllListeners('update-new-users');
    this.socketioService.getSocket().removeAllListeners('announce-admin-account-status');
    this.socketioService.getSocket().removeAllListeners('announce-account-delete');
  }

}
