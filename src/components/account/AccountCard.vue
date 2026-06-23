<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { ROLE_LEVEL_LABEL } from '@/types/enums'
import type { Account } from '@/types/account'

const props = defineProps<{ account: Account }>()
const emit = defineEmits<{ edit: [account: Account]; remove: [account: Account] }>()
</script>

<template>
  <article class="flex flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
    <div class="flex items-center gap-4">
      <span
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white"
      >
        <BaseIcon name="user" :size="22" />
      </span>
      <div class="min-w-0">
        <h3 class="truncate font-bold text-slate-800">{{ props.account.name }}</h3>
        <BaseBadge :status="props.account.status" class="mt-1" />
      </div>
    </div>

    <dl class="mt-4 space-y-2.5 text-sm text-slate-600">
      <div class="flex items-center gap-2.5">
        <BaseIcon name="mail" :size="16" class="text-slate-400" />
        <span class="truncate">{{ props.account.email }}</span>
      </div>
      <div class="flex items-center gap-2.5">
        <BaseIcon name="user" :size="16" class="text-slate-400" />
        <span>{{ ROLE_LEVEL_LABEL[props.account.roleLevel] }}</span>
      </div>
      <div v-if="props.account.createdAt" class="flex items-center gap-2.5">
        <BaseIcon name="calendar" :size="16" class="text-slate-400" />
        <span>{{ props.account.createdAt }}</span>
      </div>
    </dl>

    <div class="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
      <BaseButton variant="secondary" @click="emit('edit', props.account)">
        <BaseIcon name="edit" :size="16" />
        編輯
      </BaseButton>
      <BaseButton variant="danger" @click="emit('remove', props.account)">
        <BaseIcon name="trash" :size="16" />
        刪除
      </BaseButton>
    </div>
  </article>
</template>
