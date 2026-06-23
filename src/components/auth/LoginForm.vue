<script setup lang="ts">
import { reactive } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import type { LoginPayload } from '@/types/auth'

const props = defineProps<{ loading: boolean; serverError: string | null }>()
const emit = defineEmits<{ submit: [payload: LoginPayload] }>()

const form = reactive({ email: '', password: '', remember: false })
const errors = reactive({ email: '', password: '' })

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(): boolean {
  errors.email = !form.email
    ? '請輸入電子郵件'
    : !EMAIL_PATTERN.test(form.email)
      ? '電子郵件格式不正確'
      : ''
  errors.password = !form.password ? '請輸入密碼' : ''
  return !errors.email && !errors.password
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', { ...form })
}
</script>

<template>
  <form class="space-y-5" novalidate @submit.prevent="handleSubmit">
    <BaseInput
      v-model="form.email"
      label="電子郵件"
      type="email"
      icon="mail"
      placeholder="your@email.com"
      autocomplete="email"
      :error="errors.email"
    />

    <BaseInput
      v-model="form.password"
      label="密碼"
      type="password"
      icon="lock"
      placeholder="••••••••"
      autocomplete="current-password"
      :error="errors.password"
    />

    <div class="flex items-center justify-between">
      <label class="flex cursor-pointer select-none items-center gap-2 text-sm text-slate-600">
        <input
          v-model="form.remember"
          type="checkbox"
          class="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-200"
        />
        記住我
      </label>
      <a href="#" class="text-sm font-medium text-brand-600 hover:text-brand-700">忘記密碼？</a>
    </div>

    <p
      v-if="props.serverError"
      class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600"
    >
      {{ props.serverError }}
    </p>

    <BaseButton type="submit" variant="primary" block :loading="props.loading">
      <BaseIcon name="login" :size="18" />
      登入
    </BaseButton>

    <div class="rounded-xl bg-brand-50 px-4 py-3 text-center text-sm text-brand-700">
      💡 提示：輸入任意電子郵件和密碼即可登入
    </div>

    <p class="text-center text-sm text-slate-500">
      還沒有帳號？
      <a href="#" class="font-medium text-brand-600 hover:text-brand-700">立即註冊</a>
    </p>
  </form>
</template>
