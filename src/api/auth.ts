import type { AuthResult, LoginPayload } from '@/types/auth'

const SESSION_DELAY = 350

export const authApi = {
  login(payload: LoginPayload): Promise<AuthResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: 'me',
            name: payload.email.split('@')[0],
            email: payload.email,
          },
          token: `session-${Date.now()}`,
        })
      }, SESSION_DELAY)
    })
  },
}
