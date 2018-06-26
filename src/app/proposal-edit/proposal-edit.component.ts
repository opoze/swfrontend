import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Proposal } from '../proposal';
import { Suplier } from '../suplier';
import { Category } from '../category';
import { ProposalService }  from '../proposal.service';
// import { SuplierService }  from '../suplier.service';
import { CategoryService }  from '../category.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-proposal-edit',
  templateUrl: './proposal-edit.component.html',
  styleUrls: ['./proposal-edit.component.css']
})

export class ProposalEditComponent implements OnInit {

  suplier : Suplier = null;
  categories: Category[];
  model: Proposal = new Proposal();

  constructor(
    private proposalService: ProposalService,
    private categoryService: CategoryService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
        if(categories.length > 0){
          this.model.category = categories[0];
          this.getProposal();
        }
      });
  }

  getProposal(): void {
    const id = +this.route.snapshot.paramMap.get('id1');
    this.proposalService.getProposal(id)
      .subscribe(proposal => {
        let categoryId = proposal.category.id;

        proposal.category = this.categories.find((category)=>{
          return category.id == categoryId;
        })

        this.model = proposal;
        this.suplier = proposal.suplier;
      });
  }

  updateProposal(form: NgForm){
    this.proposalService.updateProposal(this.model)
      .subscribe(() => {
        if(!this.proposalService.httpError){
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
