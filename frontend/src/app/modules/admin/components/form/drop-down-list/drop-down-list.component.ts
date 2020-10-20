import { KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormModuleConfig } from '../form.config';

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.css']
})
export class DropDownListComponent implements OnInit {
  @Input() dropDownListInputConfig: DropDownListInputConfig;

  constructor() { }

  ngOnInit(): void {
  }

}

export class DropDownListInputConfig extends FormModuleConfig {
  submitted: boolean = false;
  options: Option[];
  formControl: FormControl;
}

class Option{
  key: String;
  value: String;
}