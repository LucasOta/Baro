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

  show(el: number){
    let properties = []; 
    switch (this.item.get('typeOfItem').value) {
      case ItemTypes.Title:
        properties = [ItemElements.Title];
        break;
    
      case ItemTypes.Text:
        properties = [ItemElements.Title, ItemElements.Subtitle, ItemElements.Description];        
        break;
      
      case ItemTypes.Video:
        properties = [ItemElements.Video];  
        break;
    
      case ItemTypes.Image: case ItemTypes.ImageGroup:
        properties = [ItemElements.Image];
        break;
      
      case ItemTypes.Testimonial:
        properties = [ItemElements.Testimonial];
        break;
      
      case ItemTypes.TextImage:
        properties = [ItemElements.Title, ItemElements.Subtitle, ItemElements.Description, ItemElements.Image];
        break;
    
      default:
        return false;
    }
    
    if (properties.includes(el)) return true; 
    return false;
  }

}

// export class ItemConfig {
//   type: number;
// }
