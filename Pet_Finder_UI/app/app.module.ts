import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from '../home/home.component';
import { appRoutes } from './app.routes';  // adjust path as needed
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddPetComponent } from '../add-pet/add-pet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyPetsComponent } from '../my-pets/my-pets.component';
import { LoginComponent } from '../login/login.component';
import { AuthInterceptor } from '../auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddPetComponent,
    MyPetsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }