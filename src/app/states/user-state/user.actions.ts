import { createAction, props } from '@ngrx/store'
import { User } from '../../types/user.type'

export const loadUsers = createAction("[User] Load Users")
export const loadUsersSuccess = createAction("[User] Load Users", props<{users: User[] }>())

export const addUser = createAction("[User] Add User", props<{user: User }>())
export const addUserSuccess = createAction("[User] Add User Success", props<{user: User }>())

export const updateUser = createAction("[User] Update User", props<{user: User}>())
export const updateUserSuccess = createAction("[User] Update User Success", props<{user: User}>())

export const deleteUser = createAction("[User] Delete User", props<{id: string}>())
export const deleteUserSuccess = createAction("[User] Delete User Success", props<{id: string}>())

