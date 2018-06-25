import { Component, OnInit, ViewChild } from '@angular/core';
import { Proposal } from '../proposal';
import { ProposalService } from '../proposal.service';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css']
})


export class ProposalsComponent implements OnInit {

  proposals: Proposal[];
  loading: boolean;
  search: string;
  suplierName: string = '';

  constructor(
    private proposalService: ProposalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.proposals = [];
    this.search = '';
    this.getProposals();

    // Find KeyUp
    this.proposalService.findProposalByName().subscribe((data)=>{
      if(!this.proposalService.loadingProposalsError){
        this.proposals = data;
      }
    });
  }

  getProposals(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.proposalService.getProposals(id)
      .subscribe(proposals => {
        this.proposals = proposals;
        if(this.proposals.length > 0){
          this.suplierName = this.proposals[0].suplier.name;
        }
      });
  }

  // onChangeSearch(term) {
  //   const id = +this.route.snapshot.paramMap.get('id');
  //   if(term.length == 0){
  //     this.getProposals(id);
  //   }
  // }

  cancel(): void{
    this.goBack();
  }

  goBack() : void {
    this.location.back();
  }

}
