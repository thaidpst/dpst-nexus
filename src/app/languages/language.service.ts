import { Injectable } from '@angular/core';

import { LANG_TH_TRANS } from './lang-th';


const dictionary = {
  'Thai': LANG_TH_TRANS
};

@Injectable()
export class LanguageService {

  constructor() { }

  getMsg(msg: string) {
    return msg;
  }

  translate(value: string, lang: string): string {
    if (dictionary[lang]) {
      const translated = dictionary[lang][value.toLowerCase()];
      return translated !== null ? translated : value;
    }
    return value;
  }
}
