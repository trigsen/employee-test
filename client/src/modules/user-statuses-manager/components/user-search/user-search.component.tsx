import React, { MutableRefObject } from 'react'

import { Button } from '@/shared/ui/button'
import { TextInput } from '@/shared/ui/text-input'
import { SelectInput } from '@/shared/ui/select-input'
import { Box } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

import { styles } from './user-search.styles.ts'
import { UserStatusOptions } from '@/modules/user-statuses-manager/constants/user-status-options.ts'
import { UserStatus } from '@/modules/user-statuses-manager/definitions/user-status-item'

interface UserSearchProps {
  onChangeSearchTerm: (text: string) => void
  selectedStatusFilter?: UserStatus
  onStatusFilterChange: (filter?: UserStatus) => void
  onClickCreate: () => void
  isCreateButtonDisabled: boolean
  searchInputRef: MutableRefObject<HTMLInputElement | null>
}

const UserSearchComponent = ({
  searchInputRef,
  onChangeSearchTerm,
  selectedStatusFilter,
  onStatusFilterChange,
  onClickCreate,
  isCreateButtonDisabled
}: UserSearchProps) => {
  return (
    <Box sx={styles.container}>
      <Button
        size="large"
        variant="contained"
        endIcon={<AddIcon />}
        onClick={onClickCreate}
        disabled={isCreateButtonDisabled}
      >
        Create
      </Button>
      <TextInput
        inputRef={searchInputRef}
        onChange={onChangeSearchTerm}
        startAdornment={<SearchIcon />}
        fullWidth
        placeholder="Type to search"
        endAdornment={
          <SelectInput
            placeholder="Filter by status"
            value={selectedStatusFilter}
            label="Filter by status"
            onChange={onStatusFilterChange}
            items={UserStatusOptions}
            canClear
          />
        }
      />
    </Box>
  )
}

export const UserSearch = React.memo(UserSearchComponent)
