<script setup lang="ts">
import BaseIcon from './BaseIcon.vue'

defineProps<{ title?: string }>()

const visible = defineModel<boolean>('visible', { default: false })

function close() {
  visible.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
        @click.self="close"
      >
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-card">
          <header class="mb-5 flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-800">{{ title }}</h2>
            <button
              type="button"
              class="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              @click="close"
            >
              <BaseIcon name="close" :size="20" />
            </button>
          </header>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
