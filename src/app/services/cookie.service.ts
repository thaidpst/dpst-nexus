import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ipHost, testing } from '../globals';

@Injectable()
export class CookieService {

  private apiUrl = ipHost + '/cookie';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  checkRememberLogin() {
    let url = this.apiUrl + '/checkrememberlogin';

    return this.http.get(url).toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err=>{return null});
  }

  setUserLoginCookie(userinfo) {
    let url = this.apiUrl + '/setlogincookie/' + userinfo.username + '/' + userinfo._id;

    this.http.get(url).toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err=>{return null});
  }
  clearUserLoginCookie() {
    let url = this.apiUrl + '/clearlogincookie';

    this.http.get(url).toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err=>{return null});
  }

}
