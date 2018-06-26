import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proposal } from '../proposal';
import { Suplier } from '../suplier';
import { Category } from '../category';
import { ProposalService } from '../proposal.service';
import { CategoryService } from '../category.service';
import { SuplierService } from '../suplier.service';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proposal-create',
  templateUrl: './proposal-create.component.html',
  styleUrls: ['./proposal-create.component.css']
})
export class ProposalCreateComponent implements OnInit {

  suplier : Suplier = null;
  categories: Category[];
  model: Proposal = new Proposal();

  constructor(
    private proposalService: ProposalService,
    private categoryService: CategoryService,
    private suplierService: SuplierService,
    private location: Location,
    private message: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getSuplier();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
        if(categories.length > 0){
          this.model.category = categories[0];
        }
      });
  }

  getSuplier(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.suplierService.getSuplier(id)
      .subscribe((suplier: Suplier) => {
        this.suplier = suplier;
        if(suplier){
          this.model.suplier = suplier;
        }
    });
  }

  storeProposal(form: NgForm){
    this.proposalService.storeProposal(this.model)
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
