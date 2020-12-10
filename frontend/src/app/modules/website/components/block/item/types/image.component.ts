import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-image',
  template: `
    <div class="row vertical-gap dk-gallery">
      <div class="col-12 col-md-6">
          <div class="row vertical-gap dk-gallery">
              <div class="col-12 col-md-6">
                  <a [href]="(item.img[0] | image : 'projects' : '5fd0f75dc3755e8dc810b25a')" class="dk-gallery-item"><img [src]="(item.img[0] | image : 'projects' : '5fd0f75dc3755e8dc810b25a')" alt=""></a>
              </div>
          </div>
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
