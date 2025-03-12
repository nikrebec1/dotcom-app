import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Store } from '@ngrx/store';
import { OnInit } from '@angular/core';
import { loadUsers } from './states/user-state/user.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  title = 'dotcom-app';
  private router: any;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadUsers())
    const token = localStorage.getItem('userToken');

    // If the token in the URL doesn't match the one in localStorage, invalidate the session
    if (!token) {
      localStorage.removeItem('userToken');
      this.router.navigate(['/login']);
    }
  }
}

