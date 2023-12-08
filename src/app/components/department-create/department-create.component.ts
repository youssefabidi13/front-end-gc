import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/entities/department';
import { DepartmentDto } from 'src/app/services/auth.service';
import { DepartementService } from 'src/app/services/departement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent {
  department: DepartmentDto = {
    nomDepartement: '',
    descriptionDepartement: '',
    idDepartement: 0
  };

  constructor(private listDepartmentsService: DepartementService,private router:Router) {}

  createDepartment() {
    this.listDepartmentsService.createDepartment({
      nomDepartement: this.department.nomDepartement,
      descriptionDepartement: this.department.descriptionDepartement
    }).subscribe(() => {
      console.log('Department created successfully');
    }, error => {
      if (error.status === 409) {
        Swal.fire({
          title: 'Erreur',
          text: 'Ce département existe déjà',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }else if(error.status === 201){
        Swal.fire({
          title: 'Succès',
          text: 'Département créé avec succès',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/list-departments']);

      }else if(error.status === 200){
        Swal.fire({
          title: 'Succès',
          text: 'Département créé avec succès',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/list-departments']);
      }

      console.error('Error creating department', error);
    });
  }
}
