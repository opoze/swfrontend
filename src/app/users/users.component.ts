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
  search: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      // let chng = changes[propName];
      // let cur  = JSON.stringify(chng.currentValue);
      // let prev = JSON.stringify(chng.previousValue);
      // this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      console.log(propName);
    }
  }


  ngOnInit() {
    this.loading = false;
    this.selectedUser = null;
    this.selectedUserId = 0;
    this.search = '';
    this.getUsers();


    this.userService.findUserByName().subscribe(() =>{
      console.log('UHHHUHUUUUUUU');
    });
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

  find(search: string) {
    this.userService.findUserByName(this.search)
      .subscribe(() =>{
        console.log('UHHHUHUUUUUUU');
      });
  }


}
