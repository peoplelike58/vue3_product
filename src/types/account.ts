import type { AccountStatus, RoleLevel } from './enums'

export interface Account {
  id: string
  name: string
  email: string
  roleLevel: RoleLevel
  status: AccountStatus
  createdAt?: string
}

export interface AccountPayload {
  name: string
  email: string
  roleLevel: RoleLevel
  status: AccountStatus
}

export interface AccountStats {
  total: number
  active: number
  inactive: number
}
