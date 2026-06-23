<script setup lang="ts">
import { ref } from 'vue'
import BaseIcon from './BaseIcon.vue'

const props = withDefaults(
  defineProps<{
    label?: string
    type?: string
    placeholder?: string
    icon?: 'mail' | 'lock' | 'user' | 'calendar'
    error?: string
    autocomplete?: string
  }>(),
  { type: 'text' },
)

const model = defineModel<string>({ default: '' })

const revealed = ref(false)
const isPassword = props.type === 'password'

function currentType(): string {
  if (!isPassword) return props.type
  return revealed.value ? 'text' : 'password'
}
</script>

<template>
  <label class="block">
    <span v-if="props.label" class="field-label">{{ props.label }}</span>
    <span class="relative block">
      <span
        v-if="props.icon"
        class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
      >
        <BaseIcon :name="props.icon" />
      </span>
      <input
        v-model="model"
        :type="currentType()"
        :placeholder="props.placeholder"
        :autocomplete="props.autocomplete"
        :class="[
          'w-full rounded-xl border bg-white py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-100',
          props.icon ? 'pl-11' : 'pl-4',
          isPassword ? 'pr-11' : 'pr-4',
          props.error ? 'border-red-300 focus:border-red-400 focus:ring-red-100' : 'border-slate-200',
        ]"
      />
      <button
        v-if="isPassword"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
        @click="revealed = !revealed"
      >
        <BaseIcon :name="revealed ? 'eye-off' : 'eye'" :size="18" />
      </button>
    </span>
    <span v-if="props.error" class="mt-1.5 block text-xs text-red-500">{{ props.error }}</span>
  </label>
</template>
