import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as UserSelectors from '../../states/user-state/user.selector'
import * as UserActions from '../../states/user-state/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

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
    private store: Store,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.users$ =  this.store.select(UserSelectors.selectAllUsers);
    this.loading$ = this.store.select(UserSelectors.selectLoading);
  
  }


  editUser(id: string): void {
    this.router.navigate(['/update-user', id]); // Pass the user ID to the update-user route
  }

  deletebyUser(userId: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Confirm Deletion',
        content: 'Are you sure you want to delete this user?',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // Dispatch the delete action
        this.store.dispatch(UserActions.deleteUser({ id: userId }));
        console.log(`User with ID ${userId} deleted.`);
      } else {
        console.log('Deletion canceled.');
      }
    });
  }
}