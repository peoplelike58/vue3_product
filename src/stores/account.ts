import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { accountApi } from '@/api/account'
import { AccountStatus, ROLE_LEVEL_LABEL } from '@/types/enums'
import type { Account, AccountPayload, AccountStats } from '@/types/account'

export const useAccountStore = defineStore('account', () => {
  const list = ref<Account[]>([])
  const keyword = ref('')

  const filtered = computed<Account[]>(() => {
    const term = keyword.value.trim().toLowerCase()
    if (!term) return list.value
    return list.value.filter((account) =>
      [account.name, account.email, ROLE_LEVEL_LABEL[account.roleLevel]].some((field) =>
        field.toLowerCase().includes(term),
      ),
    )
  })

  const stats = computed<AccountStats>(() => ({
    total: list.value.length,
    active: list.value.filter((account) => account.status === AccountStatus.ON).length,
    inactive: list.value.filter((account) => account.status === AccountStatus.OFF).length,
  }))

  async function fetchAll(): Promise<void> {
    list.value = await accountApi.list()
  }

  async function create(payload: AccountPayload): Promise<void> {
    await accountApi.create(payload)
    await fetchAll()
  }

  async function update(id: string, payload: AccountPayload): Promise<void> {
    await accountApi.update(id, payload)
    await fetchAll()
  }

  async function remove(id: string): Promise<void> {
    await accountApi.remove(id)
    await fetchAll()
  }

  return { list, keyword, filtered, stats, fetchAll, create, update, remove }
})
