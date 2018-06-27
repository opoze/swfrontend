import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  doLogin(form: NgForm){
    this.authService.login(this.login, this.password).subscribe(() => {
      if(!this.authService.httpError){
        window.location.href='/users';
      }
      // this.location.path('/users');
    });
  }

}
