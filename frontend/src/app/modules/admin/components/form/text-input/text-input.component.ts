import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { FormModuleConfig } from '../form.config';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
  @Input() textInputConfig: TextInputConfig;
  submitted$: Observable<Boolean>;
  
  constructor( private store: Store<AppState>) { 
    this.submitted$ = store.select(store => store.formSubmitted);
  }

  ngOnInit(): void {
  }

}

export class TextInputConfig extends FormModuleConfig {
  submitted: boolean = false;
  placeholder: string = '';
  formControl: FormControl;
}