import React from 'react';
import Input from './Input';
import { toInputDate } from '../../utils/dateUtils';

const DatePicker = React.forwardRef(({
  label,
  error,
  helperText,
  required,
  value,
  onChange,
  min,
  max,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  return (
    <Input
      ref={ref}
      type="date"
      label={label}
      error={error}
      helperText={helperText}
      required={required}
      value={value ? toInputDate(value) : ''}
      onChange={onChange}
      min={min}
      max={max}
      className={className}
      containerClassName={containerClassName}
      {...props}
    />
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
