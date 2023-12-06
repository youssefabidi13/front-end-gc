import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/entities/feedback';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  formFeedback!: FormGroup;
  
  

  // Inject the Router service in the constructor
  constructor(private routerA: ActivatedRoute,private formBuilder: FormBuilder, private feedbackService: FeedbackService, private router: Router,private authService:AuthService) { }

  file_id:number = this.routerA.snapshot.params['fileId'];
  id:number=0;

  ngOnInit(): void {
    this.getUserIdByEmail();
    this.formFeedback = this.formBuilder.group({
      rating: this.formBuilder.control('5'),
      messageFeedback: this.formBuilder.control('')
    });
  }

  handleHumor() {
    let rate = this.formFeedback.value.rating;
    let messageFeedback = this.formFeedback.value.messageFeedback;
    
    let modelfeedback: Feedback = { rate: rate, message_feedback: messageFeedback , file_id: this.file_id, utilisateur_id: this.id};

    this.feedbackService.addFeedback(this.file_id,modelfeedback).subscribe({
      next: data => {
        this.showSuccessAlert(data);
      }, error: error => {
        this.showErrorAlert();
      }
    });

    // Use the router to navigate
    this.router.navigateByUrl('/all-files');
  }

  private showSuccessAlert(data: Feedback) {
    Swal.fire({
      icon: 'success',
      title: 'Feedback Submitted Successfully!',
    });
  }

  private showErrorAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  }
  getUserIdByEmail(){
    this.authService.getUserIdByEmail(this.authService.username).subscribe(data=>{
      this.id=data;
      console.log(data);
    })
  }

  cancelFeedback() {
    this.formFeedback.reset();
    Swal.fire({
      icon: 'success',
      title: 'Your Feedback canceled Successfully!',
    }).then(() => {
      this.router.navigate(['/all-files']);
    });
  }
}
