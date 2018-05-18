import { SettingService } from '../services/setting.service';

export class TranslateComponent {

  constructor(private settings: SettingService) {
  }

  get language() {
    return this.settings.getLanguage();
  }
}
