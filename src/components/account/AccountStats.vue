<script setup lang="ts">
import type { AccountStats } from '@/types/account'

const props = defineProps<{ stats: AccountStats }>()

const cards = [
  { key: 'total', label: '總帳號數', accent: 'text-slate-800' },
  { key: 'active', label: '啟用中', accent: 'text-emerald-600' },
  { key: 'inactive', label: '已停用', accent: 'text-slate-400' },
] as const
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <div
      v-for="card in cards"
      :key="card.key"
      class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
    >
      <p class="text-sm text-slate-500">{{ card.label }}</p>
      <p :class="['mt-2 text-3xl font-bold', card.accent]">{{ props.stats[card.key] }}</p>
    </div>
  </div>
</template>
