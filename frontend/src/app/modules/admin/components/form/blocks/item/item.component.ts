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
  properties = [];

  // Elements
  videoTextInputConfig = new TextInputConfig();

  constructor() {} 

  ngOnInit(): void {
    this.setProperties();    
    this.initializeComponents();
  }

  private initializeComponents(){
    if (this.properties.includes(ItemElements.Video)){
      this.videoTextInputConfig.fieldName = 'Video';
      this.videoTextInputConfig.required = true;
      this.videoTextInputConfig.placeholder = 'Link to Video';
      this.videoTextInputConfig.formSubmitted = false; //Harcoded
      this.videoTextInputConfig.formControl = this.item.get('video') as FormControl; 
    }

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
