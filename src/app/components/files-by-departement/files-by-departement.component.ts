import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import * as $ from 'jquery';
import 'datatables.net';

@Component({
  selector: 'app-files-by-departement',
  templateUrl: './files-by-departement.component.html',
  styleUrls: ['./files-by-departement.component.css']
})
export class FilesByDepartementComponent implements OnInit {

  files: any = [];
  departementName!: string ;

  constructor(private fileService: FileService,private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.departementName = this.activatedRoute.snapshot.params['department'];
    console.log(this.departementName);
    this.getFiles();
  }


  getFiles(): void {
    this.fileService.getFilesBydepartement(this.departementName).subscribe(

      (response: any[]) => {
        response.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.data;
          this.files.push(element);
        });
        setTimeout(() => {
          $('#datatableexample').DataTable({
            pagingType: 'full_numbers',
            pageLength: 5,
            processing: true,
            lengthMenu: [5, 10, 25],
          });
        }, 1);
      },
      error => {
        console.error('Error fetching files:', error);
      }
    );
  }


  downloadFile(fileId: number): void {
    this.fileService.downloadFile(fileId).subscribe(response => {
      const fileNameFromUrl = "file";
      if (fileNameFromUrl) {
        const contentType = response.headers.get("Content-Type");
        const blob = new Blob([response.body as BlobPart], { type: contentType || undefined });

        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileNameFromUrl;

        link.click();

        window.URL.revokeObjectURL(link.href);
        link.remove();
      } else {
        console.log("Unable to extract file");
      }
    })
  }
}
