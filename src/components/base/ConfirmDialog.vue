<script setup lang="ts">
import BaseModal from './BaseModal.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps<{ title: string; message: string; loading: boolean }>()
const emit = defineEmits<{ confirm: [] }>()

const visible = defineModel<boolean>('visible', { default: false })
</script>

<template>
  <BaseModal v-model:visible="visible" :title="props.title">
    <p class="text-sm leading-relaxed text-slate-600">{{ props.message }}</p>
    <div class="mt-6 flex gap-3">
      <BaseButton variant="ghost" block @click="visible = false">取消</BaseButton>
      <BaseButton variant="danger" block :loading="props.loading" @click="emit('confirm')">
        確認刪除
      </BaseButton>
    </div>
  </BaseModal>
</template>
