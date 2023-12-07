import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResignationService } from 'src/app/services/resignation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resignation-list',
  templateUrl: './resignation-list.component.html',
  styleUrls: ['./resignation-list.component.css']
})
export class ResignationListComponent {
  resignations: any[] = []; // Change the type accordingly

  constructor(private resignationService: ResignationService ,private router:Router) {}

  ngOnInit() {
    this.getPendingResignations();
  }

  getPendingResignations() {
    this.resignationService.getPendingResignations().subscribe(
      (resignations: any[]) => {
        this.resignations = resignations;
      },
      (error) => {
        console.error('Error fetching resignations:', error);
      }
    );
  }

  approveResignation(resignationId: number) {
    this.resignationService.approveResignation(resignationId).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Resignation approved successfully!',
        });
        this.router.navigateByUrl('/dashboard');
        // this.location.reload();

      },
      (error) => {
        console.error('Error approving resignation:', error);
  
        // Check if the error is due to a non-JSON response
        if (error instanceof HttpErrorResponse && error.status === 200) {
          // If it's a 200 status with a non-JSON response, consider it a success
          Swal.fire({
            icon: 'success',
            title: 'Resignation approved successfully!',
          });
          this.router.navigateByUrl('/dashboard');
          // this.location.reload();

        } else {
          // Handle other types of errors (e.g., network issues, server errors)
          Swal.fire({
            icon: 'error',
            title: 'Error approving resignation',
            text: 'An unexpected error occurred. Please try again later.',
          });
        }
      }
    );
  }
  

  rejectResignation(resignationId: number) {
    this.resignationService.rejectResignation(resignationId).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Resignation rejected successfully!',
        });
        this.router.navigateByUrl('/dashboard');
        // this.location.reload();

      },
      (error) => {
        console.error('Error rejecting resignation:', error);
  
        // Check if the error is due to a non-JSON response
        if (error instanceof HttpErrorResponse && error.status === 200) {
          // If it's a 200 status with a non-JSON response, consider it a success
          Swal.fire({
            icon: 'success',
            title: 'Resignation rejected successfully!',
          });
          this.router.navigateByUrl('/dashboard');
          // this.location.reload();

        } else {
          // Handle other types of errors (e.g., network issues, server errors)
          Swal.fire({
            icon: 'error',
            title: 'Error rejecting resignation',
            text: 'An unexpected error occurred. Please try again later.',
          });
        }
      }
    );
  }
  
}
