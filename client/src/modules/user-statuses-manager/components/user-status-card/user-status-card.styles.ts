import { ApplicationTheme } from '@/shared/theme'

export const styles = {
  card: {
    maxWidth: '420px',
    width: '100%',
    ':hover': (theme: ApplicationTheme) => ({
      boxShadow: `0px 0px 15px -5px ${theme.palette.primary.main}`
    })
  },
  cardContent: { display: 'flex', justifyContent: 'space-between' },
  image: {
    maxWidth: '200px',
    maxHeight: '200px',
    width: '100%',
    height: '100%',
    aspectRatio: '1',
    borderRadius: '50%'
  },
  cardInfo: { display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '8px' },
  select: { minWidth: '180px' },
  selectAdornment: { marginRight: '10px', marginBottom: '3px', width: '15px', height: '15px' }
} as const
