import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-text-image',
  template: `
    <span>TextImageComponent works!</span>
  `
})
export class TextImageComponent implements OnInit {
  @Input() item: Item;
  constructor() { }

  ngOnInit(): void {
  }

}
