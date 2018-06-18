import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

import { Suplier } from '../suplier';
import { SuplierService }  from '../suplier.service';

@Component({
  selector: 'app-suplier-detail',
  templateUrl: './suplier-detail.component.html',
  styleUrls: ['./suplier-detail.component.css']
})

export class SuplierDetailComponent implements OnInit {

  @Input() suplier : Suplier;

  constructor(
    private route: ActivatedRoute,
    private suplierService: SuplierService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getSuplier();
  }

  getSuplier(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.suplierService.getSuplier(id)
      .subscribe(suplier => this.suplier = suplier);
  }

  goBack() : void {
    this.location.back();
  }

  save(): void {
    this.suplierService.updateUser(this.suplier)
      .subscribe(() => this.goBack());
  }
}
