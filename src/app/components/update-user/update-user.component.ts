import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as UserActions from '../../states/user-state/user.actions'
import * as UserSelector from '../../states/user-state/user.selector'
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user.model';
import { Observable, filter, switchMap, take } from 'rxjs';


@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
  providers: [ApiService]
})
export class UpdateUserComponent implements OnInit {
  userForm!: FormGroup;
  user$!: Observable<User | undefined>;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.initForm()
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId) {
      // Select the user by ID once users are loaded
      this.store.select(UserSelector.selectUserById(userId))
        .pipe(take(1)).subscribe((response: User | undefined) => {
          if (response) {
            this.patchForm(response);
          } else {
            console.error("User undefined");
            this.router.navigate(['/users-table']);
          }
        });
    } else {
      console.error("Invalid User ID");
      this.router.navigate(['/users-table']);
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({

      id: [
        null,
        [Validators.required],
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

  onSubmit(): void {
    if (this.userForm.valid) {
      const user = this.userForm.getRawValue()
      this.store.dispatch(UserActions.updateUser({ user }))


    }
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }

  patchForm(user: User): void {
    this.userForm.patchValue({
      id: user.id,
      name: user.name,
      surname: user.surname,
      dateOfBirth: user.dateOfBirth,
      email: user.email,
      phone: user.phone,
      isActive: user.isActive,
    });
  }



}
