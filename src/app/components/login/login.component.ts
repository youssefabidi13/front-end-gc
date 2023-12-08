import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin! : FormGroup;

  constructor(private fb : FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.formLogin=this.fb.group({
      email:this.fb.control(''),
      password:this.fb.control('')
    })
  }

  handleLogin() {
    let email=this.formLogin.value.email;
    let pwd=this.formLogin.value.password;
    this.authService.login(email,pwd).subscribe(
      {
next:data => {
  this.authService.loadProfile(data);

  // Check user role and navigate accordingly
  if (this.authService.roles.includes("ADMIN")) {
    this.router.navigateByUrl("/dashboard");
  } else if (this.authService.roles.includes("USER")) {
    this.router.navigateByUrl("/all-files");
  } else {
    // Handle other roles or scenarios
    console.log("Invalid role or scenario");
  }
},
error: (err) => {
  if(err.status=401){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Email ou mot de passe incorrecte!',
      showConfirmButton: false,
              timer: 1500
    })
  }
  console.log(err);
},
}
);
}}

