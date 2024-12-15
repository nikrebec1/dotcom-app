import { Component, OnInit } from '@angular/core';
import { User } from '../../types/user.type';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as UserSelectors from '../../states/user-state/user.selector'
import { deleteUser } from '../../states/user-state/user.actions';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  providers: [ApiService]
})
export class UserTableComponent implements OnInit {
  users$!: Observable<User[]> 
  loading$!: Observable<boolean> 


  constructor(
    private router: Router,
    private store: Store
  ) {

  }

  ngOnInit(): void {
    this.users$ =  this.store.select(UserSelectors.selectAllUsers);
    this.loading$ = this.store.select(UserSelectors.selectLoading);
  
  }


  editUser(id: number): void {
    this.router.navigate(['/update-user', id]); // Pass the user ID to the update-user route
  }

  deletebyUser(userId: number): void {
    const id = Number(userId) 
    this.store.dispatch(deleteUser({id}))
  }

}


