import { Pipe, PipeTransform } from '@angular/core';

import { LanguageService } from './language.service';
import { SettingService } from '../services/setting.service';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(
    private _lang: LanguageService,
    private settings: SettingService
  ) {
  }

  transform(value: string, lang: string): string {
    if (!value) return;
    return this._lang.translate(value, lang);
  }

}
