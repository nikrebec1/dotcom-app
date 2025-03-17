import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Store } from '@ngrx/store';
import { OnInit } from '@angular/core';
import { loadUsers } from './states/user-state/user.actions';
import {selectAuthGuardState} from './states/auth-guard-state/auth-guard.selector';
import {take} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  title = 'dotcom-app';

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(loadUsers())

    this.store.select(selectAuthGuardState).pipe(take(1)).subscribe(authState => {
      if (!authState.isAuthenticated) {
        this.router.navigate(['/login']);
      }
    });
  }
}
