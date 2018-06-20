import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  perfils = [
    { id: '1', name: 'Analista Ce Compras'},
    { id: '2', name: 'Analista Financeiro'},
    { id: '3', name: 'Diretor Financeiro'}
  ]
  model = new User();
  submitted = false;
  showForm: boolean;
  // userService: UserService;

  constructor(
    private userService: UserService
  ) {}

  onSubmit() {
    this.submitted = true;
    this.showForm = false;
    this.storeUser();
  }

  show() {
    this.submitted = false;
    this.showForm = true;
  }

  hide() {
    this.submitted = true;
    this.showForm = false;
  }

  storeUser(): void {
    this.userService.storeUser(this.model)
      .subscribe(() => {
        if(!this.userService.httpError){
        }
        this.model = new User();
    });
  }


  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {

  }

}
