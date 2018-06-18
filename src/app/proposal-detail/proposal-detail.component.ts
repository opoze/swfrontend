import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

import { Proposal } from '../proposal';
import { ProposalService }  from '../proposal.service';

@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.css']
})

export class ProposalDetailComponent implements OnInit {

  @Input() proposal : Proposal;

  constructor(
    private route: ActivatedRoute,
    private proposalService: ProposalService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getProposal();
  }

  getProposal(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.proposalService.getProposal(id)
      .subscribe(proposal => this.proposal = proposal);
  }

  goBack() : void {
    this.location.back();
  }

  save(): void {
    this.proposalService.updateProposal(this.proposal)
      .subscribe(() => this.goBack());
  }
}
