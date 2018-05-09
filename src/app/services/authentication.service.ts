import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ipHost, testing } from '../globals';
import { JsonResponse } from '../schemas/json-response';
import { UserInfo } from '../schemas/user-info';
import { UserinfoService } from './userinfo.service';

@Injectable()
export class AuthenticationService {

  private apiUrl = ipHost + '/authentication';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http,
    private httpClient: HttpClient,
    private userinfoService: UserinfoService
  ) { }

  authenticate() {
    const url = this.apiUrl + '/authenticate';
    return this.httpClient.get<JsonResponse>(url).toPromise()
      .then(response => {
        if (testing) console.log(response.message);
        if (response.status) return response.data;
        return null;
      })
      .catch(err => null);
  }

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
}
