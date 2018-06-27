import { Component, OnInit, ViewChild } from '@angular/core';
import { Proposal } from '../proposal';
import { Suplier } from '../suplier';
import { ProposalService } from '../proposal.service';
import { SuplierService } from '../suplier.service';
import { AuthService } from '../auth.service';
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
  search1: string;
  search2: string;
  suplierName: string = '';
  proposaltime: number = 0;
  suplier: Suplier = null;

  constructor(
    private proposalService: ProposalService,
    private suplierService: SuplierService,
    private location: Location,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.proposals = [];
    this.search1 = '';
    this.search2 = '';
    this.getProposals();

    // Find KeyUp
    this.proposalService.findProposalByString().subscribe((data)=>{
      if(!this.proposalService.loadingProposalsError){
        this.proposals = data;
      }
    });

    this.proposalService.findProposalByDate().subscribe((data)=>{
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

  remove(id: number): void {
    this.proposalService.removeProposal(id).subscribe();
  }

  cancel(): void{
    this.goBack();
  }

  goBack() : void {
    this.location.back();
  }

  onChangeSearch1(term) {
    if(term.length == 0){
      this.getProposals();
    }
  }

  onChangeSearch2(term) {
    if(term.length == 0){
      this.getProposals();
    }
  }
}
