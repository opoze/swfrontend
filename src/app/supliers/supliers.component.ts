import { Component, OnInit } from '@angular/core';
import { Suplier } from '../suplier';
import { SuplierService } from '../suplier.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-supliers',
  templateUrl: './supliers.component.html',
  styleUrls: ['./supliers.component.css']
})
export class SupliersComponent implements OnInit {

  supliers: Suplier[];
  loading: boolean;
  search: string;

  constructor(
    private suplierService: SuplierService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.supliers = [];
    this.search = '';
    this.getSupliers();

    // Find KeyUp
    this.suplierService.findSuplierByName().subscribe((data)=>{
      if(!this.suplierService.loadingSupliersError){
        this.supliers = data;
      }
    });
  }

  getSupliers(): void {
    this.suplierService.getSupliers()
      .subscribe(supliers => {
        this.supliers = supliers;
      });
  }

  onChangeSearch(term) {
    if(term.length == 0){
      this.getSupliers();
    }
  }

  remove(id: number): void {
    this.suplierService.removeSuplier(id).subscribe();
  }

}
