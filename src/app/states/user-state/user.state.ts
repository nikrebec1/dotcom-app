import { User } from "../../types/user.type"

export type UserState = {
    users: User[],
    loading: boolean, 
}

export const initialUserState: UserState = {
    users: [],
    loading: false
}
