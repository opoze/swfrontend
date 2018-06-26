import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Proposal } from '../proposal';
import { Suplier } from '../suplier';
import { Status } from '../status';
import { ProposalService }  from '../proposal.service';
import { SuplierService }  from '../suplier.service';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-proposal-detail',
  templateUrl: './proposal-detail.component.html',
  styleUrls: ['./proposal-detail.component.css']
})

export class ProposalDetailComponent implements OnInit {

  @ViewChild('inputFile')
  inputFile: any;

  proposal : Proposal;
  proposaltime : number = null;
  proposalStatusHistory : Status[] = [];
  suplier : Suplier = null;
  showFileUpload: boolean = false;

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
    this.proposalService.getProposalTime()
      .subscribe(proposaltime => {
        this.proposaltime = proposaltime.proposaltime;
    });
  }

  uploadFile(files: FileList) {
    const id = +this.route.snapshot.paramMap.get('id1');
    this.proposalService.uploadFile(id, files.item(0))
    .subscribe(() => {
      this.proposal.file = files.item(0).name;
      this.inputFile.nativeElement.value = "";
    });
  }

  downloadFile() {
    const id = +this.route.snapshot.paramMap.get('id1');
    this.proposalService.downloadFile(id)
    .subscribe((file) => {
      let fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  getProposalStatusHistory(): void {
    const id = +this.route.snapshot.paramMap.get('id1');
    this.proposalService.getProposalStatusHistory(id)
      .subscribe(proposalStatusHistory => {
        this.proposalStatusHistory = proposalStatusHistory;
    });
  }

  setProposalStatus(status: Status){
    this.proposal.status = status;
  }

  approveProposal(): void {
    const id = +this.route.snapshot.paramMap.get('id1');
    this.proposalService.approveProposal(id)
      .subscribe(proposalStatusHistory => {
        console.log(proposalStatusHistory);
        if(proposalStatusHistory.length > 0){
          this.setProposalStatus(proposalStatusHistory[0]);
        }
        this.proposalStatusHistory = proposalStatusHistory;
    });
  }

  reproveProposal(): void {
    const id = +this.route.snapshot.paramMap.get('id1');
    this.proposalService.reproveProposal(id)
      .subscribe(proposalStatusHistory => {
        if(proposalStatusHistory.length > 0){
          this.setProposalStatus(proposalStatusHistory[0]);
        }
        this.proposalStatusHistory = proposalStatusHistory;
    });
  }

  getProposal(): void {
    const id = +this.route.snapshot.paramMap.get('id1');
    this.proposalService.getProposal(id)
      .subscribe(proposal => {
        this.proposal = proposal;
        this.getProposalTime();
        this.getSuplier();
        this.getProposalStatusHistory();
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

  canNotApprove(){
    if(this.proposal){
      if(this.proposal.status){
        return this.proposal.status.status == 'A';
      }
    }
    return false;
  }

  canNotReprove(){
    if(this.proposal){
      if(this.proposal.status){
        return this.proposal.status.status == 'R';
      }
    }
    return false;
  }

}
