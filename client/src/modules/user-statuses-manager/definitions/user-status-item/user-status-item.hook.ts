import {
  createItemMutationKey,
  createListQueryKey,
  useGetQuery,
  useMutateQuery
} from '@/shared/providers/query-client'
import { UserStatusItemDefinition } from '@/modules/user-statuses-manager/definitions/user-status-item/user-status-item.definition.ts'
import { UserStatus } from '@/modules/common/definitions/user-status'

export const userStatusItemsQueryKey = createListQueryKey<UserStatusItemDefinition[]>({
  base: 'users'
})

export const useUserStatusItems = () => {
  return useGetQuery('/users', {
    queryKey: userStatusItemsQueryKey
  })
}

const userStatusItemMutate = createItemMutationKey<
  UserStatusItemDefinition[],
  { status: UserStatus }
>({
  base: 'users',
  baseId: 'userId'
})

export const useMutateStatusItem = () => {
  return useMutateQuery('/users/:id', {
    method: 'post',
    mutationKey: userStatusItemMutate
  })
}

const createUserStatusItemMutateKey = createItemMutationKey<
  UserStatusItemDefinition[],
  { name: string }
>({
  base: 'users'
})

export const useCreateStatusItem = () => {
  return useMutateQuery('/users', {
    method: 'post',
    mutationKey: createUserStatusItemMutateKey
  })
}
