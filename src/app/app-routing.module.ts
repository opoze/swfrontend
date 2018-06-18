import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { SupliersComponent } from './supliers/supliers.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent },
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
