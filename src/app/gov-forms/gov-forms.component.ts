import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SettingService } from '../services/setting.service';
import { SocketioService } from '../services/socketio.service';
import { FormService } from '../services/form.service';

import { TranslateComponent } from './../languages/translate.component';

@Component({
  selector: 'app-gov-forms',
  templateUrl: './gov-forms.component.html',
  styleUrls: ['./gov-forms.component.css']
})
export class GovFormsComponent extends TranslateComponent implements OnInit {

  _formSubmitted = false;

  constructor(
    settings: SettingService,
    private socketioService: SocketioService,
    private formService: FormService,
    private router: Router
  ) {
    super(settings);
  }

  ngOnInit() {
    this.formService.formSubmitted.subscribe(result => {
      if (result.status) {
        this._formSubmitted = true;
        this.socketioService.userFormSubmitted(result.data);
      }
    });
  }
}
