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

  getUsers(start=0, limit=10) {
    let url = this.apiUrl + '/getusers/' + start + '/' + limit;

    return this.http.get(url).toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        this.subjectUsers.next(result);
      })
      .catch(err=>{
        this.subjectUsers.next(err);
      });
  }

  setAccoundActive(userId) {
    let url = this.apiUrl + '/setaccountactive',
            input = {userId: userId};
    return this.http.post(url, JSON.stringify({ 'input': input }), { headers: this.headers })
      .toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err=>{return null});
  }
  deleteAccount(userId) {
    let url = this.apiUrl + '/deleteaccount',
            input = {userId: userId};
    return this.http.post(url, JSON.stringify({ 'input': input }), { headers: this.headers })
      .toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err=>{return null});
  }

  // Observable
  observeUsers(): Observable<any> {
    return this.subjectUsers.asObservable();
  }

}
