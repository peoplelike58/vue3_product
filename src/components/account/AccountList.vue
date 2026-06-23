<script setup lang="ts">
import AccountCard from './AccountCard.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import type { Account } from '@/types/account'

const props = defineProps<{ accounts: Account[]; loading: boolean }>()
const emit = defineEmits<{ edit: [account: Account]; remove: [account: Account] }>()
</script>

<template>
  <div v-if="props.loading" class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    <div
      v-for="n in 3"
      :key="n"
      class="h-56 animate-pulse rounded-2xl border border-slate-100 bg-white p-5"
    >
      <div class="flex items-center gap-4">
        <div class="h-12 w-12 rounded-full bg-slate-200" />
        <div class="flex-1 space-y-2">
          <div class="h-4 w-1/2 rounded bg-slate-200" />
          <div class="h-4 w-1/3 rounded bg-slate-100" />
        </div>
      </div>
    </div>
  </div>

  <div
    v-else-if="props.accounts.length === 0"
    class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-slate-400"
  >
    <BaseIcon name="users" :size="40" />
    <p class="mt-3 text-sm">沒有符合條件的帳號</p>
  </div>

  <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    <AccountCard
      v-for="account in props.accounts"
      :key="account.id"
      :account="account"
      @edit="emit('edit', $event)"
      @remove="emit('remove', $event)"
    />
  </div>
</template>
