import { ApplicationTheme } from '@/shared/theme'

export const styles = {
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  innerContainer: {
    paddingTop: '48px',
    maxWidth: (theme: ApplicationTheme) => theme.breakpoints.values.xl,
    width: '100%'
  }
} as const
