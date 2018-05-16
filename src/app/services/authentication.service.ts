import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ipHost, testing } from '../globals';
import { JsonResponse } from '../schemas/json-response';
import { UserInfo } from '../schemas/user-info';
import { UserinfoService } from './userinfo.service';

@Injectable()
export class AuthenticationService {

  private apiUrl = ipHost + '/authentication';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
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
    return this.httpClient.post<JsonResponse>(url, JSON.stringify({ 'input': input }), { headers: this.headers })
      .toPromise()
      .then(response => {
        if (testing) console.log(response.message);
        return response;
      })
      .catch(err => null);
  }

  login(formValue) {
    const url = this.apiUrl + '/login';
    return this.httpClient.post<JsonResponse>(url, JSON.stringify(formValue),
      { headers: this.headers })
      .toPromise()
      .then(response => {
        if (testing) console.log(response.message);
        return response;
      })
      .catch(err => null);
  }
}
