import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { User } from '../../types/user.type';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})


export class AddUserComponent {
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.initForm();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      name: [
        '',
        [
          Validators.required, // Field must be filled
          Validators.minLength(3), // Minimum 3 characters
          Validators.maxLength(20), // Maximum 20 characters
        ],
      ],
      surname: [
        '',
        [
          Validators.required, // Field must be filled
          Validators.minLength(3), // Minimum 3 characters
          Validators.maxLength(20), // Maximum 20 characters
        ],
      ],
      dateOfBirth: [
        '',
        [
          Validators.required, // Field must be filled
          this.dateOfBirthValidator(), // Custom validator to ensure it's not older than 1960
        ],
      ],
      email: [
        '',
        [
          Validators.required, // Field must be filled
          Validators.email, // Standard email validation
        ],
      ],
      phone: [
        '',
        [
          Validators.pattern(/^\d{9}$/), // Optional but must have exactly 9 digits if filled
        ],
      ],
      isActive: [false, Validators.required], // Must be selected (true or false)
    });

  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      this.apiService.addUser(newUser).subscribe({
        next: () => {
          console.log('User added successfully');
          this.router.navigate(['/users-table']); // Navigate back to the user table
        },
        error: (err) => console.error('Error adding user:', err),
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }

  dateOfBirthValidator() {
    return (control: AbstractControl) => {
      if (!control.value) return null; // If empty, let Validators.required handle it
  
      const selectedDate = new Date(control.value);
      const cutoffDate = new Date('1960-01-01');
  
      return selectedDate >= cutoffDate
        ? null // Valid
        : { invalidDateOfBirth: true }; // Invalid
    };
  }
  

}


