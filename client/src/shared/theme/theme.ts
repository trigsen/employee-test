import { createTheme } from '@mui/material'

const defaultTheme = createTheme()

export const theme = createTheme({
  palette: {
    ...defaultTheme.palette,
    primary: {
      ...defaultTheme.palette.primary,
      main: '#109cf1'
    },
    grey: {
      ...defaultTheme.palette.grey,
      600: '#78828e',
      400: '#aebacb',
      100: '#f5f6f8'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px'
        },
        sizeLarge: {
          height: '56px',
          paddingLeft: '36px',
          paddingRight: '36px'
        },
        sizeSmall: {
          paddingLeft: '18px',
          paddingRight: '18px'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          height: '56px',
          borderRadius: '5px'
        }
      }
    }
  }
})

export type ApplicationTheme = typeof theme
