import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavComponent} from './components/nav/nav.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MapComponent} from './components/map/map.component';
import {HttpClientModule} from '@angular/common/http';
import {BadrequestComponent} from './components/badrequest/badrequest.component';
import {FormComponent} from './components/form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AstrosComponent} from './components/astros/astros.component';

const appRoutes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'form', component: FormComponent},
  {path: 'astros', component: AstrosComponent},
  {path: '', redirectTo: '/map', pathMatch: 'full'},
  {path: '**', component: BadrequestComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MapComponent,
    BadrequestComponent,
    FormComponent,
    AstrosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
    ),
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
