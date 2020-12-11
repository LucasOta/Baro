import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-text',
  styles: [
    'h1, h2, h3, h4, h5 {font-family: "Baro", sans-serif; font-weight: 600;}'
  ],
  template: `  
    <div class="container">
      <h2>{{item.title[0].quote}}</h2>
      <h4>{{item.subtitle[0].quote}}</h4>
      <div class="row justify-content-between vertical-gap">
          <div class="col-12">
              <p>{{item.description[0].quote}}</p>
          </div>
      </div>
    </div>
  `
})
export class TextComponent implements OnInit {
  @Input() item: Item;
  constructor() { }

  ngOnInit(): void {
  }

}
