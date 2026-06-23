export enum RoleLevel {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  USER = 'USER',
  CLIENT = 'CLIENT',
}

export enum AccountStatus {
  ON = 'ON',
  OFF = 'OFF',
}

export const ROLE_LEVEL_LABEL: Record<RoleLevel, string> = {
  [RoleLevel.ADMIN]: '管理員',
  [RoleLevel.EDITOR]: '編輯',
  [RoleLevel.USER]: '用戶',
  [RoleLevel.CLIENT]: '客戶',
}

export const ACCOUNT_STATUS_LABEL: Record<AccountStatus, string> = {
  [AccountStatus.ON]: '啟用',
  [AccountStatus.OFF]: '停用',
}

export const ROLE_LEVEL_OPTIONS = Object.values(RoleLevel).map((value) => ({
  value,
  label: ROLE_LEVEL_LABEL[value],
}))

export const ACCOUNT_STATUS_OPTIONS = Object.values(AccountStatus).map((value) => ({
  value,
  label: ACCOUNT_STATUS_LABEL[value],
}))
