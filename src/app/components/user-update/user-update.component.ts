import { Component, OnInit } from '@angular/core';
import { UserDto, UserDto1, UserDtoImpl, UserDtoImpl1 } from '../user-list/user-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/entities/department';
import { UserService } from 'src/app/services/user.service';
import { AuthService, DepartmentDto } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent {

  id: number = 0;
  tempUser!: UserDto1;
  user: UserDto1 = {
    nomComplet: '',
    email: '',
    department_id: 0,
    idUtilisateur: 0,
  };
  departments: DepartmentDto[] = []; // Assuming you have a service to fetch departments

  // departments: Department[] | undefined;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const userId = +params['id'];
      this.getUser(userId);
    });
    this.id = this.route.snapshot.params['id'];
    this.fetchDepartments();
  }
  ngOnInit2(): void {
    this.fetchDepartments();
  }

  // loadDepartments(): void {
  //   this.userService.getDepartments2().subscribe((departments: Department[]) => {
  //     this.departments = departments;
  //   });
  // }

  getUser(id: number) {
    this.userService.getUser(id).subscribe(
      (user) => {
        this.user = { ...user };
      },
      (error) => {
        console.error('Error retrieving user', error);
      }
    );
  }
  updateUser() {
    this.tempUser = new UserDtoImpl1(); // Initialize tempDepartment here

    this.tempUser.idUtilisateur = this.user.idUtilisateur;
    console.log(this.tempUser.idUtilisateur);
    this.tempUser.nomComplet = this.user.nomComplet;
    this.tempUser.email = this.user.email;

    this.tempUser.department_id = this.user.department_id;
    
console.log(this.tempUser); 
    this.userService
      .updateUser(this.user.idUtilisateur, this.tempUser, this.user.department_id)
      .subscribe(
        (response) => {
          Swal.fire({
            title: 'User updated successfully',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK',
          });
          this.router.navigate(['/list-users']);
        },
        (error) => {
          Swal.fire({
            title: 'Error updating user',
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
          });
          console.error('Error updating user', error);
        }
      );
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
