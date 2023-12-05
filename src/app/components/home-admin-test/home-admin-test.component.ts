import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
Chart.register(...registerables);

@Component({
  selector: 'app-home-admin-test',
  templateUrl: './home-admin-test.component.html',
  styleUrls: ['./home-admin-test.component.css']
})
export class HomeAdminTestComponent implements OnInit {

  constructor(private adminService:AdminService,private authService:AuthService) { }
  id:number=0;
  labeldataskill:string[] = [];
  realdataskill:number[] = [];
  labeldata: any[] = [];
  realdata: any[] = [];
  n:number=0;
  n_departments:number=0;
  n_skills:number=0;
  n_courses:number=0;
  ngOnInit(): void {
    this.getUserIdByEmail();
    this.getNumberOfUsers();
    this.getNumberOfDepartments();
    this.getNumberOfSkills();
    this.getNumberOfCourses();
     // Fetch data from your backend
     this.adminService.getNumberOfEmployeesByDepartment().subscribe(data => {
      this.labeldata = data.map(entry => entry.department);
      this.realdata = data.map(entry => entry.employeeCount);

      this.RenderChart();
    });
    this.adminService.getUsersByCompetence().subscribe(data => {
      this.labeldataskill = data.map(entry => entry.competenceName);
      this.realdataskill = data.map(entry => entry.userCount);

      this.RenderSkillsChart();
    });
  }

  getNumberOfUsers(){
    this.adminService.getNumberOfUsers().subscribe(data=>{
      console.log(data);
      this.n=data;
    })
  }
  getNumberOfDepartments(){
    this.adminService.getNumberOfDepartments().subscribe(data=>{
      console.log(data);
      this.n_departments=data;
    })
  }
  getNumberOfSkills(){
    this.adminService.getNumberOfSkills().subscribe(data=>{
      console.log(data);
      this.n_skills=data;
    })
  }
  getNumberOfCourses(){
    this.adminService.getNumberOfCourses().subscribe(data=>{
      console.log(data);
      this.n_courses=data;
    })
  }

  RenderChart() {
    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: this.labeldata,
        datasets: [{
          label: 'Number of employee by department',
          data: this.realdata,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
          }
        }
      }
    });
    
  }
  RenderSkillsChart() {
    new Chart("SkillChart", {
      type: 'line',
      data: {
        labels: this.labeldataskill, // Use departments as labels for the x-axis
        datasets: [{
          label: 'Number of employee by skill',
          data: this.realdataskill,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: true,
          }
        }
      }
    });
  }
  getUserIdByEmail(){
    this.authService.getUserIdByEmail(this.authService.username).subscribe(data=>{
      this.id=data;
      console.log(data);
    })
  }
}
