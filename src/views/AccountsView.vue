<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AccountStats from '@/components/account/AccountStats.vue'
import AccountSearchBar from '@/components/account/AccountSearchBar.vue'
import AccountList from '@/components/account/AccountList.vue'
import AccountFormModal from '@/components/account/AccountFormModal.vue'
import ConfirmDialog from '@/components/base/ConfirmDialog.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import { useAccountStore } from '@/stores/account'
import { useAuthStore } from '@/stores/auth'
import { useApiState } from '@/composables/useApiState'
import { useDebounce } from '@/composables/useDebounce'
import { RouteName, SEARCH_DEBOUNCE_MS } from '@/constants'
import type { Account, AccountPayload } from '@/types/account'

const router = useRouter()
const accountStore = useAccountStore()
const authStore = useAuthStore()

const listState = useApiState()
const formState = useApiState()
const removeState = useApiState()

const searchInput = ref('')
const debouncedKeyword = useDebounce(searchInput, SEARCH_DEBOUNCE_MS)
watch(debouncedKeyword, (value) => {
  accountStore.keyword = value
})

const formVisible = ref(false)
const editingAccount = ref<Account | null>(null)

const confirmVisible = ref(false)
const removingAccount = ref<Account | null>(null)

onMounted(() => {
  listState.run(() => accountStore.fetchAll())
})

function openCreate() {
  editingAccount.value = null
  formVisible.value = true
}

function openEdit(account: Account) {
  editingAccount.value = account
  formVisible.value = true
}

async function submitForm(payload: AccountPayload) {
  const action = editingAccount.value
    ? () => accountStore.update(editingAccount.value!.id, payload)
    : () => accountStore.create(payload)
  const ok = await formState.run(action)
  if (ok) formVisible.value = false
}

function openRemove(account: Account) {
  removingAccount.value = account
  confirmVisible.value = true
}

async function confirmRemove() {
  if (!removingAccount.value) return
  const ok = await removeState.run(() => accountStore.remove(removingAccount.value!.id))
  if (ok) confirmVisible.value = false
}

function logout() {
  authStore.logout()
  router.replace({ name: RouteName.LOGIN })
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div class="flex items-center gap-3">
          <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
            <BaseIcon name="users" :size="22" />
          </span>
          <div>
            <h1 class="text-xl font-bold text-slate-800">帳號管理系統</h1>
            <p class="text-sm text-slate-500">管理您的所有帳號</p>
          </div>
        </div>
        <BaseButton variant="ghost" @click="logout">
          <BaseIcon name="logout" :size="18" />
          登出
        </BaseButton>
      </div>
    </header>

    <main class="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
      <div class="flex flex-col gap-3 sm:flex-row">
        <div class="flex-1">
          <AccountSearchBar v-model="searchInput" />
        </div>
        <BaseButton variant="primary" @click="openCreate">
          <BaseIcon name="plus" :size="18" />
          新增帳號
        </BaseButton>
      </div>

      <AccountStats :stats="accountStore.stats" />

      <p v-if="listState.error.value" class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
        {{ listState.error.value }}
      </p>

      <AccountList
        :accounts="accountStore.filtered"
        :loading="listState.loading.value"
        @edit="openEdit"
        @remove="openRemove"
      />
    </main>

    <AccountFormModal
      v-model:visible="formVisible"
      :account="editingAccount"
      :loading="formState.loading.value"
      @submit="submitForm"
    />

    <ConfirmDialog
      v-model:visible="confirmVisible"
      title="刪除帳號"
      :message="`確定要刪除「${removingAccount?.name ?? ''}」這個帳號嗎？此操作無法復原。`"
      :loading="removeState.loading.value"
      @confirm="confirmRemove"
    />
  </div>
</template>
