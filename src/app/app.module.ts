import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemDetailsComponent } from './items/item-details/item-details.component';
import { ItemListComponent } from './items/item-list/item-list.component';

import { HttpClientModule }    from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // CLI imports router

import { AdminComponent } from './admin/admin.component';
import { StartComponent } from './start/start.component';
import { CreateComponent } from './create/create.component';
import { LoadComponent } from './load/load.component';
import { BoardComponent } from './board/board.component';



const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'create', component: CreateComponent },
  { path: 'load/:gameId', component: LoadComponent },
  { path: 'board/:gameId', component: BoardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ItemDetailsComponent,
    ItemListComponent,
    DashboardComponent,
    AdminComponent,
    StartComponent,
    CreateComponent,
    LoadComponent,
    BoardComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
