import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

    model: Category = new Category();

    constructor(
      private categoryService: CategoryService,
      private location: Location,
      private message: MessageService
    ) {}

    ngOnInit() {
    }

    storeCategory(form: NgForm){
      this.categoryService.storeCategory(this.model)
        .subscribe(() => {
          if(!this.categoryService.httpError){
            form.resetForm();
            this.location.back();
          }
      });
    }

    cancel(): void{
      this.goBack();
    }

    goBack() : void {
      this.location.back();
    }

}
