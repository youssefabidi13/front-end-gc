import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.css']
})
export class AllFilesComponent implements OnInit {

  files: any = [];

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.getFiles();
  }


  getFiles(): void {
    this.fileService.getFiles().subscribe(
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
        console.log(this.files);
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
