import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthGuardState } from './auth-guard.state';

export const selectAuthGuardState = createFeatureSelector<AuthGuardState>('authGuard');

export const selectIsAuthenticated = createSelector(
  selectAuthGuardState,
  (state) => state.isAuthenticated
);
