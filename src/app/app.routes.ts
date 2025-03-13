import { Routes } from '@angular/router';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/registration', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'users-table', component: UserTableComponent, canActivate: [authGuard] },
    { path: 'update-user/:id', component: UpdateUserComponent, canActivate: [authGuard] },
    { path: 'add-user', component: AddUserComponent, canActivate: [authGuard] }, // Add-user route
];
