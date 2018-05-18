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
  private subjectPendingFormNumber = new Subject<any>();

  private subjectAdminForms = new Subject<any>();
  private subjectAdminSubmittedForms = new Subject<any>();

  private mode = 'New'; // New, Edit, View, ByPass (Admin)
  private form = null;
  private role = 'User'; // User, Admin
  private currentForm = null;
  private criteria = null;

  constructor(private http: Http) { }

  setMode(mode='New', form=null, role='User', currentForm=null, criteria=null) {
    if (form===null) {
      this.mode = 'New'; this.form = null; this.role = 'User';
      this.currentForm = null; this.criteria = null;
    } else if (role=='User') {
      this.mode = mode; this.form = form; this.role = 'User';
      this.currentForm = null; this.criteria = null;
    } else {
      this.mode = mode; this.form = form; this.role = role;
      this.currentForm = currentForm; this.criteria = criteria;
    }
  }
  getMode() {return this.mode}
  getForm() {return this.form}
  getRole() {return this.role}
  getCurrentForm() {return this.currentForm}
  getCriteria() {return this.criteria}

  getFormCategory() {
    let url = this.apiUrl + '/getformcategory';

    return this.http.get(url).toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err=>{return null});
  }

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
      + criteria.start + '/' + criteria.limit + '/' + criteria.sort;

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

  getPendingFormNumber() {
    let url = this.apiUrl + '/pendingformnumber';

    return this.http.get(url).toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        this.subjectPendingFormNumber.next(result);
      })
      .catch(err=>{
        this.subjectPendingFormNumber.next(err);
      });
  }

  adminGetActiveForms(criteria) {
    let url = this.apiUrl + '/admingetactiveforms/' + criteria.category + '/'
      + criteria.start + '/' + criteria.limit + '/' 
      + criteria.sort + '/' + criteria.search.replace(/\//g, '');

    return this.http.get(url).toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        this.subjectAdminForms.next(result);
      })
      .catch(err=>{
        this.subjectAdminForms.next(err);
      });
  }
  adminGetSubmittedForms(form, criteria) {
    let url = this.apiUrl + '/admingetsubmittedforms/' + form._id + '/'
      + criteria.start + '/' + criteria.limit + '/' + criteria.sort;

    return this.http.get(url).toPromise()
      .then(response=>{
        let result = response.json();
        if (testing) console.log(result.message);
        this.subjectAdminSubmittedForms.next(result);
      })
      .catch(err=>{
        this.subjectAdminSubmittedForms.next(err);
      });
  }

  setSubmittedFormStatus(form, status, approver) {
    let url = this.apiUrl + '/setsubmittedformstatus',
        input = {formId: form._id, status: status, approver: approver};
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
  observeForms(): Observable<any> {return this.subjectForms.asObservable()}
  observeSubmittedForms(): Observable<any> {return this.subjectSubmittedForms.asObservable()}
  observePendingFormNumber(): Observable<any> {return this.subjectPendingFormNumber.asObservable()}

  observeAdminForms(): Observable<any> {return this.subjectAdminForms.asObservable()}
  observeAdminSubmittedForms(): Observable<any> {return this.subjectAdminSubmittedForms.asObservable()}
}
