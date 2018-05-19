import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ipHost, testing } from '../globals';
import { UserInfo } from '../schemas/user-info';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserinfoService {

  private userinfo: UserInfo;

  private apiUrl = ipHost + '/user';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http,
    private authenticationService: AuthenticationService
  ) { }

  init(): Promise<void> {
    // Check remember me login
    return this.authenticationService.authenticate()
      .then(userInfo => this.setUserinfo(userInfo));
  }

  setUserinfo(userinfo) {
    this.userinfo = userinfo;
  }

  get isLoggedIn(): boolean {
    return this.userinfo !== null;
  }

  get isAdmin(): boolean {
    return this.userinfo.level >= 7;
  }

  get isActive(): boolean {
    return this.userinfo.status === 'Active';
  }

  getUserinfo(): UserInfo {
    return this.userinfo;
  }

  update() {
    const url = this.apiUrl + '/update/' + this.userinfo._id;

    return this.http.get(url).toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        this.userinfo = result.data;
      })
      .catch(err => {
        this.userinfo = null;
      });
  }

  getUserDetail(userinfo) {
    const url = this.apiUrl + '/getuserdetail/' + userinfo._id;

    return this.http.get(url).toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err => null);
  }

  updateUserDetail(userId, updatedUserDetail) {
    const url = this.apiUrl + '/updateuserdetail',
      input = { userId: userId, updatedUserDetail: updatedUserDetail };
    return this.http.post(url, JSON.stringify({ 'input': input }), { headers: this.headers })
      .toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err => null);
  }

}
