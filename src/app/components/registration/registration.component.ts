import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {delay, Observable, of, take} from 'rxjs';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import * as UserSelectors from '../../states/user-state/user.selector';
import * as UserActions from '../../states/user-state/user.actions';
import {NgIf} from '@angular/common';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {

  userForm!: FormGroup;
  users$!: Observable<User[]>;
  isDuplicateId: boolean = false
  showSuccessPopup = false;
  hideModalTimeout: any;
  navigateTimeout: any;
  passwordVisible = false;




  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.initForm()
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
    this.setAvailableUserId()
  }


  initForm(): void {
    this.userForm = this.fb.group({

      id: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/)],

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
      password: [
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
    const enteredId: string = this.userForm.get('id')?.value;

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

      const token = uuidv4();
      user.token = token;

      localStorage.setItem('userToken', token);


      // Dispatch the Add User action
      this.store.dispatch(UserActions.addUser({user}));

      // Reset the form after successful dispatch

      this.isDuplicateId = false;

      this.showSuccessPopup = true;

      this.hideModalTimeout = setTimeout(() => {
        this.showSuccessPopup = false;
      }, 5000); // Hide modal after 5s


      this.store.select(UserSelectors.selectAllUsers).subscribe(() => {
        this.navigateTimeout = setTimeout(() => {
          this.router.navigate(['/users-table']).then(() => {
            window.location.reload();
          });
        }, 5000);
      });
      // Optional: Navigate back to the user table or show a success message


      console.log(user, this.showSuccessPopup, "5")
    } else {
      console.error("Form is invalid. Please fill out all required fields correctly.");
    }
  }

  navigateImmediately(): void {
    clearTimeout(this.hideModalTimeout); // Stop the auto-hide timeout
    clearTimeout(this.navigateTimeout);  // Stop the auto-navigation timeout
    this.router.navigate(['/users-table']);
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
        : {invalidDateOfBirth: true}; // Invalid
    };
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible
  }

  setAvailableUserId(): void {
    this.store.select(UserSelectors.selectAllUsers)  // Get users from the store
      .pipe(
        take(1),  // Get only one response (unsubscribe automatically)
        map(users => this.findNextAvailableId(users))  // Find the next available ID
      )
      .subscribe(nextId => {
        this.userForm.patchValue({ id: nextId });  // Assign the new ID to the form
      });
  }

  findNextAvailableId(users: User[]): number {
    // Convert all user IDs to numbers, remove invalid ones, and sort in ascending order
    const existingIds = users.map(user => Number(user.id)).filter(id => !isNaN(id)).sort((a, b) => a - b);

    let nextId = 1; // Start checking from ID 1

    // Loop through existing IDs to find the first missing number
    for (const id of existingIds) {
      if (id === nextId) {
        nextId++;  // If ID is taken, check the next number
      } else {
        break;  // If there's a gap, stop and use nextId
      }
    }

    return nextId;  // Return the first available ID
  }

}


