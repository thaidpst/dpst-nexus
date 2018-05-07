import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ipHost, testing } from '../globals';

@Injectable()
export class UserinfoService {

  private userinfo = null;

  private apiUrl = ipHost + '/user';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  setUserinfo(userinfo) {this.userinfo = userinfo}
  getUserinfo() {return this.userinfo}

  update() {
    let url = this.apiUrl + '/update/' + this.userinfo._id;

    return this.http.get(url).toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        this.userinfo = result.data;
      })
      .catch(err=>{
        this.userinfo = null;
      });
  }

  getUserDetail(userinfo) {
    let url = this.apiUrl + '/getuserdetail/' + userinfo._id;

    return this.http.get(url).toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err=>{return null});
  }

}
