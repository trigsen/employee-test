export const enum UserStatus {
  WORKING = 'Working',
  ON_VACATION = 'OnVacationser',
  LUNCH_TIME = 'LunchTime',
  BUSINESS_TRIP = 'BusinessTrip'
}

export interface UserStatusItemDefinition {
  id: number
  name: string
  status: UserStatus
  img: string
}
