import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  send(){
    Swal.fire({
      icon: 'success',
      title: 'Your message has been sent successfully!',
    });
    this.router.navigateByUrl('/home-test');
  }

}
