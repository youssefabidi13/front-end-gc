import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DepartmentDto } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserDto[] = [];
  isCreating: boolean = false;
  showUserList: boolean = false;
  departmentService: any;

  constructor(private userService: UserService, private router: Router) {}
  showUpdateForm = false;
  selectedUserId: number | undefined;

  loadUsers(): void {
    this.userService.getUsersWithDepartments().subscribe((users: UserDto[]) => {
        this.users = users;
        console.log(users);
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers2(): void {
    this.userService.getUsers().subscribe((users: UserDto[]) => {
      this.users = users;
    });
  }

  updateUser(id: number) {
    // Navigate to the update URL with the user ID
    this.router.navigate(['/modifier-user', id]);
  }

  confirmDelete(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas récupérer cet utilisateur !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Non, garde-le'
    }).then((result) => {
      if (result.value) {
        this.deleteUser(id);
        Swal.fire(
          'Supprimé !',
          'Votre utilisateur a été supprimé.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Votre utilisateur est en sécurité :)',
          'error'
        );
      }
    });    
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('User deleted successfully');
        // Reload the user list after deletion
        this.loadUsers();
      },
      (error: any) => {
        console.error('Error deleting user', error);
      }
    );
  }
}


export interface UserDto {
  idUtilisateur: number;
  
  nomComplet: string;
  email: string;
  role:string;
  department_id:number;
  departementName:string;
 
}

export class UserDtoImpl implements UserDto {
  idUtilisateur: number;
  nomComplet: string;
  email: string;
  role:string;
  department_id:number;
  departementName:string;
  constructor() {
    this.idUtilisateur = 0;
    this.nomComplet = '';
    this.email = '';
    this.role = '';
    this.department_id = 0;
    this.departementName = '';
  }
}


  export interface UserDto1 {
    idUtilisateur: number;
    
    nomComplet: string;
    email: string;
    
    department_id:any;
    
   
  }
  
  export class UserDtoImpl1 implements UserDto1 {
    idUtilisateur: number;
    nomComplet: string;
    email: string;
    
    department_id:number;
    
    constructor() {
      this.idUtilisateur = 0;
      this.nomComplet = '';
      this.email = '';
      
      this.department_id = 0;
     
    }
  
}