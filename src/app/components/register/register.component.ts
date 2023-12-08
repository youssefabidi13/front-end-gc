import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from 'src/app/entities/department';
import { AuthService, DepartmentDto } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  departments: DepartmentDto[] = []; // Assuming you have a service to fetch departments
  constructor(private formBuilder: FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchDepartments();
  }

  initializeForm(): void {
    this.formRegister = this.formBuilder.group({
      nomComplet: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['USER'] ,
      departementId: null,
    });
  }

  handleRegistration(): void {
    // console.log('Form value:', this.formRegister.value);
    
    // if (this.formRegister.valid) {
    //   const registrationData = this.formRegister.value;
    //   this.authService.register(registrationData).subscribe(
    //     {
    //         next:(data: any) => {
    //           console.log("success "+data);
    //           this.router.navigateByUrl("/login"); 
    //         },
    //         error:(err: any) => {console.log(err)},
    //         })
    //   }
    const registrationData = this.formRegister.value;
    this.authService.register(registrationData).subscribe(
      {
        // next: (data: any) => {
         
        // },
        error: (err: any) => {
          if (err.status === 409) { 
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Email is already taken',
              showConfirmButton: false,
              timer: 1500
            });
            this.formRegister.get('email')?.setErrors({ 'uniqueEmail': true });
          } else if(err.status === 200){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registration successful',
              showConfirmButton: false,
              timer: 1500
            });
            console.log("success " + err);
            this.router.navigateByUrl("/login");
          }
        },
      })
    }
    fetchDepartments(): void {
      this.authService.getDepartments().subscribe(
        (data: Department[]) => {
          this.departments = data;
          console.log(data+"data");
        },
        (error: any) => {
          console.log(error);
        }
      );
    }

  

}

