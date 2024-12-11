import React, { useCallback, useState } from 'react'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { SelectInput } from '@/shared/ui/select-input'
import { UserStatus } from '@/modules/user-statuses-manager/definitions/user-status-item'
import { UserStatusOptions } from '@/modules/user-statuses-manager/constants/user-status-options.ts'
import { RadioButtonUnchecked } from '@mui/icons-material'

import { styles } from './user-status-card.styles'

interface UserStatusCardProps {
  id: number
  img: string
  name: string
  selectedStatus: UserStatus
  onChangeSelect: (id: number, status: UserStatus) => Promise<void>
}

const circleColorMap: Record<UserStatus, 'primary' | 'secondary' | 'error' | 'success'> = {
  [UserStatus.WORKING]: 'success',
  [UserStatus.ON_VACATION]: 'error',
  [UserStatus.LUNCH_TIME]: 'primary',
  [UserStatus.BUSINESS_TRIP]: 'secondary'
}

const UserStatusCardComponent = ({
  id,
  img,
  name,
  selectedStatus,
  onChangeSelect
}: UserStatusCardProps) => {
  const [isChangingStatus, setChangingStatus] = useState(false)

  const handleChangeSelect = useCallback(
    async (status?: UserStatus) => {
      if (!status) {
        return
      }

      setChangingStatus(true)
      await onChangeSelect(id, status)
      setChangingStatus(false)
    },
    [id, onChangeSelect]
  )

  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <Box
          component="img"
          sx={styles.image}
          alt="User"
          src={img}
        />
        <Box sx={styles.cardInfo}>
          <Typography
            fontSize={20}
            fontWeight="medium"
          >
            {name}
          </Typography>
          <SelectInput
            startAdornment={
              <RadioButtonUnchecked
                sx={styles.selectAdornment}
                color={circleColorMap[selectedStatus]}
              />
            }
            sx={styles.select}
            variant="standard"
            size="small"
            items={UserStatusOptions}
            onChange={handleChangeSelect}
            value={selectedStatus}
            disabled={isChangingStatus}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export const UserStatusCard = React.memo(UserStatusCardComponent)
