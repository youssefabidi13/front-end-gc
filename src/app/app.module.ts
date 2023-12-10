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
import { FileDetailComponent } from './components/file-detail/file-detail.component';
import { ResignationComponent } from './components/resignation/resignation.component';
import { ResignationListComponent } from './components/resignation-list/resignation-list.component';
import { ListDepartmentsComponent } from './components/list-departments/list-departments.component';
import { DepartmentUpdateComponent } from './components/department-update/department-update.component';
import { DepartmentCreateComponent } from './components/department-create/department-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  { path: '', redirectTo: '/home-test', pathMatch: 'full' },
  { path: 'home-test', component: HomeTestComponent},
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
  {
    path: 'file-detail/:fileId',
    component: FileDetailComponent,
    canActivate: [AuthenticationGuard, AuthorisationUserGuard],
  },

  {
    path: 'resignation',
    component: ResignationComponent,
    canActivate: [AuthenticationGuard, AuthorisationUserGuard],
  },
  {
    path: 'resignation-list',
    component: ResignationListComponent,
    canActivate: [AuthenticationGuard, AuthorisationGuard],
  },
  {
    path: 'list-departments',
    component: ListDepartmentsComponent,
    canActivate: [AuthenticationGuard, AuthorisationGuard],
  },
  {
    path: 'modifier-departement/:id',
    component: DepartmentUpdateComponent,
    canActivate: [AuthenticationGuard, AuthorisationGuard],
  },
  {
    path: 'ajouter-departement',
    component: DepartmentCreateComponent,
    canActivate: [AuthenticationGuard, AuthorisationGuard],
  },
  {
    path: 'list-users',
    component: UserListComponent,
    canActivate: [AuthenticationGuard, AuthorisationGuard],
  },
  {
    path: 'modifier-user/:id',
    component: UserUpdateComponent,
    canActivate: [AuthenticationGuard, AuthorisationGuard],
  },
  {
    path: 'ajouter-user',
    component: UserCreateComponent,
    canActivate: [AuthenticationGuard, AuthorisationGuard],
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
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
    FileDetailComponent,
    ResignationComponent,
    ResignationListComponent,
    ListDepartmentsComponent,
    DepartmentUpdateComponent,
    DepartmentCreateComponent,
    UserListComponent,
    UserUpdateComponent,
    UserCreateComponent,
    ContactUsComponent,
    
    
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
