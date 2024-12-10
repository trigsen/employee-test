import { IconButton, MenuItem, Select, SelectProps } from '@mui/material'
import { memo } from 'react'
import { SelectChangeEvent } from '@mui/material/Select/SelectInput'
import { Clear } from '@mui/icons-material'

import { styles } from './select-input.styles'

export interface SelectOption<VALUE extends string> {
  label: string
  value: VALUE
}

export interface SelectInputProps<VALUE extends string>
  extends Omit<SelectProps<VALUE>, 'onChange'> {
  items: readonly SelectOption<VALUE>[]
  onChange: (value?: VALUE) => void
  value?: VALUE
  placeholder?: string
  canClear?: boolean
}

const SelectInputComponent = <VALUE extends string>({
  items,
  onChange,
  label,
  value,
  canClear = false,
  placeholder = '',
  ...props
}: SelectInputProps<VALUE>) => {
  const handleChange = (event: SelectChangeEvent<VALUE>) => {
    onChange(event.target.value as VALUE)
  }

  const handleClear = () => {
    onChange(undefined)
  }

  const renderValue = (selectedValue?: VALUE) => {
    if (!selectedValue && !value) {
      return placeholder
    }

    return items.find((option) => option.value === selectedValue)!.label
  }

  return (
    <Select
      {...props}
      label={label}
      onChange={handleChange}
      value={value ?? ''}
      renderValue={renderValue}
      displayEmpty
      endAdornment={
        value &&
        canClear && (
          <IconButton
            sx={styles.clearButton}
            onClick={handleClear}
          >
            <Clear />
          </IconButton>
        )
      }
    >
      {items.map((item) => {
        return (
          <MenuItem
            key={item.value}
            value={item.value}
          >
            {item.label}
          </MenuItem>
        )
      })}
    </Select>
  )
}

export const SelectInput = memo(SelectInputComponent) as typeof SelectInputComponent
