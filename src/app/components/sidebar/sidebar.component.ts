import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  hasToken: boolean = false;


  constructor(private router: Router) {}

  ngOnInit() {
    this.checkToken();
  }

  checkToken(): void {
    this.hasToken = !!localStorage.getItem('userToken'); // Check if token exists
  }


  navigateTo(path: string): void {
    if(!this.hasToken)
      this.router.navigate([path]);
  }

  logout(): void {
    localStorage.removeItem('userToken'); // Remove token
    this.hasToken = false; // Update flag
    this.router.navigate(['/login']); // Redirect to login page
  }

}
