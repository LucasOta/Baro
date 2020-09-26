import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormModuleConfig } from '../form.config';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {
  @Input() textInputConfig: TextInputConfig;

  constructor() { }

  ngOnInit(): void {
  }

}

export class TextInputConfig extends FormModuleConfig {
  submitted: boolean = false;
  placeholder: string = '';
  formControl: FormControl;
}