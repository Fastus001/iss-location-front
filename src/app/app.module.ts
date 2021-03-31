import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './components/nav/nav.component';
import {MatButtonModule} from '@angular/material/button';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { BadrequestComponent } from './components/badrequest/badrequest.component';

const appRoutes: Routes = [
  {path: 'map', component: MapComponent},
  {path: '', redirectTo: '/map', pathMatch: 'full'},
  {path: '**', component: BadrequestComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MapComponent,
    BadrequestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
