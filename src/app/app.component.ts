import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'SafeWeb Test';

  constructor(
    private location: Location,
    private authService: AuthService
  ) {}

  isUsersRouteActive(){
    var viewLocation = location.pathname;
    return (
            viewLocation == '/users' ||
            viewLocation.toString().match(/^(\/user)\/[\W\w]+/i) ||
            viewLocation.toString().match(/^(\/user\/)[\W\w]+\/edit/i) ||
            viewLocation == '/usercreate'
          ) ? 'active nav-link' : 'nav-link';
  }

  isSupliersRouteActive(){
    var viewLocation = location.pathname;
    return (
            viewLocation == '/supliers' ||
            viewLocation.toString().match(/^(\/suplier)\/[\W\w]+/i) ||
            viewLocation.toString().match(/^(\/suplier\/)[\W\w]+\/edit/i) ||
            viewLocation == '/supliercreate' ||
            viewLocation == '/proposaltime'
          ) ? 'active nav-link' : 'nav-link';
  }

  // isProposalsRouteActive(){
  //   var viewLocation = location.pathname;
  //   return (
  //           viewLocation == '/proposals' ||
  //           viewLocation.toString().match(/^(\/proposal)\/[\W\w]+/i) ||
  //           viewLocation.toString().match(/^(\/proposal\/)[\W\w]+\/edit/i) ||
  //           viewLocation == '/proposalcreate'
  //         ) ? 'active nav-link' : 'nav-link';
  // }

  isCategoriesRouteActive(){
    var viewLocation = location.pathname;
    return (
            viewLocation == '/categories' ||
            viewLocation.toString().match(/^(\/categorie)\/[\W\w]+/i) ||
            viewLocation.toString().match(/^(\/categorie\/)[\W\w]+\/edit/i) ||
            viewLocation == '/categoriecreate'
          ) ? 'active nav-link' : 'nav-link';
  }

}
