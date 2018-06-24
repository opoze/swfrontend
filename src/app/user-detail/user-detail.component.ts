import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService }  from '../user.service';
import { MyDatePipe } from '../my-date-pipe.pipe';
import { CpfPipe } from '../cpf-pipe.pipe';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})

export class UserDetailComponent implements OnInit {

  user : User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
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
        user.birth_date = this.myDatePipe.transform(user.birth_date);
        user.cpf = this.cpfPipe.transform(user.cpf);
        this.user = user;
      });
  }

  goBack() : void {
    this.location.back();
  }

}
