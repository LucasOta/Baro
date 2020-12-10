import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-testimonial',
  template: `
    <span>TestimonialComponent works!</span>
  `
})
export class TestimonialComponent implements OnInit {
  @Input() item: Item;
  constructor() { }

  ngOnInit(): void {
  }

}
