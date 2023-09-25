import { DataService } from './../data.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit {
  forecastdata:any;
  data:any;
  inputValue:string = 'cairo';
  today: string = '';
  tomorrow: string = '';
  dayAfterTomorrow: string = '';
  constructor(private http: HttpClient,private dataService: DataService, private router: Router) {}
  ngOnInit(): void {
    let token =localStorage.getItem("token")
    if(!token){
      this.router.navigate(['/']);
        
    }
    this.today = this.getDayName(0);
    this.tomorrow = this.getDayName(1);
    this.dayAfterTomorrow = this.getDayName(2);
    console.log(this.today, this.tomorrow, this.dayAfterTomorrow);
    this.getData();
  }
  getDayName(offset: number): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    today.setDate(today.getDate() + offset);
    const dayIndex = today.getDay();
    return daysOfWeek[dayIndex];
  }

  getData(){
    this.dataService.getWeather(this.inputValue).subscribe((data) => {
      this.forecastdata = data
      this.data = data.forecast.forecastday;
      console.log(this.data);
    });
  }
}
