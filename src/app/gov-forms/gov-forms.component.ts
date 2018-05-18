import { Component, OnInit } from '@angular/core';

import { PageService } from '../services/page.service';
import { SettingService } from '../services/setting.service';
import { SocketioService } from '../services/socketio.service';

@Component({
  selector: 'app-gov-forms',
  templateUrl: './gov-forms.component.html',
  styleUrls: ['./gov-forms.component.css']
})
export class GovFormsComponent implements OnInit {

  constructor(
    private pageService: PageService,
    private settingService: SettingService,
    private socketioService: SocketioService
  ) { }

  ngOnInit() {
  }

  formSubmitted(result) {
    if (result.status) {
      this.pageService.setSubpage('Form submitted confirmation');
      this.socketioService.userFormSubmitted(result.data);
    }
  }

}
