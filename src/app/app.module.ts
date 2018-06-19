import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { UsersComponent } from './users/users.component';
import { SupliersComponent } from './supliers/supliers.component';
import { ProposalsComponent } from './proposals/proposals.component';
import { CategoriesComponent } from './categories/categories.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { ProposalDetailComponent } from './proposal-detail/proposal-detail.component';
import { SuplierDetailComponent } from './suplier-detail/suplier-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { CpfPipePipe } from './cpf-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SupliersComponent,
    ProposalsComponent,
    CategoriesComponent,
    UserDetailComponent,
    CategoryDetailComponent,
    ProposalDetailComponent,
    SuplierDetailComponent,
    MessagesComponent,
    CpfPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
