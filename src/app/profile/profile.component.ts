import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data:any;
  name:string ='';
  
  phone:string="" ;
  pass:string ='';
  constructor(private dataservice: DataService,private router: Router ){}
  
  ngOnInit(): void {
    let id = (localStorage.getItem("id"))
    let token = localStorage.getItem("token")
    console.log(token)
    const headers = new HttpHeaders({
      
      'Content-Type': 'application/json',
      
      'Authorization': `Bearer ${token}` // Replace accessToken with your actual token
    });
    this.dataservice.getprofile(id, {headers}).subscribe(
      (response:any) => {
        this.data = response
        console.log(response)
      },
      error => {
        console.error('Error getting data:', error);
      }
    );
  }
  submit(){
    let id = (localStorage.getItem("id"))
    let token = localStorage.getItem("token")
    const formData = {
      name: this.name,
      email: this.data.mail,
      phone: this.phone,
      password: this.pass,
      
    };
    const headers = new HttpHeaders({
      
      'Content-Type': 'application/json',
      
      'Authorization': `Bearer ${token}` // Replace accessToken with your actual token
    });
    // Call the API service to post the data
    this.dataservice.updateUser(formData, id, headers).subscribe(
      (response:any) => {
        window.alert('updated successfully !!');
        this.router.navigate(['/home']);
        
        // You can handle the response as needed (e.g., show a success message)
      },
      error => {
        console.error('Error posting data:', error);
        // Handle the error (e.g., show an error message)
      }
    );
  }

}
