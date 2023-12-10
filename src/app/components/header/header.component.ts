import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
// header.component.ts


export class HeaderComponent implements OnInit {
  showHeader: boolean = true;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route and set showHeader accordingly
        this.showHeader = !this.isExcludedRoute(event.url);
      }
    });
  }

  private isExcludedRoute(url: string): boolean {
    // Define the routes where you want to exclude the header
    const excludedRoutes = ['/home-test','contact-us'];
    return excludedRoutes.some((route) => url.includes(route));
  }

  handleLogout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
