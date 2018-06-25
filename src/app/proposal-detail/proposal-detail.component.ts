import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Proposal } from '../proposal';
import { Suplier } from '../suplier';
import { ProposalService }  from '../proposal.service';
import { SuplierService }  from '../suplier.service';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.css']
})

export class ProposalDetailComponent implements OnInit {

  proposal : Proposal;
  proposaltime : number = null;
  suplier : Suplier = null;

  constructor(
    private route: ActivatedRoute,
    private proposalService: ProposalService,
    private suplierService: SuplierService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getProposal();
  }

  getProposalTime(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.proposalService.getProposalTime()
      .subscribe(proposaltime => {
        this.proposaltime = proposaltime.proposaltime;
    });
  }

  getProposal(): void {
    const id = +this.route.snapshot.paramMap.get('id1');
    this.proposalService.getProposal(id)
      .subscribe(proposal => {
        this.proposal = proposal;
        this.getProposalTime();
        this.getSuplier();
      });
  }

  getSuplier(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.suplierService.getSuplier(id)
      .subscribe(suplier => {
        this.suplier = suplier;
    });
  }

  goBack() : void {
    this.location.back();
  }

}
