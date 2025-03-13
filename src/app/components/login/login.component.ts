import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as UserSelectors from '../../states/user-state/user.selector';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  userForm!: FormGroup;
  users$!: Observable<User[]>;
  passwordVisible = false;
  private subscriptions: Subscription = new Subscription()
  showSuccessPopup = false;
  hideModalTimeout: any;
  navigateTimeout: any;




  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.initForm()
    this.users$ = this.store.select(UserSelectors.selectAllUsers);
  }


  initForm(): void {
    this.userForm = this.fb.group({

      id: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[0-9]+$/),
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

    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible
  }

  onSubmit(): void {

    if (this.userForm.valid) {
      const { id, password } = this.userForm.getRawValue();

      this.users$.subscribe(users => {
        const user = users.find(res => res.id === id && res.password === password);

        if (user) {
          // Credentials match, generate a token
          const token = uuidv4();


          // Store the token in localStorage (so it persists across page reloads)
          localStorage.setItem('userToken', token);

          this.showSuccessPopup = true;

          this.hideModalTimeout = setTimeout(() => {
            this.showSuccessPopup = false;
          }, 2000); // Hide modal after 5s

          this.store.select(UserSelectors.selectAllUsers).subscribe(() => {
            this.navigateTimeout = setTimeout(() => {
              this.router.navigate(['/users-table']).then(() => {
                window.location.reload();
              });
            }, 2000);
          });


        } else {
          // If no matching user found, show an error
          alert('Invalid ID or password!');
        }
      });
    }


  }

  navigateImmediately(): void {
    clearTimeout(this.hideModalTimeout); // Stop the auto-hide timeout
    clearTimeout(this.navigateTimeout);  // Stop the auto-navigation timeout
    this.router.navigate(['/users-table']);
  }

}
