import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgIf} from '@angular/common';
import * as AuthGuardActions from "../../states/auth-guard-state/auth-guard.actions";
import { Store } from '@ngrx/store';
import {selectIsAuthenticated} from "../../states/auth-guard-state/auth-guard.selector";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  hasToken: boolean = false;


  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.store.select(selectIsAuthenticated).subscribe(isAuth => {
      this.hasToken = isAuth;
    });
  }


  navigateTo(path: string): void {
    if(!this.hasToken)
      this.router.navigate([path]);
  }

  logout(): void {
    this.store.dispatch(AuthGuardActions.logout());
    sessionStorage.removeItem('authToken')
    this.router.navigate(['/login']); // Redirect to login page
  }

}
