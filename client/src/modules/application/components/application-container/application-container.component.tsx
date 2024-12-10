import React from 'react'
import { Header } from '@/modules/application/header'
import { UserStatusesPage } from '@/modules/user-statuses-manager/pages/user-statuses'
import { Box, ThemeProvider } from '@mui/material'
import { theme } from '@/shared/theme'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/shared/providers/query-client/query-client.ts'

import { styles } from './application-container.styles.ts'

const ApplicationContainerComponent = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Box sx={styles.container}>
          <Header />
          <Box sx={styles.innerContainer}>
            <UserStatusesPage />
          </Box>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export const ApplicationContainer = React.memo(ApplicationContainerComponent)
