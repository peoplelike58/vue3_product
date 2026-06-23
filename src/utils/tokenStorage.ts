import { STORAGE_KEYS } from '@/constants'
import type { AuthUser } from '@/types/auth'

function pickStorage(remember: boolean): Storage {
  return remember ? window.localStorage : window.sessionStorage
}

function readBoth(key: string): string | null {
  return window.localStorage.getItem(key) ?? window.sessionStorage.getItem(key)
}

function removeBoth(key: string): void {
  window.localStorage.removeItem(key)
  window.sessionStorage.removeItem(key)
}

export const tokenStorage = {
  getToken(): string | null {
    return readBoth(STORAGE_KEYS.TOKEN)
  },

  getUser(): AuthUser | null {
    const raw = readBoth(STORAGE_KEYS.USER)
    if (!raw) return null
    try {
      return JSON.parse(raw) as AuthUser
    } catch {
      return null
    }
  },

  save(user: AuthUser, token: string, remember: boolean): void {
    this.clear()
    const storage = pickStorage(remember)
    storage.setItem(STORAGE_KEYS.TOKEN, token)
    storage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  },

  clear(): void {
    removeBoth(STORAGE_KEYS.TOKEN)
    removeBoth(STORAGE_KEYS.USER)
  },
}
