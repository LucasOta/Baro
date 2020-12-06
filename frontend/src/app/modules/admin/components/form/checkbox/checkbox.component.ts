import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormModuleConfig } from '../form.config';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  @Input() checkboxConfig: CheckboxConfig;

  constructor() { }

  ngOnInit(): void {
  }

}

export class CheckboxConfig extends FormModuleConfig {
  submitted: boolean = false;
  formControl: FormControl;
}
