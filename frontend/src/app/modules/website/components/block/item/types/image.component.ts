import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Item } from 'src/app/shared/models/item';

@Component({
  selector: 'app-image',
  styles: [
    'img {width: 100%; padding: 20px 0;}'
  ],
  template: `
    <div class="dk-box">
        <div [ngClass]="{'container': !item.fullWidth}">
            <img class="dk-img" [src]="(item.img[0] | image : (moduleName$ | async) : (elementId$ | async))" alt="">
        </div>
    </div>
  `
})
export class ImageComponent implements OnInit {
  @Input() item: Item;
  moduleName$: Observable<String>;
  elementId$: Observable<String>;  
  
  constructor( private store: Store<AppState> ) {
    this.moduleName$ = store.select(store => store.moduleName);
    this.elementId$ = store.select(store => store.elementId);
  }

  ngOnInit(): void {
  }

}
