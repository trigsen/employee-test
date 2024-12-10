import { ApplicationTheme } from '@/shared/theme'

export const styles = {
  container: {
    background: (theme: ApplicationTheme) => theme.palette.grey['100'],
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  innerContent: {
    maxWidth: (theme: ApplicationTheme) => theme.breakpoints.values.xl,
    px: '20px',
    py: '12px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
} as const
