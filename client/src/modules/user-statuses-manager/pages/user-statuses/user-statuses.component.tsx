import React, { useCallback, useMemo, useRef, useState } from 'react'
import { UserSearch } from '@/modules/user-statuses-manager/components/user-search'
import { Box, CircularProgress } from '@mui/material'
import { UserStatusCard } from '@/modules/user-statuses-manager/components/user-status-card'

import { styles } from './user-statuses.styles.ts'
import {
  useCreateStatusItem,
  useMutateStatusItem,
  userStatusItemsQueryKey,
  useUserStatusItems
} from '@/modules/user-statuses-manager/definitions/user-status-item'
import { UserStatus } from '@/modules/user-statuses-manager/definitions/user-status-item'
import { updateQueryItem } from '@/shared/providers/query-client/query-key-updaters.ts'
import { debounce } from '@/shared/libs/debounce.ts'

const UserStatusesPageComponent = () => {
  const { data: userStatusItems, isFetching } = useUserStatusItems()
  const { mutateAsync: updateUserStatus } = useMutateStatusItem()
  const { mutateAsync: createUserStatus, isPending: isPendingUserCreation } = useCreateStatusItem()

  const [selectedStatusFilter, setSelectedStatusFilter] = useState<UserStatus | undefined>()
  const [searchTerm, setSearchTerm] = useState('')

  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const handleChangeStatus = useCallback(
    async (id: number, userStatus: UserStatus) => {
      const employees = await updateUserStatus({
        status: userStatus,
        pathParameters: {
          id: id.toString()
        }
      })

      if (employees) {
        updateQueryItem(userStatusItemsQueryKey, employees)
      }
    },
    [updateUserStatus]
  )

  const handleClickCreate = useCallback(async () => {
    if (!searchTerm) {
      return
    }

    const employees = await createUserStatus({ name: searchTerm })

    if (employees) {
      updateQueryItem(userStatusItemsQueryKey, employees)
      if (searchInputRef.current) {
        searchInputRef.current.value = ''
        setSearchTerm('')
      }
    }
  }, [createUserStatus, searchTerm])

  const debouncedSetSearchTerm = useMemo(() => {
    return debounce(setSearchTerm, 500)
  }, [])

  const filteredUserStatusItems = useMemo(() => {
    if (!userStatusItems) {
      return []
    }

    if (selectedStatusFilter || searchTerm) {
      return userStatusItems.filter((userStatusItem) => {
        const hasSearchTerm =
          !searchTerm.length || userStatusItem.name.toLowerCase().includes(searchTerm.toLowerCase())

        const hasStatus = !selectedStatusFilter || userStatusItem.status === selectedStatusFilter

        return hasSearchTerm && hasStatus
      })
    }

    return userStatusItems
  }, [selectedStatusFilter, userStatusItems, searchTerm])

  if (isFetching) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={styles.container}>
      <UserSearch
        searchInputRef={searchInputRef}
        isCreateButtonDisabled={isPendingUserCreation || !searchTerm.length}
        onClickCreate={handleClickCreate}
        onChangeSearchTerm={debouncedSetSearchTerm}
        selectedStatusFilter={selectedStatusFilter}
        onStatusFilterChange={setSelectedStatusFilter}
      />
      <Box sx={styles.statusesContainer}>
        {filteredUserStatusItems.map((userStatusItem) => {
          return (
            <UserStatusCard
              id={userStatusItem.id}
              img={userStatusItem.img}
              selectedStatus={userStatusItem.status}
              name={userStatusItem.name}
              key={userStatusItem.id}
              onChangeSelect={handleChangeStatus}
            />
          )
        })}
      </Box>
    </Box>
  )
}

export const UserStatusesPage = React.memo(UserStatusesPageComponent)
