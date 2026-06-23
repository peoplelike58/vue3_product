<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'

const keyword = defineModel<string>({ default: '' })
</script>

<template>
  <div class="relative">
    <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
      <BaseIcon name="search" />
    </span>
    <input
      v-model="keyword"
      type="search"
      placeholder="搜尋帳號（姓名、郵件、角色）..."
      class="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
    />
  </div>
</template>
