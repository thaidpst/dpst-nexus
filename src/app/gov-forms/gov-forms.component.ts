import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class GovFormsComponent extends TranslateComponent implements OnInit, OnDestroy {

  _formSubmitted = false;
  private formSubmittedSubscription: Subscription;

  constructor(
    settings: SettingService,
    private socketioService: SocketioService,
    private formService: FormService,
    private router: Router
  ) {
    super(settings);
  }

  ngOnInit() {
    this.formSubmittedSubscription = this.formService.formSubmitted.subscribe(result => {
      if (result.status) {
        this._formSubmitted = true;
        this.socketioService.userFormSubmitted(result.data);
      }
    });
  }

  ngOnDestroy() {
    this.formSubmittedSubscription.unsubscribe();
  }
}
