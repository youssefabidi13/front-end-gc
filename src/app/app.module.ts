import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppInterceptor } from './interceptors/app.interceptor';
import { HomeTestComponent } from './components/home-test/home-test.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { HomeAdminTestComponent } from './components/home-admin-test/home-admin-test.component';
import { AuthorisationGuard } from './guards/authorisation.guard';
import { AuthorisationUserGuard } from './guards/authorisation-user.guard';
import { FooterComponent } from './components/footer/footer.component';
import { AllFilesComponent } from './components/all-files/all-files.component';
import { FilesByDepartementComponent } from './components/files-by-departement/files-by-departement.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { CsvComponent } from './components/csv/csv.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeTestComponent,
    canActivate: [AuthenticationGuard, AuthorisationUserGuard],
  },
  {
    path: 'dashboard',
    component: HomeAdminTestComponent,
    canActivate: [AuthenticationGuard, AuthorisationGuard],
  },
  {
    path: 'file',
    component: UploadFileComponent,
    canActivate: [AuthenticationGuard, AuthorisationUserGuard],
  },
  {
    path: 'formation/:department',
    component: FilesByDepartementComponent,
    canActivate: [AuthenticationGuard, AuthorisationUserGuard],
  },
  {
    path: 'all-files',
    component: AllFilesComponent,
    canActivate: [AuthenticationGuard, AuthorisationUserGuard],
  },
  {
    path: 'add-feedback/:fileId',
    component: FeedbackComponent,
    canActivate: [AuthenticationGuard, AuthorisationUserGuard],
  },
  {
    path: 'upload-csv',
    component: CsvComponent,
    canActivate: [AuthenticationGuard, AuthorisationGuard],
  },

 
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
    FooterComponent,
    AllFilesComponent,
    FilesByDepartementComponent,
    UploadFileComponent,
    FeedbackComponent,
    CsvComponent,
    SpinnerComponent,
    
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
{ provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
