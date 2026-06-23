export const STORAGE_KEYS = {
  TOKEN: 'mc_token',
  USER: 'mc_user',
} as const

export const RouteName = {
  LOGIN: 'login',
  ACCOUNTS: 'accounts',
} as const

export const RoutePath = {
  LOGIN: '/login',
  ACCOUNTS: '/accounts',
} as const

export const API_ENDPOINTS = {
  ACCOUNTS: '/accounts',
  ACCOUNT_DETAIL: (id: string) => `/account/${id}`,
  CREATE_ACCOUNT: '/create-account',
  UPDATE_ACCOUNT: (id: string) => `/update-account/${id}`,
  DELETE_ACCOUNT: (id: string) => `/delete-account/${id}`,
} as const

export const SEARCH_DEBOUNCE_MS = 300
