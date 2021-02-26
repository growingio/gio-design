import React, { useState } from 'react';
import { debounce } from 'lodash';
import moment, { Moment } from 'moment';
import { DatePickerProps } from '../interface';

const useDatePicker = (props: DatePickerProps) => {
  const { value, onChange, showFooter } = props;
  const [open, setOpen] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const [inputTime, setInputTime] = useState('');

  const onConfirm = () => {
    setOpen(false);
    setLocalValue(localValue);
    setInputTime('');
    onChange(localValue);
  };

  const onCancel = () => {
    setOpen(false);
    setLocalValue(value);
    setInputTime('');
    onChange(value);
  };

  const onblur = () => {
    showFooter && onCancel();
    !showFooter && setOpen(false);
  };

  const localSelect = (values: Moment): void => {
    if (!props.showFooter) {
      setLocalValue(values);
      setOpen(false);
    }
  };

  const localChange = (values: Moment): void => {
    setLocalValue(values);
  };

  const debounceTimeChange = debounce((e: string): void => {
    const values = moment(e, props.format);
    if (values.isValid()) {
      setLocalValue(values);
    } else {
      setLocalValue(localValue);
    }
  }, 1000);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // e.persist();
    setInputTime(e.target.value);
    debounceTimeChange(e.target.value);
  };

  const handleInputClick = () => setOpen(true);

  return {
    footerFiled: {
      onCancel,
      onConfirm,
    },
    inputField: {
      inputTime,
      handleInputChange,
      handleInputClick,
      debounceTimeChange,
    },
    panelField: {
      localValue,
      open,
      onblur,
      onSelect: localSelect,
      onChange: localChange,
    },
  };
};

export default useDatePicker;
