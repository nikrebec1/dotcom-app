import { User } from "../../models/user.model"

export type UserState = {
    users: User[],
    loading: boolean, 
}

export const initialUserState: UserState = {
    users: [],
    loading: false
}
