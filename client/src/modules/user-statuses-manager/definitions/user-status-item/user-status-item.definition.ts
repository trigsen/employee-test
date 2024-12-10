import { UserStatus } from '@/modules/common/definitions/user-status'

export interface UserStatusItemDefinition {
  id: number
  name: string
  status: UserStatus
  img: string
}
