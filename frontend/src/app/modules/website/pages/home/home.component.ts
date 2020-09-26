import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/core/http/category/category.service';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }
  ngOnInit(): void {
    this.categoryService.get().subscribe((res)=>{
      this.categories = res.categories;
    });
  }

}
