import React from 'react'
import { Button } from '@/shared/ui/button'
import { Box, Typography } from '@mui/material'

import { styles } from './header.styles.ts'

const HeaderComponent = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerContent}>
        <Typography
          variant="h4"
          color="primary"
        >
          Employees
        </Typography>
        <Button
          size="small"
          variant="outlined"
        >
          Log Out
        </Button>
      </Box>
    </Box>
  )
}

export const Header = React.memo(HeaderComponent)
