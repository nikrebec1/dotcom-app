import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router) {}

  navigateTo(path: string): void {
    localStorage.removeItem('userToken')
    this.router.navigate(['/login']);
  }


}
