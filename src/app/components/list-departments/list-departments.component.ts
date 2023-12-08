import { AuthService, DepartmentDto } from 'src/app/services/auth.service';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/entities/department';
import { DepartementService } from 'src/app/services/departement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-departments',
  templateUrl: './list-departments.component.html',
  styleUrls: ['./list-departments.component.css']
})
export class ListDepartmentsComponent implements OnInit, AfterViewInit, OnDestroy {
  departments:DepartmentDto[] = [];
  isCreating: boolean=false;
  showDepartmentsList: boolean=false;

  constructor(
    private departmentService: DepartementService,
    private router: Router,
    private authService:AuthService ) {}
    showUpdateForm = false;
    selectedDepartmentId: number | undefined;



  ngOnInit(): void {
    // this.loadDepartments();
    this.fetchDepartments();
  }

  // loadDepartments(): void {
  //   this.departmentService.getDepartments().subscribe((departments) => {
  //     console.log(departments); // Ajoutez cette ligne
  //     this.departments = departments;
  //   });
  // }

  ngAfterViewInit() {
    $(document).ready(function() {
      $('#departmentsTable').DataTable();
    });
  }

  ngOnDestroy() {
    // Détruire le DataTable lors de la destruction du composant
    $('#departmentsTable').DataTable().destroy();
  }
  

  updateDepartment(id: number) {
    // Naviguer vers l'URL de modification avec l'ID du département
    this.router.navigate(['/modifier-departement', id]);
  }
  confirmDelete(id: number) {
    // const confirmDelete = window.confirm('Voulez-vous vraiment supprimer ce département ?');
    // if (confirmDelete) {
    //   this.deleteDepartment(id);
    // }

    Swal.fire({
      title: 'Etes-vous sûr?',
      text: 'Voulez-vous vraiment supprimer ce département ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Non, annuler'
    }).then((result) => {
      if (result.value) {
        this.deleteDepartment(id);
        Swal.fire(
          'Supprimé!',
          'Le département a été supprimé avec succès.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Le département n\'a pas été supprimé',
          'error'
        );
      }
    });
  }
  
   deleteDepartment(id: number) {
    this.departmentService.deleteDepartment(id).subscribe(
      () => {
        console.log('Department deleted successfully');
        // Rechargez la liste des départements après la suppression
        this.fetchDepartments();
      },
      (error) => {
        console.error('Error deleting department', error);
      }
    );
  }
  toggleCreateForm() {
    // Basculez la variable pour afficher ou masquer la liste des départements
    this.showDepartmentsList = !this.showDepartmentsList;

    // Redirigez vers la page d'ajout de département
    this.router.navigate(['/ajouter-departement']);
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


// department.model.ts

