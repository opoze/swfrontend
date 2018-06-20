import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  perfils = ['Analista Ce Compras', 'Analista Financeiro', 'Diretor Financeiro'];

  model = new User();

  submitted = false;

  onSubmit() { this.submitted = true; }

  newUser(): void {
    console.log('TESTE');
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

}
