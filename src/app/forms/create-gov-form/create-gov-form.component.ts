import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { SettingService } from '../../services/setting.service';
import { FileuploadService } from '../../services/fileupload.service';
import { UserinfoService } from '../../services/userinfo.service';
import { FormService } from '../../services/form.service';

import { TranslateComponent } from '../../languages/translate.component';

@Component({
  selector: 'app-create-gov-form',
  templateUrl: './create-gov-form.component.html',
  styleUrls: ['./create-gov-form.component.css']
})
export class CreateGovFormComponent extends TranslateComponent implements OnInit {

  private formCategory = null;
  private _formSubmitted = false;  
  private files = {pdfForm: null, previewUrl: null};

  constructor(
    settings: SettingService,
    private fileuploadService: FileuploadService,
    private userinfoService: UserinfoService,
    private formService: FormService
  ) {
    super(settings);
  }

  ngOnInit() {
    this.formService.getFormCategory().then(result=>{
      if (result.status) this.formCategory = result.data; console.log(this.formCategory)
    });
  }

  choosePdfForm(pdfForm: any) {
    this.files.pdfForm = <File>pdfForm.target.files[0];
  }
  choosePdfPreview(previewUrl: any) {
    this.files.previewUrl = <File>previewUrl.target.files[0];
  }

  adminCreateGovForm(govForm: NgForm) {
    let userinfo = Object.assign({}, this.userinfoService.getUserinfo());

    if (!this._formSubmitted && userinfo.level>=7 && this.files.pdfForm!==null) {
      this._formSubmitted = true;
      console.log(govForm.value)

      // let formFile: any = new FormData();
      // formFile.append('pdfForm', this.files.pdfForm, this.files.pdfForm['name']);
      // this.fileuploadService.uploadGovForm(formFile).then(result1=>{
      //   if (result1.status) {

      //     if (this.files.previewUrl===null) this.adminCreateGovFormDB(govForm.value, {pdfForm: result1.data});
      //     else {
      //       let formPreviewFile: any = new FormData();
      //       formPreviewFile.append('previewUrl', this.files.previewUrl, this.files.previewUrl['name']);
      //       this.fileuploadService.uploadGovFormPreview(formPreviewFile).then(result2=>{
      //         if (result2.status) this.adminCreateGovFormDB(govForm.value, {pdfForm: result1.data, previewUrl: result2.data});
      //       });
      //     }
      //   }
      // });

    }
  }
  adminCreateGovFormDB(formValue, formPath) {
    let object = {...formValue, ...formPath, ...{}}
    console.log(formPath)
  }

}
