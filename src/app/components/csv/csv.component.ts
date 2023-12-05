import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit {

  constructor(private fileUploadService: FileUploadService, private router: Router) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileUploadService.uploadFile(file).subscribe(
      data => {
        console.log('File uploaded successfully. Number of records inserted:', data);
        this.showSuccessAlert(data);
      },
      error => {
        console.error('Error uploading file:', error);
        this.showErrorAlert();
      }
    );
    
  }

  private showSuccessAlert(recordsInserted: number) {
    Swal.fire({
      icon: 'success',
      title: 'File Uploaded Successfully!',
      text: `Number of records inserted: ${recordsInserted}`,
    });
    this.router.navigateByUrl('/dashboard');
  }

  private showErrorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  }

}
