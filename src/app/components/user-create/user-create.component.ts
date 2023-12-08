import { Component, OnInit } from '@angular/core';
import { Department } from 'src/app/entities/department';
import { AuthService, DepartmentDto } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UserDto, UserDto1 } from '../user-list/user-list.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit{
  user: CreateUserDtoImpl = {
    nomComplet: '',
    email: '',
    department_id: 0,
    idUtilisateur: 0,
    password: '',
    };
  departments: DepartmentDto[] =[];

  constructor(private userService: UserService,private authService:AuthService,private router:Router) {}
  ngOnInit(): void {
    this.fetchDepartments();
  }

  // loadDepartments(): void {
  //   this.userService.getDepartments2().subscribe((departments: Department[]) => {
  //     this.departments = departments;
  //   });
  // }

  createUser() {
    if (this.user.department_id) {
      this.userService.createUser({
        nomComplet: this.user.nomComplet,
        email: this.user.email,
        password: this.user.password,
        role: 'USER',
        department_id: this.user.department_id  // Ensure that department_id is set
      },this.user.department_id).subscribe(() => {
        Swal.fire({
          title: 'Employee has been added successfully',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/list-users']);
          }
        });  
      }, error => {
        Swal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
          showCancelButton: false,
          confirmButtonText: 'OK',
        });
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Please select a department',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK',
      });
    }
  }
  fetchDepartments(): void {
    this.authService.getDepartments().subscribe(
      (data: Department[]) => {
        this.departments = data;
        console.log(data + 'data');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}




export interface CreateUserDto {
  idUtilisateur: number;
  
  nomComplet: string;
  email: string;
  department_id:number;
  password:string; 
}

export class CreateUserDtoImpl implements CreateUserDto {
  idUtilisateur: number;
  
  nomComplet: string;
  email: string;
  department_id:number;
  password:string; 
  constructor() {
    this.idUtilisateur = 0;
    this.nomComplet = '';
    this.email = '';
    this.department_id = 0;
    this.password = '';
  }
}