import React, { ChangeEvent, ReactNode } from 'react'
import { Box, Divider, SxProps, TextField, TextFieldProps } from '@mui/material'
import { styles } from './text-input.styles.ts'
import { ApplicationTheme } from '@/shared/theme'

interface TextInputProps extends Omit<TextFieldProps, 'slotProps' | 'onChange'> {
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  onChange: (text: string) => void
}

const TextInputComponent = ({
  variant,
  label,
  startAdornment,
  endAdornment,
  onChange,
  ...props
}: TextInputProps) => {
  const adornmentStyles: SxProps<ApplicationTheme> = [
    styles.adornment,
    (theme) => ({ color: theme.palette.grey['400'] })
  ]

  const onChangeTextField = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <TextField
      {...props}
      variant={variant}
      sx={styles.input}
      onChange={onChangeTextField}
      label={label}
      slotProps={{
        input: {
          startAdornment: <Box sx={adornmentStyles}>{startAdornment}</Box>,
          endAdornment: (
            <Box sx={[...adornmentStyles, styles.rightAdornment]}>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
              />
              {endAdornment}
            </Box>
          )
        }
      }}
    />
  )
}

export const TextInput = React.memo(TextInputComponent)
