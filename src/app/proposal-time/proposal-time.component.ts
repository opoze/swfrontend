import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Config } from '../config';
import { ProposalService }  from '../proposal.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-proposal-time',
  templateUrl: './proposal-time.component.html',
  styleUrls: ['./proposal-time.component.css']
})

export class ProposalTimeComponent implements OnInit {

  model : Config = null;

  constructor(
    private location: Location,
    private proposalService: ProposalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getProposalTime();
  }

  getProposalTime(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.proposalService.getProposalTime()
      .subscribe(proposaltime => {
        this.model = proposaltime;
      });
  }

  updateProposalTime(form: NgForm){
    this.proposalService.updateProposalTime(this.model)
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
