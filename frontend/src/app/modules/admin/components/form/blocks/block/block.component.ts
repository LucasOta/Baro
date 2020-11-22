import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TextInputConfig } from '../../text-input/text-input.component';
import { ItemTypes } from "../../../../../../shared/enums/item"
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  @Input() block: FormGroup;
  itemTypesForTemplate = ItemTypes;

  bgColorTextInputConfig = new TextInputConfig();
  fontColorTextInputConfig = new TextInputConfig();

  constructor() {}
  
  ngOnInit(): void {
    this.initializeComponents();
  }

  addItem(i: number){
    // TODO: Multilanguage comented
    switch (i) {
      case ItemTypes.Title:
        (this.block.controls['items'] as FormArray).push(
          new FormGroup({
            typeOfItem: new FormControl(i),
            // title: new FormControl('', Validators.required) 
          })
        );
        break;
    
      case ItemTypes.Text:
        (this.block.controls['items'] as FormArray).push(
          new FormGroup({
            typeOfItem: new FormControl(i),
            // title: new FormControl(''), 
            // subtitle: new FormControl(''),
            // description: new FormControl(''),
          })
        );
        break;
      
        case ItemTypes.Video:
        (this.block.controls['items'] as FormArray).push(
          new FormGroup({
            timestamp: new FormControl(Date.now()),
            typeOfItem: new FormControl(i),
            video: new FormControl('', Validators.required)
          })
        );
        break;
      
        case ItemTypes.Image: case ItemTypes.ImageGroup:
        (this.block.controls['items'] as FormArray).push(
          new FormGroup({
            timestamp: new FormControl(Date.now()),
            typeOfItem: new FormControl(i),
            img: new FormArray([])
          })
        );
        break;
        
        case ItemTypes.Testimonial:
        (this.block.controls['items'] as FormArray).push(
          new FormGroup({
            typeOfItem: new FormControl(i),
            testimonial: new FormGroup({
              name: new FormControl('', Validators.required),
              // quote: this.descMultilanguageForm.getGroup(),
              // jobTitle: this.descMultilanguageForm.getGroup(),
            })
          })
        );
        break;
        
        case ItemTypes.TextImage:
        (this.block.controls['items'] as FormArray).push(
          new FormGroup({
            timestamp: new FormControl(Date.now()),
            typeOfItem: new FormControl(i),
            img: new FormArray([]),
            // title: new FormControl(''), 
            // subtitle: new FormControl(''),
            // description: new FormControl(''),
          })
        );
        break;
    
      default:
        console.error(`No Item type specified for enum === ${i}`)
        break;
    }
    
  }

  deleteItem(index: number){
    (this.block.controls['items'] as FormArray).removeAt(index);
  }

  drop(event: CdkDragDrop<FormGroup[]>){
    const auxBlock = (this.block.controls['items'] as FormArray).at(event.previousIndex);
    (this.block.controls['items'] as FormArray).removeAt(event.previousIndex);
    (this.block.controls['items'] as FormArray).insert(event.currentIndex, auxBlock);    
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
