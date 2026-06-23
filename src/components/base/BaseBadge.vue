<script setup lang="ts">
import { AccountStatus } from '@/types/enums'

const props = defineProps<{ status: AccountStatus }>()

const styleMap: Record<AccountStatus, string> = {
  [AccountStatus.ON]: 'bg-emerald-100 text-emerald-700',
  [AccountStatus.OFF]: 'bg-slate-200 text-slate-500',
}

const labelMap: Record<AccountStatus, string> = {
  [AccountStatus.ON]: '啟用',
  [AccountStatus.OFF]: '停用',
}
</script>

<template>
  <span :class="['inline-flex rounded-full px-3 py-1 text-xs font-medium', styleMap[props.status]]">
    {{ labelMap[props.status] }}
  </span>
</template>
