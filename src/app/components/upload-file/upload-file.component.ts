import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  selectedFile!: File;
  uploadProgress!: number;
  selectedDepartment!: string; // Add a property to store the selected department
  departements?: String[];

  constructor(private fileUploadService: FileService,private router:Router) { }
  ngOnInit(): void {
    this.getAllDepartement();
  }

  onFileSelected(event: any): void {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  uploadFile(): void {
    if (this.selectedFile && this.selectedDepartment) {
      this.fileUploadService.uploadFile(this.selectedFile, this.selectedDepartment)
        .subscribe(progress => {
          this.uploadProgress = progress;
          if (progress === 100) {
            // alert("File upload completed");
            // File upload completed
            Swal.fire({
              icon: 'success',
              title: 'Succès',
              text: 'File upload completed',
              showConfirmButton: false,
                      timer: 1500
            })
            this.selectedFile = null as any; // Update the type to allow null
            this.router.navigate(['/all-files']);
          }
        });
    }
  }

  getAllDepartement(): void {
    this.fileUploadService.getAllDepartement().subscribe(
      (departements) => {
        this.departements = departements;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
