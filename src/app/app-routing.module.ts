import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserCreateComponent } from './user-create/user-create.component';

import { CategoriesComponent } from './categories/categories.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryCreateComponent } from './category-create/category-create.component';

import { ProposalsComponent } from './proposals/proposals.component';
import { SupliersComponent } from './supliers/supliers.component';


const routes: Routes = [

  // Usaers routes
  { path: 'users', component: UsersComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'user/:id/edit', component: UserEditComponent },
  { path: 'usercreate', component: UserCreateComponent },

  // Categories routes
  { path: 'categories', component: CategoriesComponent },
  { path: 'category/:id', component: CategoryDetailComponent },
  { path: 'category/:id/edit', component: CategoryEditComponent },
  { path: 'categorycreate', component: CategoryCreateComponent },

  { path: 'supliers', component: SupliersComponent },
  { path: 'proposals', component: ProposalsComponent },
  { path: 'categories', component: CategoriesComponent },

  // Start route
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
