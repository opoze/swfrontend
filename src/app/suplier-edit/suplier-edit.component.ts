import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Suplier } from '../suplier';
import { SuplierService }  from '../suplier.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CpfPipe } from '../cpf-pipe.pipe';
import { CnpjPipe } from '../cnpj-pipe.pipe';

@Component({
  selector: 'app-suplier-edit',
  templateUrl: './suplier-edit.component.html',
  styleUrls: ['./suplier-edit.component.css']
})

export class SuplierEditComponent implements OnInit {

  model : Suplier = null;

  constructor(
    private location: Location,
    private suplierService: SuplierService,
    private route: ActivatedRoute,
    public cpfPipe: CpfPipe,
    public cnpjPipe: CnpjPipe
  ) { }

  ngOnInit() {
    this.getSuplier();
  }

  getSuplier(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.suplierService.getSuplier(id)

      .subscribe(suplier => {
        // Format some API data
        if(suplier.cpf){
          suplier.cpf = this.cpfPipe.transform(suplier.cpf);
        }
        if(suplier.cnpj){
          suplier.cnpj = this.cnpjPipe.transform(suplier.cnpj);
        }
        // Set local model
        this.model = suplier;
      });

  }

  updateSuplier(form: NgForm){
    this.suplierService.updateSuplier(this.model)
      .subscribe(() => {
        if(!this.suplierService.httpError){
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
