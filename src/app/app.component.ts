import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './types/user.type';
import * as UserSelectors from './states/user-state/user.selector'
import { ApiService } from './services/api.service';
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

  private store = inject(Store)
  title = 'dotcom-app';
  users$: Observable<User[]> =  this.store.select(UserSelectors.selectAllUsers);
  loading$: Observable<boolean> = this.store.select(UserSelectors.selectLoading);
  

  constructor(private apiService: ApiService) {
   
    console.log("prdniaa")
  }

  ngOnInit() {

    this.apiService.getUsers().subscribe((data) => (console.log(data)))
    this.store.dispatch(loadUsers())


  }
}

