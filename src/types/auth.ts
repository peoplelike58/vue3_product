export interface LoginPayload {
  email: string
  password: string
  remember: boolean
}

export interface AuthUser {
  id: string
  name: string
  email: string
}

export interface AuthResult {
  user: AuthUser
  token: string
}

export interface ApiError {
  status: number
  message: string
}
