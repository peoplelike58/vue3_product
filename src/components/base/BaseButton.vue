<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    type?: 'button' | 'submit'
    loading?: boolean
    disabled?: boolean
    block?: boolean
  }>(),
  { variant: 'primary', type: 'button', loading: false, disabled: false, block: false },
)

const emit = defineEmits<{ click: [event: MouseEvent] }>()

const variantClass: Record<Variant, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm',
  secondary: 'bg-brand-50 text-brand-700 hover:bg-brand-100',
  danger: 'bg-red-50 text-red-600 hover:bg-red-100',
  ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
}

const isDisabled = computed(() => props.disabled || props.loading)
</script>

<template>
  <button
    :type="props.type"
    :disabled="isDisabled"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60',
      variantClass[props.variant],
      props.block ? 'w-full' : '',
    ]"
    @click="emit('click', $event)"
  >
    <span
      v-if="props.loading"
      class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
    <slot />
  </button>
</template>
