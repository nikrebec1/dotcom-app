import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { AddUserComponent } from './components/add-user/add-user.component';

export const routes: Routes = [
    { path: '', redirectTo: '/user-table', pathMatch: 'full' },
    { path: 'users-table', component: UserTableComponent },
    { path: 'users', component: UpdateUserComponent },
    { path: 'update-user/:id', component: UpdateUserComponent },
    { path: 'add-user', component: AddUserComponent }, // Add-user route
];
