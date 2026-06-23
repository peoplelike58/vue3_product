import { AccountStatus, RoleLevel } from '@/types/enums'
import type { Account, AccountPayload } from '@/types/account'

const LATENCY = 450

let seedId = 4
let accounts: Account[] = [
  {
    id: '1',
    name: '張小明',
    email: 'ming.chang@example.com',
    roleLevel: RoleLevel.ADMIN,
    status: AccountStatus.ON,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: '李美麗',
    email: 'meili.li@example.com',
    roleLevel: RoleLevel.USER,
    status: AccountStatus.ON,
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    name: '王大寶',
    email: 'dabao.wang@example.com',
    roleLevel: RoleLevel.EDITOR,
    status: AccountStatus.OFF,
    createdAt: '2024-03-10',
  },
]

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY))
}

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export const mockApi = {
  listAccounts(): Promise<Account[]> {
    return delay(accounts.map((account) => ({ ...account })))
  },

  createAccount(payload: AccountPayload): Promise<Account> {
    const account: Account = { id: String(seedId++), createdAt: today(), ...payload }
    accounts = [account, ...accounts]
    return delay({ ...account })
  },

  updateAccount(id: string, payload: AccountPayload): Promise<Account> {
    accounts = accounts.map((account) =>
      account.id === id ? { ...account, ...payload } : account,
    )
    return delay({ ...accounts.find((account) => account.id === id)! })
  },

  removeAccount(id: string): Promise<void> {
    accounts = accounts.filter((account) => account.id !== id)
    return delay(undefined)
  },
}
