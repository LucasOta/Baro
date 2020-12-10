import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-image-group',
  template: `
    <span>ImageGroupComponent works!</span>
  `
})
export class ImageGroupComponent implements OnInit {
  @Input() item: Item;
  constructor() { }

  ngOnInit(): void {
  }

}
