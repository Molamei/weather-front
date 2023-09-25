import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
   constructor(private http: HttpClient) {}

  getWeather(inputValue:string): Observable<any> {
    let apiUrl=`http://api.weatherapi.com/v1/forecast.json?key=005e653ed0dc4d35ac7192041200411&q=${inputValue}&days=3&aqi=no&alerts=no`; 
  
    return this.http.get<any[]>(apiUrl);
  }
  register(data:any){
    let apiUrl=`http://localhost:8090/weather/register`; 
  
    return this.http.post(`${apiUrl}`, data);
  }
  login(data:any){
    let apiUrl=`http://localhost:8090/weather/login`; 
  
    return this.http.post(`${apiUrl}`, data);
  }
  getprofile(id:any, headers:any){
    let apiUrl=`http://localhost:8090/weather/user/profile/${id}`; 
  
    return this.http.get(`${apiUrl}`, headers);
  }
  updateUser(data:any,id:any, headers:any ){
    let apiUrl=`http://localhost:8090/weather/user/profile/${id}`; 
  
    return this.http.put(`${apiUrl}`, data , {headers});
  }
}
