import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/models/item';
import { ItemTypes } from 'src/app/shared/enums/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;  
  itemTypes = ItemTypes;

  constructor() { }

  ngOnInit(): void {
  }

}
