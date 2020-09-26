import { Component, Input, OnInit } from '@angular/core';
import { Language, defaultLanguages } from "../../models/language";

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent implements OnInit {
  @Input() languageSelectorConfig: LanguageSelectorConfig;

  constructor() {
    
  }

  ngOnInit(): void {
    if(!this.languageSelectorConfig.languages){
      this.languageSelectorConfig.languages = defaultLanguages;
    }
    if(!this.languageSelectorConfig.selectedLanguage){
      this.languageSelectorConfig.selectedLanguage = this.languageSelectorConfig.languages[0];
    }
  }

  setSelectedLanguage(value){
    this.languageSelectorConfig.selectedLanguage = value;
    this.languageSelectorConfig.onChange(value);   
  }

}

export class LanguageSelectorConfig {
  selectedLanguage: Language = defaultLanguages[0];
  languages?: Language[];
  onChange: Function;
}
