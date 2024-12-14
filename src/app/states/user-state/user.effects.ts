import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';
import * as UserActions from './user.actions';
import { User } from '../../types/user.type';
import { ApiService } from '../../services/api.service';

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private apiService: ApiService) { 
        console.log("initialized")
    }

    

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.loadUsers),
            tap(() => (console.log("triggered"))),
            mergeMap(() =>
                {return this.apiService.getUsers().pipe(
                    map((users: User[]) => UserActions.loadUsersSuccess({ users })),
                )}
            )
        )
    );

    addUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.addUser),
            mergeMap((action) =>
                {return this.apiService.addUser(action.user).pipe(
                    map((user: User) => UserActions.addUserSuccess({ user })),
                )}
            )
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.updateUser),
            mergeMap((action) =>
                {return this.apiService.updateUser(action.user).pipe(
                    map((user: User) => UserActions.updateUserSuccess({ user })),
                )}
            )
        )
    );

    deleteUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.deleteUser),
            mergeMap((action) =>
                {return this.apiService.deleteUser(action.id).pipe(
                    map(() => UserActions.deleteUserSuccess({ id: action.id })),
                )}
            )
        )
    );
}