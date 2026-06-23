<script setup lang="ts">
import { reactive, watch } from 'vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import {
  ACCOUNT_STATUS_OPTIONS,
  AccountStatus,
  ROLE_LEVEL_OPTIONS,
  RoleLevel,
} from '@/types/enums'
import type { Account, AccountPayload } from '@/types/account'

const props = defineProps<{ account: Account | null; loading: boolean }>()
const emit = defineEmits<{ submit: [payload: AccountPayload] }>()

const visible = defineModel<boolean>('visible', { default: false })

const form = reactive<AccountPayload>({
  name: '',
  email: '',
  roleLevel: RoleLevel.USER,
  status: AccountStatus.ON,
})
const errors = reactive({ name: '', email: '' })

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

watch(visible, (open) => {
  if (!open) return
  errors.name = ''
  errors.email = ''
  form.name = props.account?.name ?? ''
  form.email = props.account?.email ?? ''
  form.roleLevel = props.account?.roleLevel ?? RoleLevel.USER
  form.status = props.account?.status ?? AccountStatus.ON
})

function validate(): boolean {
  errors.name = form.name.trim() ? '' : '請輸入姓名'
  errors.email = !form.email
    ? '請輸入電子郵件'
    : !EMAIL_PATTERN.test(form.email)
      ? '電子郵件格式不正確'
      : ''
  return !errors.name && !errors.email
}

function handleSubmit() {
  if (!validate()) return
  emit('submit', { ...form })
}
</script>

<template>
  <BaseModal v-model:visible="visible" :title="props.account ? '編輯帳號' : '新增帳號'">
    <form class="space-y-4" novalidate @submit.prevent="handleSubmit">
      <BaseInput v-model="form.name" label="姓名" icon="user" placeholder="請輸入姓名" :error="errors.name" />
      <BaseInput
        v-model="form.email"
        label="電子郵件"
        type="email"
        icon="mail"
        placeholder="your@email.com"
        :error="errors.email"
      />
      <BaseSelect v-model="form.roleLevel" label="角色" :options="ROLE_LEVEL_OPTIONS" />
      <BaseSelect v-model="form.status" label="狀態" :options="ACCOUNT_STATUS_OPTIONS" />

      <div class="flex gap-3 pt-2">
        <BaseButton variant="ghost" block @click="visible = false">取消</BaseButton>
        <BaseButton type="submit" variant="primary" block :loading="props.loading">
          {{ props.account ? '儲存變更' : '新增帳號' }}
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>
