import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TextInputConfig } from '../../text-input/text-input.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  timestampTextInputConfig = new TextInputConfig();

  constructor() { }

  ngOnInit(): void {
    this.initializeComponents();
  }

  private initializeComponents(){

    this.timestampTextInputConfig.fieldName = 'Timestamp';
    this.timestampTextInputConfig.required = true;
    this.timestampTextInputConfig.placeholder = 'Timestamp';
    this.timestampTextInputConfig.formSubmitted = false; //Harcoded
    this.timestampTextInputConfig.formControl = new FormControl('Hola Jorge'); 

  }

}
