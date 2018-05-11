import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ipHost, testing } from '../globals';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FormService {

  private apiUrl = ipHost + '/form';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  private subjectForms = new Subject<any>();
  private subjectSubmittedForms = new Subject<any>();

  private mode = 'New'; // New, Edit, View
  private form = null;
  private role = 'User'; // User, Admin

  constructor(private http: Http) { }

  setMode(mode='New', form=null, role='User') {
    if (form===null) {this.mode = 'New'; this.form = null; this.role = 'User';}
    else {
      this.mode = mode;
      this.form = form;
      this.role = role;
    }
  }
  getMode() {return this.mode}
  getForm() {return this.form}
  getRole() {return this.role}

  getActiveForms(criteria) {
    let url = this.apiUrl + '/getactiveforms/' + criteria.category + '/'
      + criteria.start + '/' + criteria.limit + '/' 
      + criteria.sort + '/' + criteria.search.replace(/\//g, '');

    return this.http.get(url).toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        this.subjectForms.next(result);
      })
      .catch(err=>{
        this.subjectForms.next(err);
      });
  }
  getFormDetail(accessCode) {
    let url = this.apiUrl + '/getformdetail/' + accessCode;

    return this.http.get(url).toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err=>{return null});
  }

  getSubmittedForms(userId, criteria) {
    let url = this.apiUrl + '/getsubmittedforms/' + userId + '/'
      + criteria.start + '/' + criteria.limit + '/' 
      + criteria.sort + '/' + criteria.search.replace(/\//g, '');;

    return this.http.get(url).toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        this.subjectSubmittedForms.next(result);
      })
      .catch(err=>{
        this.subjectSubmittedForms.next(err);
      });
  }

  submitForm(userId, formId, formValue) {
    let url = this.apiUrl + '/submit',
        input = {userId: userId, formId: formId, formValue: formValue};
    return this.http.post(url, JSON.stringify({ 'input': input }), { headers: this.headers })
      .toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err=>{return null});
  }
  deleteSubmittedForm(userId, form) {
    let url = this.apiUrl + '/deletesubmittedform',
            input = {userId: userId, formId: form._id};
    return this.http.post(url, JSON.stringify({ 'input': input }), { headers: this.headers })
      .toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err=>{return null});
  }

  editSubmittedGovForm(formId, formValue) {
    let url = this.apiUrl + '/editform',
        input = {formId: formId, formValue: formValue};
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
  observeForms(): Observable<any> {
    return this.subjectForms.asObservable();
  }
  observeSubmittedForms(): Observable<any> {
    return this.subjectSubmittedForms.asObservable();
  }

}
