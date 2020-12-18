import { Component, Inject, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-website',
  template:
    `<app-navbar></app-navbar>

    <div class="dk-main">
      <router-outlet></router-outlet>
    </div>

    <app-footer></app-footer>`,
    
    styleUrls: ['./website.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class WebsiteComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

}
