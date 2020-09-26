import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin',
  styleUrls: ['./admin.component.css'],
  template:
    `<app-navbar></app-navbar>
    <app-sidebar></app-sidebar>  
    <router-outlet></router-outlet>  
    <app-footer></app-footer>`,
  encapsulation: ViewEncapsulation.None
})

export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
