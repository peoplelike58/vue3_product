import { API_ENDPOINTS } from '@/constants'
import { AccountStatus, RoleLevel } from '@/types/enums'
import type { Account, AccountPayload } from '@/types/account'
import { http } from './http'
import { mockApi } from './mock'

const useMock = import.meta.env.VITE_USE_MOCK === 'true'

function normalizeAccount(raw: Record<string, any>): Account {
  return {
    id: String(raw.id ?? raw._id ?? ''),
    name: raw.name ?? '',
    email: raw.email ?? '',
    roleLevel: (raw.roleLevel as RoleLevel) ?? RoleLevel.USER,
    status: (raw.status as AccountStatus) ?? AccountStatus.ON,
    createdAt: (raw.createdAt ?? raw.created_at ?? '').slice(0, 10) || undefined,
  }
}

function unwrapList(data: unknown): Record<string, any>[] {
  if (Array.isArray(data)) return data
  const wrapped = data as { data?: unknown; items?: unknown }
  if (Array.isArray(wrapped?.data)) return wrapped.data
  if (Array.isArray(wrapped?.items)) return wrapped.items
  return []
}

export const accountApi = {
  async list(): Promise<Account[]> {
    if (useMock) return mockApi.listAccounts()
    const { data } = await http.get(API_ENDPOINTS.ACCOUNTS)
    return unwrapList(data).map(normalizeAccount)
  },

  async create(payload: AccountPayload): Promise<Account> {
    if (useMock) return mockApi.createAccount(payload)
    const { data } = await http.post(API_ENDPOINTS.CREATE_ACCOUNT, payload)
    return normalizeAccount(data?.data ?? data ?? payload)
  },

  async update(id: string, payload: AccountPayload): Promise<Account> {
    if (useMock) return mockApi.updateAccount(id, payload)
    const { data } = await http.patch(API_ENDPOINTS.UPDATE_ACCOUNT(id), payload)
    return normalizeAccount(data?.data ?? data ?? { id, ...payload })
  },

  async remove(id: string): Promise<void> {
    if (useMock) return mockApi.removeAccount(id)
    await http.delete(API_ENDPOINTS.DELETE_ACCOUNT(id))
  },
}
