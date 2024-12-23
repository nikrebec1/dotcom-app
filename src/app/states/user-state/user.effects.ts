import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { User } from '../../models/user.model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllUsers } from './user.selector';
import { EMPTY } from 'rxjs';

export const loadUser = createEffect(
    (actions$ = inject(Actions), apiService = inject(ApiService)) => {
        return actions$.pipe(
            ofType(UserActions.loadUsers),
            exhaustMap(() =>
                apiService.getUsers().pipe(
                    map((users: User[]) => UserActions.loadUsersSuccess({users}))
                )
            )
        )
    },
    {functional: true}
) 

export const deleteUser = createEffect(
    (actions$ = inject(Actions), apiService = inject(ApiService)) => {
        return actions$.pipe(
            ofType(UserActions.deleteUser),
            mergeMap((action) =>
                apiService.deleteUser(action.id).pipe(
                    map((user: User) => UserActions.deleteUserSuccess({ id: user.id })),
                )
            )
        )
    },
    {functional: true}
) 

export const addUser = createEffect(
    (actions$ = inject(Actions), apiService = inject(ApiService), router = inject(Router), store = inject(Store)) => {
        return actions$.pipe(
            ofType(UserActions.addUser),
            withLatestFrom(store.select(selectAllUsers)),
            mergeMap(([action, users]) => {
                const idExists = users.some((user) => user.id === action.user.id);

                if (idExists) {

                  console.log("empty")  
                  return EMPTY
                }
                return apiService.addUser(action.user).pipe(
                    map((user: User) => UserActions.addUserSuccess({ user })),
                    tap(() => {
                        router.navigate(['users-table'])

                    })
                )}
            )
        )
    },
    {functional: true}
)

export const updateUser = createEffect(
    (actions$ = inject(Actions), apiService = inject(ApiService), router = inject(Router), store = inject(Store)) => {
        return actions$.pipe(
            ofType(UserActions.updateUser),
            mergeMap((action) =>
                {return apiService.updateUser(action.user).pipe(
                    map((user: User) => UserActions.updateUserSuccess({ user })),
                    tap(() => {
                        router.navigate(['users-table'])

                    })
                )}
            )
            
        )
    },
    {functional: true}

)