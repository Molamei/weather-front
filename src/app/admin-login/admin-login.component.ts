import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  mail:string = "";
  pass:string= "";
  constructor(private dataservice: DataService,private router: Router ){}
  ngOnInit(): void {
    let token = localStorage.getItem("token");
    if(token){
      this.router.navigate(['/home']);
    }
  }
  login(){
    const formData = {
      
      email: this.mail,
      
      password: this.pass
      
    };

    // Call the API service to post the data
    this.dataservice.login(formData).subscribe(
      (response:any) => {
        
        this.router.navigate(['/home']);
        localStorage.setItem("token",response.token)
        localStorage.setItem("id",response.userId)
      },
      error => {
        console.error('Error posting data:', error);
      }
    );
  }
  
}
