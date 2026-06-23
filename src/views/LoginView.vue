<script setup lang="ts">
import { useRouter } from 'vue-router'
import LoginForm from '@/components/auth/LoginForm.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import { useAuthStore } from '@/stores/auth'
import { useApiState } from '@/composables/useApiState'
import { RouteName } from '@/constants'
import type { LoginPayload } from '@/types/auth'

const router = useRouter()
const authStore = useAuthStore()
const { loading, error, run } = useApiState()

async function handleLogin(payload: LoginPayload) {
  const ok = await run(() => authStore.login(payload))
  if (ok) {
    router.replace({ name: RouteName.ACCOUNTS })
  }
}
</script>

<template>
  <main
    class="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-50 via-slate-50 to-brand-100 p-4"
  >
    <div class="w-full max-w-md rounded-3xl bg-white p-8 shadow-card sm:p-10">
      <div class="mb-8 flex flex-col items-center text-center">
        <span
          class="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white"
        >
          <BaseIcon name="login" :size="28" />
        </span>
        <h1 class="text-2xl font-bold text-slate-800">歡迎回來</h1>
        <p class="mt-2 text-slate-500">請登入您的帳號以繼續</p>
      </div>

      <LoginForm :loading="loading" :server-error="error" @submit="handleLogin" />
    </div>
  </main>
</template>
