import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name:string ='';
  mail:string ='';
  phone:string="" ;
  pass:string ='';
  passcon:string ='';
  check:boolean= false;
  constructor(private dataservice: DataService,private router: Router ){}
  checkpass() {
    if (this.pass === this.passcon) {
      this.check=true;
      console.log(this.check)
    } else {
      
      this.check=false;
      console.log(this.check)
    }
  }
  submit(){
    const formData = {
      name: this.name,
      email: this.mail,
      phone: this.phone,
      password: this.pass,
      
    };

    // Call the API service to post the data
    this.dataservice.register(formData).subscribe(
      (response:any) => {
        window.alert('Registered successfully !!');
        this.router.navigate(['/home']);
        localStorage.setItem("token",response.token)
        localStorage.setItem("id",response.userId)
        // You can handle the response as needed (e.g., show a success message)
      },
      error => {
        console.error('Error posting data:', error);
        // Handle the error (e.g., show an error message)
      }
    );
  }
}

