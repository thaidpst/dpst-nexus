import { Injectable } from '@angular/core';

@Injectable()
export class SettingService {

  private language = 'Thai'; // Thai or English

  constructor() { }

  setLanguage(language) {this.language = language}
  getLanguage() {return this.language}

}
