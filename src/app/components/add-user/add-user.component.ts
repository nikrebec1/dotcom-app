import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as UserActions from '../../states/user-state/user.actions'
import * as UserSelectors from '../../states/user-state/user.selector';

import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})


export class AddUserComponent implements OnInit {

  userForm!: FormGroup;
  toggleEdit: boolean = false;
  users$!: Observable<User[]>;
  isDuplicateId: boolean = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.initForm()
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
  }


  initForm(): void {
    this.userForm = this.fb.group({

      id: [
        null,
        [Validators.required,],
        
      ],
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

  checkDuplicateId(): void {
    const enteredId:string = this.userForm.get('id')?.value;

    // Check if the entered ID already exists
    this.users$.subscribe((users) => {
      this.isDuplicateId = users.some((user) => user.id === enteredId);
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.getRawValue();

      // Check for duplicate ID before dispatching
      if (this.isDuplicateId) {
        console.error("Duplicate ID: This ID is already in use.");
        return; // Prevent further execution
      }

      // Dispatch the Add User action
      this.store.dispatch(UserActions.addUser({ user }));

      // Reset the form after successful dispatch
      this.userForm.reset();
      this.isDuplicateId = false;

      // Optional: Navigate back to the user table or show a success message
      this.router.navigate(['/users-table']);
    } else {
      console.error("Form is invalid. Please fill out all required fields correctly.");
    }
  }


  cancel(): void {
    this.router.navigate(['/users-table']);
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

  onToggleEdit(): void {
    this.toggleEdit = !this.toggleEdit

  }


}


