export type AuthGuardState = {
  isAuthenticated: boolean,
  token: string
}

export const initialAuthGuardState:  AuthGuardState = {
  isAuthenticated: false,
  token: ""
}
