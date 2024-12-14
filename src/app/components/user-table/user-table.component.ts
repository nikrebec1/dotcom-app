import { Component, OnInit } from '@angular/core';
import { User } from '../../types/user.type';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule,],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  providers: [ApiService]
})
export class UserTableComponent implements OnInit {

  users: User[] = [];


  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.fetchUsers();
    console.log("eror")
  }

  fetchUsers(): void {
    this.apiService.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Error fetching users:', err),
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== id);
          console.log('User deleted successfully');
        },
        error: (err) => console.error('Error deleting user:', err),
      });
    }
  }

  editUser(id: number): void {
    this.router.navigate(['/update-user', id]); // Pass the user ID to the update-user route
  }

}
