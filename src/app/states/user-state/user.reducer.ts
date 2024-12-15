import { createReducer, on } from "@ngrx/store";
import { initialUserState } from "./user.state";
import * as UserActions from "./user.actions"

export const userReducer = createReducer(
    initialUserState,
    
    on(UserActions.loadUsers, (state) => ({...state, loading: true})),
    on(UserActions.loadUsersSuccess, (state, {users}) => ({...state, users, loading: false})),

    on(UserActions.addUser, (state) => ({...state, loading: true})),
    on(UserActions.addUserSuccess, (state, {user}) => ({...state, users: [...state.users, user ], loading: false})),

    on(UserActions.updateUserSuccess, (state, {user}) => ({
        ...state, 
        users: state.users.map((u) => (u.id === user.id ? user : u)),
        loading: false
    })),
    
    on(UserActions.deleteUser, (state) => ({...state, loading: true})),
    on(UserActions.deleteUserSuccess, (state, {id}) => ({
        ...state,
        users: state.users.filter((u) => (u.id !== id)),
        loading: false
     }))

    
)