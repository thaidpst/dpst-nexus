import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ipHost, testing } from '../globals';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AdminService {

  private apiUrl = ipHost + '/admin';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  private subjectUsers = new Subject<any>();

  constructor(private http: Http) { }

  getUsers(criteria) {
    const url = this.apiUrl + '/getusers/' + criteria.start + '/' + criteria.limit + '/' 
      + criteria.sort + '/' + criteria.search.replace(/\//g, '');

    return this.http.get(url).toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        this.subjectUsers.next(result);
      })
      .catch(err => {
        this.subjectUsers.next(err);
      });
  }

  setAccoundStatus(userinfo, status) {
    const url = this.apiUrl + '/setaccountstatus',
      input = { userId: userinfo._id, status: status };
    return this.http.post(url, JSON.stringify({ 'input': input }), { headers: this.headers })
      .toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err => null);
  }
  updateUserPrivilage(userId, updatedUserinfo) {
    const url = this.apiUrl + '/updateuserprivilage',
      input = { userId: userId, updatedUserinfo: updatedUserinfo };
    return this.http.post(url, JSON.stringify({ 'input': input }), { headers: this.headers })
      .toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err => null);
  }

  deleteAccount(userinfo) {
    const url = this.apiUrl + '/deleteaccount',
      input = { userId: userinfo._id };
    return this.http.post(url, JSON.stringify({ 'input': input }), { headers: this.headers })
      .toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err => null);
  }

  // Observable
  observeUsers(): Observable<any> {
    return this.subjectUsers.asObservable();
  }

}
