/*
 * Copyright (c) DD360 and its affiliates.
 */

import DatePicker, { DatePickerProps } from './DatePicker'
import { Portal } from '../../common/Portal'

const DatePickerWithPortal = ({ ...props }: DatePickerProps) => {
  return (
    <Portal>
      <DatePicker {...props} />
    </Portal>
  )
}

export default DatePickerWithPortal
