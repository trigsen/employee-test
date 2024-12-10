import { SelectOption } from '@/shared/ui/select-input'
import { UserStatus } from '@/modules/common/definitions/user-status'

export const UserStatusOptions: SelectOption<UserStatus>[] = [
  {
    value: UserStatus.ON_VACATION,
    label: 'On Vacation'
  },
  {
    value: UserStatus.BUSINESS_TRIP,
    label: 'Business Trip'
  },
  {
    value: UserStatus.LUNCH_TIME,
    label: 'Lunch Time'
  },
  {
    value: UserStatus.WORKING,
    label: 'Working'
  }
]
