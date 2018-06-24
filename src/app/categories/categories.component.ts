import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {

  categories: Category[];
  loading: boolean;
  search: string;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categories = [];
    this.search = '';
    this.getCategories();

    // Find KeyUp
    this.categoryService.findCategoryByName().subscribe((data)=>{
      if(!this.categoryService.loadingCategoriesError){
        this.categories = data;
      }
    });
  }

  getCategories(): void {
    console.log('getting');
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  onChangeSearch(term) {
    if(term.length == 0){
      this.getCategories();
    }
  }

}
