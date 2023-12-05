import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import {  HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppInterceptor } from './interceptors/app.interceptor';
import { HomeTestComponent } from './components/home-test/home-test.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { HomeAdminTestComponent } from './components/home-admin-test/home-admin-test.component';
import { AuthorisationGuard } from './guards/authorisation.guard';
import { AuthorisationUserGuard } from './guards/authorisation-user.guard';
import { FooterComponent } from './components/footer/footer.component';




const routes: Routes = [
  { path:"", redirectTo:"/login", pathMatch:"full"},
  { path:"login", component:LoginComponent},
  { path:"register",component:RegisterComponent},
  { path:"home",component:HomeTestComponent,canActivate:[AuthenticationGuard,AuthorisationUserGuard]},
  {path:"dashboard" ,component:HomeAdminTestComponent,canActivate:[AuthenticationGuard,AuthorisationGuard]},
];


export const routing = RouterModule.forRoot(routes);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeTestComponent,
    RegisterComponent,
    HomeAdminTestComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule ,
    

  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : AppInterceptor, multi : true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
