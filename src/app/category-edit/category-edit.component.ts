import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Category } from '../category';
import { CategoryService }  from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})

export class CategoryEditComponent implements OnInit {

  perfils = [
    { id: '1', name: 'Analista De Compras'},
    { id: '2', name: 'Analista Financeiro'},
    { id: '3', name: 'Diretor Financeiro'}
  ];

  model : Category;

  constructor(
    private location: Location,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getCategory();
  }

  getCategory(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategory(id)
      .subscribe(category => {
        // Set local model
        this.model = category;
      });
  }

  updateCategory(form: NgForm){
    this.categoryService.updateCategory(this.model)
      .subscribe(() => {
        if(!this.categoryService.httpError){
          // form.resetForm();
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
