import * as AuthGuardActions from "./auth-guard.actions"
import {createReducer, on} from '@ngrx/store';
import { initialAuthGuardState } from './auth-guard.state';

export const authGuardReducer = createReducer(
  initialAuthGuardState,

  on(AuthGuardActions.loginSuccess, (state, {token}) => {sessionStorage.setItem('authToken', token); return {...state, token, isAuthenticated: true }}),
  on(AuthGuardActions.checkAuthStatus, (state) => ({...state,})),
  on(AuthGuardActions.logout, (state) => ({...state, token: '', isAuthenticated: false,})),


)
