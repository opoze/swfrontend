import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../user';
import { UserService }  from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MyDatePipe } from '../my-date-pipe.pipe';
import { CpfPipe } from '../cpf-pipe.pipe';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {

  perfils = [
    { id: '1', name: 'Analista De Compras'},
    { id: '2', name: 'Analista Financeiro'},
    { id: '3', name: 'Diretor Financeiro'}
  ];

  model : User;
  selectedPerfil = null;

  constructor(
    private location: Location,
    private userService: UserService,
    private route: ActivatedRoute,
    public myDatePipe: MyDatePipe,
    public cpfPipe: CpfPipe
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id)

      .subscribe(user => {
        // Format some API data
        user.birth_date = this.myDatePipe.transform(user.birth_date);
        user.cpf = this.cpfPipe.transform(user.cpf);

        // Set local model
        this.model = user;

        // Set select perfil
        let selectedPerfilId =  this.perfils.findIndex((perfil) => {
          return perfil.id == user.perfil;
        });
        if(selectedPerfilId > -1){
          this.selectedPerfil = this.perfils[selectedPerfilId];
        }
        else {
          this.selectedPerfil = null;
        }

      });

  }

  updateUser(form: NgForm){
    this.model.perfil = this.selectedPerfil.id;
    this.userService.updateUser(this.model)
      .subscribe(() => {
        if(!this.userService.httpError){
          // form.resetForm();
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
