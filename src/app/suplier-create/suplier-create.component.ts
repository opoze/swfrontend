import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Suplier } from '../suplier';
import { SuplierService } from '../suplier.service';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-suplier-create',
  templateUrl: './suplier-create.component.html',
  styleUrls: ['./suplier-create.component.css']
})
export class SuplierCreateComponent implements OnInit {

  model: Suplier = new Suplier();

  constructor(
    private suplierService: SuplierService,
    private location: Location,
    private message: MessageService
  ) {}

  ngOnInit() {
  }

  storeSuplier(form: NgForm){
    this.suplierService.storeSuplier(this.model)
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
