import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TextInputConfig } from '../../text-input/text-input.component';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  @Input() block: FormGroup;

  bgColorTextInputConfig = new TextInputConfig();
  fontColorTextInputConfig = new TextInputConfig();

  constructor() { 
  }
  
  ngOnInit(): void {
    this.initializeComponents();
  }

  private initializeComponents(){

    this.bgColorTextInputConfig.fieldName = 'bgColor';
    this.bgColorTextInputConfig.required = true;
    this.bgColorTextInputConfig.placeholder = 'Background Color';
    this.bgColorTextInputConfig.formSubmitted = false; //Harcoded
    this.bgColorTextInputConfig.formControl = this.block.get('bgColor') as FormControl; 
    
    this.fontColorTextInputConfig.fieldName = 'color';
    this.fontColorTextInputConfig.required = true;
    this.fontColorTextInputConfig.placeholder = 'Font Color';
    this.fontColorTextInputConfig.formSubmitted = false; //Harcoded
    this.fontColorTextInputConfig.formControl = this.block.get('fontColor') as FormControl; 

  }

}
