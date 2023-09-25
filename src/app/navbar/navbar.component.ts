import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isHomeVisible: boolean = true;
  isLoginVisible: boolean = true;
  isRegisterVisible: boolean = true;
  isProfileVisible: boolean = true;
  isAdminVisible: boolean = true;

  constructor(private router: Router) {
    // Subscribe to router events to dynamically update visibility based on the current route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url;
        // Update visibility properties based on the current route
        this.isHomeVisible = currentRoute !== '/home';
        this.isLoginVisible = currentRoute !== '/';
        this.isRegisterVisible = currentRoute !== '/register';
        this.isProfileVisible = currentRoute !== '/profile';
        this.isAdminVisible = currentRoute !== '/admin';
      }
    });
  }
  logout(){
    localStorage.removeItem("token")
    this.router.navigate(['/']);
  }
}
