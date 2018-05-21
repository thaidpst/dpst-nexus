import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ipHost, testing } from '../globals';

@Injectable()
export class FileuploadService {

  private apiUrl = ipHost + '/fileupload';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  deleteUserProfile(userId) {
    const url = this.apiUrl + '/deleteuserprofile',
      input = { userId: userId };
    return this.http.post(url, JSON.stringify({ 'input': input }), { headers: this.headers })
      .toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err => null);
  }
  uploadUserProfile(userId, profileData) {
    const url = this.apiUrl + '/uploaduserprofile?userId=' + userId;
    return this.http.post(url, profileData)
      .toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err => null);
  }

  uploadGovForm(formFile) {
    const url = this.apiUrl + '/uploadgovform'
    return this.http.post(url, formFile)
      .toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err => null);
  }
  uploadGovFormPreview(formPreviewFile) {
    const url = this.apiUrl + '/uploadgovformpreview'
    return this.http.post(url, formPreviewFile)
      .toPromise()
      .then(response => {
        const result = response.json();
        if (testing) console.log(result.message);
        return result;
      })
      .catch(err => null);
  }

}
