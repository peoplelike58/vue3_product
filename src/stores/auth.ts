import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { authApi } from '@/api/auth'
import { tokenStorage } from '@/utils/tokenStorage'
import type { AuthUser, LoginPayload } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(tokenStorage.getUser())
  const token = ref<string | null>(tokenStorage.getToken())

  const isAuthenticated = computed(() => Boolean(token.value))

  async function login(payload: LoginPayload): Promise<void> {
    const result = await authApi.login(payload)
    tokenStorage.save(result.user, result.token, payload.remember)
    user.value = result.user
    token.value = result.token
  }

  function logout(): void {
    tokenStorage.clear()
    user.value = null
    token.value = null
  }

  return { user, token, isAuthenticated, login, logout }
})
