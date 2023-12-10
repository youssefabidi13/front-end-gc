import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-test',
  templateUrl: './home-test.component.html',
  styleUrls: ['./home-test.component.css']
})
export class HomeTestComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  scroll(id:string){
    this.router.navigate([],{fragment:id})
  }
}
