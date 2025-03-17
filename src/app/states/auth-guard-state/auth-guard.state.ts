export type AuthGuardState = {
  isAuthenticated: boolean,
  token: string
}

const storedToken = sessionStorage.getItem('authToken');

export const initialAuthGuardState:  AuthGuardState = {
  isAuthenticated: !!storedToken,
  token: storedToken ?? ""
}
