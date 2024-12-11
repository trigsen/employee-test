import { ApplicationTheme } from '@/shared/theme'

export const styles = {
  container: (theme: ApplicationTheme) => ({
    display: 'flex',
    gap: '8px',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row'
    }
  })
} as const
