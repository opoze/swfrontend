import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: User[];
  loading: boolean;
  selectedUser: User;
  selectedUserId: number;
  search: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.selectedUser = null;
    this.selectedUserId = 0;
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

  setUser(user:User): void {
    this.selectedUser = { ...user };
    this.selectedUserId = user.id;
  }

  unsetUser(): void {
    this.selectedUser = null;
    this.selectedUserId = 0;
  }

  removeUSer(): void {
  }

  saveUser(): void {
    this.userService.updateUser(this.selectedUser)
      .subscribe(() => {
        if(!this.userService.httpError){
          this.users = this.users.map(
            item => {
              return item.id == this.selectedUserId ? this.selectedUser : item;
            }
          );
        }
        this.unsetUser();
    });
  }

}
