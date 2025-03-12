import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('userToken');

  if (!token) {
    console.warn('No token found, redirecting to login');
    localStorage.removeItem('userToken');

    router.navigate(['/login']);
    return false;
  }

  console.log('User has a valid token:', token);
  return true;


};
