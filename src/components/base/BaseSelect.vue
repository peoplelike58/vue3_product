<script setup lang="ts" generic="T extends string">
interface Option {
  label: string
  value: T
}

const props = defineProps<{
  label?: string
  options: Option[]
}>()

const model = defineModel<T>({ required: true })
</script>

<template>
  <label class="block">
    <span v-if="props.label" class="field-label">{{ props.label }}</span>
    <select
      v-model="model"
      class="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
    >
      <option v-for="option in props.options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </label>
</template>
