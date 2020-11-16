import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ItemTypes, ItemElements } from 'src/app/shared/enums/item';
import { TextInputConfig } from '../../text-input/text-input.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: FormGroup;
  itemTypes = ItemTypes;
  itemElements = ItemElements;
  timestampTextInputConfig = new TextInputConfig();
  properties = [];

  constructor() {} 

  ngOnInit(): void {
    this.initializeComponents();
    this.setProperties();    
  }

  private initializeComponents(){

    this.timestampTextInputConfig.fieldName = 'Timestamp';
    this.timestampTextInputConfig.required = true;
    this.timestampTextInputConfig.placeholder = 'Timestamp';
    this.timestampTextInputConfig.formSubmitted = false; //Harcoded
    this.timestampTextInputConfig.formControl = new FormControl('Hola Jorge'); 

  }

  show(el: number){
    if (this.properties.includes(el)) return true; 
    return false;
  }

  setProperties(){
    switch (this.item.get('typeOfItem').value) {
      case ItemTypes.Title:
        this.properties = [ItemElements.Title];
        break;
    
      case ItemTypes.Text:
        this.properties = [ItemElements.Title, ItemElements.Subtitle, ItemElements.Description];        
        break;
      
      case ItemTypes.Video:
        this.properties = [ItemElements.Video];  
        break;
    
      case ItemTypes.Image: case ItemTypes.ImageGroup:
        this.properties = [ItemElements.Image];
        break;
      
      case ItemTypes.Testimonial:
        this.properties = [ItemElements.Testimonial];
        break;
      
      case ItemTypes.TextImage:
        this.properties = [ItemElements.Title, ItemElements.Subtitle, ItemElements.Description, ItemElements.Image];
        break;
    }
  }

}
