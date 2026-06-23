import { ref } from 'vue'
import type { ApiError } from '@/types/auth'

export function useApiState() {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function run(task: () => Promise<unknown>): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      await task()
      return true
    } catch (err) {
      error.value = (err as ApiError)?.message ?? '操作失敗，請稍後再試'
      return false
    } finally {
      loading.value = false
    }
  }

  return { loading, error, run }
}
