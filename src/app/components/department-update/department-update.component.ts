import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentDto, DepartmentDtoImpl } from 'src/app/services/auth.service';
import { DepartementService } from 'src/app/services/departement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department-update',
  templateUrl: './department-update.component.html',
  styleUrls: ['./department-update.component.css']
})
export class DepartmentUpdateComponent {
  tempDepartment!: DepartmentDto ;
  department: DepartmentDto = {
    nomDepartement: '',
    descriptionDepartement: '',
    idDepartement: 0,
  };
  id: number = 0;

  constructor(
    private listDepartmentsService: DepartementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const departmentId = +params['id'];
      this.getDepartment(departmentId);
      
    });
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
  }

  

  getDepartment(id: number) {
    this.listDepartmentsService.getDepartment(id).subscribe(
      (department) => {
        this.department = { ...department };
      },
      (error) => {
        console.error('Error retrieving department', error);
      }
    );
  }

  updateDepartment() {
    this.tempDepartment = new DepartmentDtoImpl ();  // Initialize tempDepartment here

    this.tempDepartment.idDepartement = this.id;
    console.log(this.tempDepartment.idDepartement);
    this.tempDepartment.nomDepartement = this.department.nomDepartement;
    this.tempDepartment.descriptionDepartement = this.department.descriptionDepartement;

      // console.log(updatedDepartment.descriptionDepartement + "heelooo");
      // console.log(updatedDepartment.nomDepartement + "heelooo");
  
      this.listDepartmentsService.updateDepartment(this.tempDepartment).subscribe(
        () => {
          console.log('Department updated successfully');
        },
        (error) => {
          if(error.status == 200){
            Swal.fire({
              title: 'Success',
              text: 'Department updated successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          this.router.navigate(['/list-departments']);
        }}
      );
    } 
  }

  
  



