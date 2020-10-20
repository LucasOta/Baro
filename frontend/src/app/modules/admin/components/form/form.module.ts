import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { PipesModule } from "../../../../shared/pipes/pipes.module";
import { TextInputComponent } from './text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MultilanguageTextInputComponent } from './multilanguage-text-input/multilanguage-text-input.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DropDownListComponent } from './drop-down-list/drop-down-list.component';



@NgModule({
  declarations: [ImagePickerComponent, TextInputComponent, MultilanguageTextInputComponent, CheckboxComponent, DropDownListComponent],
  exports: [ImagePickerComponent, TextInputComponent, MultilanguageTextInputComponent, CheckboxComponent, DropDownListComponent],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class FormModule { }
