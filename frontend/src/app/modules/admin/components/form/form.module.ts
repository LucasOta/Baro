import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { PipesModule } from "../../../../shared/pipes/pipes.module";
import { TextInputComponent } from './text-input/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MultilanguageTextInputComponent } from './multilanguage-text-input/multilanguage-text-input.component';



@NgModule({
  declarations: [ImagePickerComponent, TextInputComponent, MultilanguageTextInputComponent],
  exports: [ImagePickerComponent, TextInputComponent, MultilanguageTextInputComponent],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule
  ]
})
export class FormModule { }
