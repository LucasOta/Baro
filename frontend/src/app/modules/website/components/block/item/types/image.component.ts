import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-image',
  styles: [
    'img {width: 100%; padding: 20px 0;}'
  ],
  template: `
    <div class="dk-box">
        <div [ngClass]="{'container': !item.fullWidth}">
            <img class="dk-img" [src]="(item.img[0] | image : 'projects' : '5fd0f75dc3755e8dc810b25a')" alt="">
        </div>
    </div>
  `
})
export class ImageComponent implements OnInit {
  @Input() item: Item;
  constructor() { }

  ngOnInit(): void {
  }

}
