import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

import { ipHost, testing } from '../globals';

@Injectable()
export class CookieService {

  private apiUrl = ipHost + '/cookie';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  setUserLoginCookie(userinfo) {
    const url = this.apiUrl + '/setlogincookie/' + userinfo.username + '/' + userinfo._id;

    this.http.get(url).toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err => null);
  }
  clearUserLoginCookie() {
    const url = this.apiUrl + '/clearlogincookie';

    this.http.get(url).toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err => null);
  }

}
