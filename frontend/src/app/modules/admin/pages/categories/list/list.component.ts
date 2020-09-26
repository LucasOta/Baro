import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../../../../../core/http/category/category.service";
import { Category } from "../../../../../shared/models/category";
import { Router } from "@angular/router";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.categoryService.get(true).subscribe((res)=>{
      this.categories = res.categories;
    });
    
  }

  trackByFn(index, item) {    
    return item.id; // unique id corresponding to the item
 }

 edit(id: string){
   this.router.navigate(['admin/categories/edit', id]);   
 }

}
