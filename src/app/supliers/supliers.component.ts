import { Component, OnInit } from '@angular/core';
import { Suplier } from '../suplier';
import { SuplierService } from '../suplier.service';

@Component({
  selector: 'app-supliers',
  templateUrl: './supliers.component.html',
  styleUrls: ['./supliers.component.css']
})
export class SupliersComponent implements OnInit {

  supliers: Suplier[];

  constructor(
    private suplierService: SuplierService
  ) { }

  ngOnInit() {
    this.getSupliers();
  }

  getSupliers(): void {
    this.suplierService.getSupliers()
      .subscribe(supliers => this.supliers = supliers);
  }

}
