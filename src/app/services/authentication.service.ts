import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ipHost, testing } from '../globals';

@Injectable()
export class AuthenticationService {

  private apiUrl = ipHost + '/authentication';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  register(formValue) {
    const url = this.apiUrl + '/register',
      input = formValue;
    return this.http.post(url, JSON.stringify({ 'input': input }), { headers: this.headers })
      .toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err => null);
  }

  login(formValue) {
    const url = this.apiUrl + '/login/' + formValue.username + '/' + formValue.password;

    return this.http.get(url).toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err => null);
  }
  loginWithCookie(cookie) {
    const url = this.apiUrl + '/loginwithcookie/' + cookie.username + '/' + cookie._id;

    return this.http.get(url).toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err => null);
  }

}
