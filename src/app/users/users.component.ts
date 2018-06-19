import { Component, OnInit } from '@angular/core';
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
  selectedUser: User;
  selectedUserId: number;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loading = false;
    this.selectedUser = null;
    this.selectedUserId = 0;
    this.getUsers();
  }

  getUsers(): void {
    this.loading = true;
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
        this.loading = false;
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
        this.users = this.users.map(
          item => {
            return item.id == this.selectedUserId ? this.selectedUser : item;
          }
        );
        this.unsetUser();
    });


  }

}
