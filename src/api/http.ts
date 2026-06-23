import axios, { AxiosError, type AxiosInstance } from 'axios'
import type { ApiError } from '@/types/auth'

const baseURL = import.meta.env.VITE_API_BASE_URL
const interviewerName = import.meta.env.VITE_INTERVIEWER_NAME

export const http: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((config) => {
  config.headers.set('interviewerName', interviewerName)
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      status: error.response?.status ?? 0,
      message: resolveMessage(error),
    }
    return Promise.reject(apiError)
  },
)

function resolveMessage(error: AxiosError): string {
  const data = error.response?.data as { message?: string | string[] } | undefined
  const message = data?.message
  if (Array.isArray(message)) return message.join('、')
  if (typeof message === 'string') return message
  if (error.code === 'ECONNABORTED') return '連線逾時，請稍後再試'
  if (!error.response) return '無法連線至伺服器，請確認網路或稍後再試'
  return '發生未預期的錯誤'
}
