import React, { useState, useEffect, useRef } from 'react';
import moment, { Moment } from 'moment';
import { DateRangePickerProps } from '../interface';

const useDateRangePicker = (props: DateRangePickerProps) => {
  const { value, onChange, showFooter } = props;
  const [open, setOpen] = useState(false);
  const [timeRange, setTimeRange] = useState(value);
  const [leftInputTimeRange, setLeftInputTimeRange] = useState('');
  const [rightInputTimeRange, setRightInputTimeRange] = useState('');

  const calendarContainerRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectPanelRef = useRef<any>(null);

  useEffect(() => {
    setTimeRange(value);
  }, [value]);

  const localSelect = (values: Array<Moment>): void => {
    setTimeRange(values);
    !showFooter && setOpen(false);
  };

  const localChange = (values: Array<Moment>): void => {
    setTimeRange(values);
  };

  const debounceInputChange = (values: Moment, side: string): void => {
    if (values.isValid() && side === 'left' && values.isBefore(timeRange[1])) {
      setTimeRange([values, timeRange[1]]);
    } else if (values.isValid() && side === 'right' && values.isAfter(timeRange[0])) {
      setTimeRange([timeRange[0], values]);
    } else {
      setTimeRange(timeRange);
    }
  };

  const handleLeftInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLeftInputTimeRange(e.target.value);
    const values = moment(e.target.value, props.format);
    debounceInputChange(values, 'left');
  };

  const handleRightInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRightInputTimeRange(e.target.value);
    const values = moment(e.target.value, props.format);
    debounceInputChange(values, 'right');
  };

  const handleInputClick = () => setOpen(true);

  const onConfirm = () => {
    setOpen(false);
    setTimeRange(timeRange);
    setLeftInputTimeRange('');
    setRightInputTimeRange('');
    onChange(timeRange);
  };

  const onCancel = () => {
    setOpen(false);
    setTimeRange(value);
    setLeftInputTimeRange('');
    setRightInputTimeRange('');
    onChange(value);
  };

  const onBlur = (e: React.FocusEvent) => {
    if (!(selectPanelRef.current && selectPanelRef.current.contains(e.nativeEvent.relatedTarget))) {
      showFooter && onCancel();
      !showFooter && setOpen(false);
    }
  };

  return {
    footerField: {
      onConfirm,
      onCancel,
    },
    inputField: {
      leftInputTimeRange,
      rightInputTimeRange,
      handleLeftInputChange,
      handleRightInputChange,
      handleInputClick,
      debounceInputChange,
    },
    panelField: {
      open,
      timeRange,
      localSelect,
      localChange,
      localPanelChange: localChange,
      onBlur,
    },
    ref: {
      calendarContainerRef,
      selectPanelRef,
    },
  };
};

export default useDateRangePicker;
