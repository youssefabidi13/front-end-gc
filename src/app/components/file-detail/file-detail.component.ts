import { FileService } from 'src/app/services/file.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent implements OnInit {

  constructor(private fileService:FileService,private activatedRoute : ActivatedRoute,private authService:AuthService) { }

  file:any;
  id:number=0;
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['fileId'];
    console.log(this.id+ "hello");
    this.getFile();
  }
  getFile(): void {
    
    console.log(this.id+"id");
    this.fileService.getFilesById(this.id).subscribe(
      (response: any) => {
       
        this.file = response;
        console.log(this.file);
        this.file.processedImg = 'data:image/jpeg;base64,' + this.file.data;
      },
      error => {
        console.error('Error fetching files:', error);
      }
    );
  }

  getNomCompletById(id:number):string{
    let nomComplet:string="";
    this.authService.getNomCompletById(id).subscribe(
      (response: any) => {
        nomComplet=response;
      },
      error => {
        console.error('Error fetching files:', error);
      }
    );
    return nomComplet;
  }
}
