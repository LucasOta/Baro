import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  year = new Date().getFullYear();

  constructor(private translate: TranslateService) {}

  get isEnglish(): boolean {
    return this.translate.currentLang === 'en';
  }
}
