import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormModuleConfig } from '../form.config';
import { TextInputConfig } from '../text-input/text-input.component';
import { Translation } from "../../../../../shared/models/translation";
import { Observable } from 'rxjs';
import { Language } from 'src/app/shared/models/language';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-multilanguage-text-input',
  template: `
    <app-text-input *ngIf="(language$ | async).value === 'en'" [textInputConfig]="textInputConfigEn"></app-text-input>
    <app-text-input *ngIf="(language$ | async).value === 'es'" [textInputConfig]="textInputConfigEs"></app-text-input>
    <app-text-input *ngIf="(language$ | async).value === 'de'" [textInputConfig]="textInputConfigDe"></app-text-input>
  `
})
export class MultilanguageTextInputComponent implements OnInit {
  @Input() multilanguageTextInputConfig: MultilanguageTextInputConfig; 
  textFormGroup: FormGroup;
  
  language$: Observable<Language>

  
  textInputConfigEn = new TextInputConfig();
  textInputConfigEs = new TextInputConfig();
  textInputConfigDe = new TextInputConfig();

  constructor(private fb: FormBuilder, private store: Store<AppState>) { 
    this.language$ = store.select(store => store.formLanguage);

    this.textFormGroup = this.fb.group({
      inputEn: ['', [Validators.required]],
      inputEs: ['', []],
      inputDe: ['', []]
    }, [Validators.required])
  }

  ngOnInit(): void {
    this.initializeComponents();    

    this.textInputConfigEn.formControl = this.textFormGroup.get('inputEn') as FormControl;
    this.textInputConfigEs.formControl = this.textFormGroup.get('inputEs') as FormControl;
    this.textInputConfigDe.formControl = this.textFormGroup.get('inputDe') as FormControl;
  }

  getGroup(){
    return this.textFormGroup;
  }
  
  getValue(){
    return [
      new Translation('en', this.f.inputEn.value),
      new Translation('es', this.f.inputEs.value),
      new Translation('de', this.f.inputDe.value),      
    ];
  }

  setValue(translations: Translation[]){
    // TODO: Match Language, don't trust order
    this.f.inputEn.setValue(translations[0].quote)
    this.f.inputEs.setValue(translations[1].quote)
    this.f.inputDe.setValue(translations[2].quote)
  }

  setSubmitted(submitted){
    this.textInputConfigEn.formSubmitted = submitted;
  }

  private get f() { return this.textFormGroup.controls; }

  private initializeComponents(){

    this.textInputConfigEn.fieldName = this.multilanguageTextInputConfig.fieldName;
    this.textInputConfigEn.required = this.multilanguageTextInputConfig.required;
    this.textInputConfigEn.placeholder = `${ this.multilanguageTextInputConfig.placeholder } in English`;
    this.textInputConfigEn.formSubmitted = false;

    this.textInputConfigEs.fieldName = this.multilanguageTextInputConfig.fieldName;
    this.textInputConfigEs.required = false;
    this.textInputConfigEs.placeholder = `${ this.multilanguageTextInputConfig.placeholder } in Spanish`;
    // this.textInputConfigEs.formSubmitted = this.submitted;

    this.textInputConfigDe.fieldName = this.multilanguageTextInputConfig.fieldName;
    this.textInputConfigDe.required = false;
    this.textInputConfigDe.placeholder = `${ this.multilanguageTextInputConfig.placeholder } in German`;
    // this.textInputConfigDe.formSubmitted = this.submitted;

  }

}

export class MultilanguageTextInputConfig extends FormModuleConfig {
  placeholder: string = '';
  selectedLanguage: string;
}
