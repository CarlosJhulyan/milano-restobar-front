export type User = {
  name?: string
  avatar?: string
  email?: string
  position?: string
  role?: string
  last_login?: string
  two_steps?: boolean
  joined_day?: string
  online?: boolean
  initials?: {
    label: string
    state: string
  }
}

export interface Role {
  id_cme_usuario?: string
  tipo_usuario?: string
  nombre?: string
}