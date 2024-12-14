import { User } from "../../types/user.type"

export type UserState = {
    users: User[],
    loading: boolean, 
}

export const initialUserState: UserState = {
    users: [],
    loading: false
}


export const users: User[] = [
    {
      id: 1,
      name: "Alice",
      surname: "Smith",
      dateOfBirth: new Date ("1990-05-15"),
      email: "alice.smith@example.com",
      phone: 123456789,
      isActive: true
    }
  ]