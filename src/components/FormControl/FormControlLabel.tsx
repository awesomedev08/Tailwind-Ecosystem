/*
 * Copyright (c) DD360 and its affiliates.
 */

import { cloneElement } from 'react'
import { composeClasses } from 'lib/classes'

interface Props extends React.HTMLAttributes<HTMLLabelElement> {
  label: string
  control: JSX.Element
  labelPlacement?: 'start' | 'top' | 'bottom' | 'end'
  disabled?: boolean
}

export const directionLabel = {
  start: 'flex-row-reverse',
  top: 'flex-col-reverse',
  bottom: 'flex-col',
  end: 'flex-row'
}

function FormControlLabel({
  label,
  control,
  labelPlacement = 'start',
  disabled,
  style,
  className,
  ...props
}: Props) {
  return (
    <label
      {...props}
      style={{ color: disabled ? 'rgba(0, 0, 0, 0.38)' : undefined, ...style }}
      className={composeClasses(
        'inline-flex mx-4 items-center align-middle cursor-pointer',
        directionLabel[labelPlacement],
        className
      )}
    >
      {cloneElement(
        control,
        Object.assign(disabled ? { disabled } : {}, { ...control.props }),
        null
      )}
      <span>{label}</span>
    </label>
  )
}

export default FormControlLabel
