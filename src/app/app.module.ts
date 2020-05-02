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

import { MatSliderModule } from '@angular/material/slider';

const routes: Routes = [
  { path: '', component: DashboardComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ItemDetailsComponent,
    ItemListComponent,
    DashboardComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
