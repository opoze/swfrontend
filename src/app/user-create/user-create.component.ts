import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { LoadingService } from '../loading.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  perfils = [
    { id: '1', name: 'Analista De Compras'},
    { id: '2', name: 'Analista Financeiro'},
    { id: '3', name: 'Diretor Financeiro'}
  ]

  model: User = new User();
  submitted = false;
  showForm: boolean;
  selectedPerfil = this.perfils[0];
  updateMode = false;

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
    private location: Location
  ) {}

  ngOnInit() {
  }

  // storeUser(form: NgForm){
  //   this.model.perfil = this.selectedPerfil.id;
  //   this.loadingService.toggle();
  //   this.userService.storeUser(this.model)
  //     .subscribe(() => {
  //       if(!this.userService.httpError){
  //         form.resetForm();
  //       }
  //       this.loadingService.toggle();
  //   });
  // }

  goBack() : void {
    this.location.back();
  }

}
