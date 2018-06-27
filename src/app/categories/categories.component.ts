import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { AuthService } from '../auth.service';

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
    private categoryService: CategoryService,
    private authService: AuthService
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

  remove(id: number): void {
    this.categoryService.removeCategory(id).subscribe();
  }

}
