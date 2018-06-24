import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { MessageService } from '../message.service';
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
  selectedPerfil = this.perfils[0];

  constructor(
    private userService: UserService,
    private location: Location,
    private message: MessageService
  ) {}

  ngOnInit() {
  }

  storeUser(form: NgForm){
    this.model.perfil = this.selectedPerfil.id;
    this.userService.storeUser(this.model)
      .subscribe(() => {
        if(!this.userService.httpError){
          form.resetForm();
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
