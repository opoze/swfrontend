import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit {

  users: User[];
  loading: boolean;
  search: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.users = [];
    this.search = '';
    this.getUsers();

    // Find KeyUp
    this.userService.findUserByName().subscribe((data)=>{
      if(!this.userService.loadingUsersError){
        this.users = data;
      }
    });
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  onChangeSearch(term) {
    if(term.length == 0){
      this.getUsers();
    }
  }

}
