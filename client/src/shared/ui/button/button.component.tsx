import React from 'react'
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material'

const ButtonComponent = ({ children, ...props }: MuiButtonProps) => {
  return <MuiButton {...props}>{children}</MuiButton>
}

export const Button = React.memo(ButtonComponent)
