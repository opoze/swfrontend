import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() model: User;
  @Input() id: number;

  perfils = [
    { id: '1', name: 'Analista De Compras'},
    { id: '2', name: 'Analista Financeiro'},
    { id: '3', name: 'Diretor Financeiro'}
  ]

  submitted = false;
  showForm: boolean;
  selectedPerfil = this.perfils[0];
  updateMode = false;

  constructor(
    private userService: UserService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    if(typeof this.model == 'undefined'){
      this.model = new User();
      this.updateMode = true;
      this.showForm = true;
      this.id = 0;

      console.log(this.updateMode);
    }
  }
  
  hide(form: NgForm) {
    this.showForm = false;
    form.resetForm();
  }

  show() {
    this.showForm = true;
  }

  storeUser(form: NgForm){
    this.model.perfil = this.selectedPerfil.id;
    this.loadingService.toggle();
    this.userService.storeUser(this.model)
      .subscribe(() => {
        if(!this.userService.httpError){
          this.showForm = false;
          form.resetForm();
        }
        this.loadingService.toggle();
    });
  }

  updateUser(form: NgForm){
    this.model.perfil = this.selectedPerfil.id;
    this.loadingService.toggle();
    this.userService.updateUser(this.model)
      .subscribe(() => {
        if(!this.userService.httpError){
          this.showForm = false;
          form.resetForm();
        }
        this.loadingService.toggle();
    });
  }

}
