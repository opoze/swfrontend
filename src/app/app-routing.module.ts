import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { SupliersComponent } from './supliers/supliers.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [

  { path: 'users', component: UsersComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'user/:id/edit', component: UserEditComponent },
  { path: 'usercreate', component: UserCreateComponent },

  { path: 'supliers', component: SupliersComponent },
  { path: 'proposals', component: ProposalsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})

export class AppRoutingModule { }
