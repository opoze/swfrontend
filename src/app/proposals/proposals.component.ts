import { Component, OnInit, ViewChild } from '@angular/core';
import { Proposal } from '../proposal';
import { Suplier } from '../suplier';
import { ProposalService } from '../proposal.service';
import { SuplierService } from '../suplier.service';

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
  proposaltime: number = 0;
  suplier: Suplier = null;

  constructor(
    private proposalService: ProposalService,
    private suplierService: SuplierService,
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

  getProposalTime(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.proposalService.getProposalTime()
      .subscribe(proposaltime => {
        this.proposaltime = proposaltime.proposaltime;
    });
  }

  getSuplier(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.suplierService.getSuplier(id)
      .subscribe(suplier => {
        this.suplier = suplier;
    });
  }

  getProposals(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.proposalService.getProposals(id)
      .subscribe(proposals => {
        this.proposals = proposals;
        this.getSuplier();
        this.getProposalTime();
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
