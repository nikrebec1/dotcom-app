import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from './user.state';

// Step 1: Create a feature selector for the UserState
export const selectUserState = createFeatureSelector<UserState>('user');

// Step 2: Create individual selectors for specific state properties

// Selector for the full list of users
export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

// Selector for the loading flag
export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectUserById = (id: number) =>
  createSelector(
    selectAllUsers,
    (users) => users.find((user) => user.id === id)
);
