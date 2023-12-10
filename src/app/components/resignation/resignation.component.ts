import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ResignationService } from 'src/app/services/resignation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resignation',
  templateUrl: './resignation.component.html',
  styleUrls: ['./resignation.component.css'],
})
export class ResignationComponent implements OnInit {
  resignation = {
    reason: '',
    departureDate: '',
  };
  resignationRequest: any = {};

  id: number = 0;
  constructor(
    private resignationService: ResignationService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getUserIdByEmail();
  }

  submitResignation() {
    // Appel de la méthode du service pour soumettre la démission
    this.resignationService
      .submitResignation(this.resignationRequest, this.id)
      .subscribe(
        (response) => {
          console.log('Démission soumise avec succès', response);
          Swal.fire({
            icon: 'success',
            title: 'Démission soumise avec succès!',
          });
          this.router.navigateByUrl('/all-files');

        },
        (error) => {
          console.error('Erreur lors de la soumission de la démission', error);
          if(error.status == 400){
            Swal.fire({
              icon: 'error',
              title: 'Erreur lors de la soumission de la démission!',
              text: 'Veuillez vérifier les données saisies',
            });
        }else if(error.status == 404){
          Swal.fire({
            icon: 'error',
            title: 'Erreur lors de la soumission de la démission!',
            text: 'Veuillez vérifier les données saisies',
          });}else{
            Swal.fire({
              icon: 'success',
              title: 'Démission soumise avec succès!',
            });
            this.router.navigateByUrl('/home');

          }
      }
      );
  }

  getUserIdByEmail() {
    this.authService
      .getUserIdByEmail(this.authService.username)
      .subscribe((data) => {
        this.id = data;
        console.log(data);
      });
  }
}
