import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-testimonial',
  template: `
    <div class="container">
      <div class="row justify-content-center">
          <div class="col-lg-9">
              <div class="dk-reviews  text-center">
                  <div class="dk-reviews-text">
                      <p class="mb-0">{{item.testimonial.quote[0].quote}}</p>
                  </div>
                  <div class="dk-reviews-name">- {{item.testimonial.name}}, {{item.testimonial.jobTitle[0].quote}}</div>
              </div>
          </div>
      </div>
    </div>
  `
})
export class TestimonialComponent implements OnInit {
  @Input() item: Item;
  constructor() { }

  ngOnInit(): void {
  }

}
