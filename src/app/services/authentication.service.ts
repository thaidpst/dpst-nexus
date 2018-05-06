import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ipHost, testing } from '../globals';

@Injectable()
export class AuthenticationService {

  private apiUrl = ipHost + '/authentication';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  register(formValue) {
    let url = this.apiUrl + '/register',
        input = formValue;
    return this.http.post(url, JSON.stringify({ 'input': input }), { headers: this.headers })
      .toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err=>{return null});
  }
  login(formValue) {
    let url = this.apiUrl + '/login/' + formValue.username + '/' + formValue.password;
    
    return this.http.get(url).toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err=>{return null});
  }

}
