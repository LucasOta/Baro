import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-video',
  template: `
    <div class="row vertical-gap dk-gallery">
      <div class="col-12">
          <div class="dk-box-4">
              <div class="dk-gallery-video text-center">
                  <a [href]='item.video' class="dk-btn dk-btn-play mt-20 dk-gallery-video-item"></a>
              </div>
          </div>
      </div>
    </div>
  `
})
export class VideoComponent implements OnInit {
  @Input() item: Item;
  constructor() { }

  ngOnInit(): void {
  }

}
