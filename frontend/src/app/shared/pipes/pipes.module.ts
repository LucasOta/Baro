import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagePipe } from "./image.pipe";
import { DomSanitizerPipe } from "./dom-sanitizer.pipe";


@NgModule({
  declarations: [ ImagePipe, DomSanitizerPipe],
  exports: [ ImagePipe, DomSanitizerPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
