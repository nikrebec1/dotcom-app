import { createAction, props } from '@ngrx/store'

export const loginSuccess = createAction('[Auth] Login Success', props<{ token: string }>())

export const checkAuthStatus = createAction('[Auth] Check Auth Status')

export const logout = createAction('[Auth] Logout')
