import * as React from 'react';
import { debounce } from 'lodash';

type UseEnterResult = {
  realTimeValue: string | number;
  handleOnChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
};

type UseEnter = (
  value: string | number,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
) => UseEnterResult;

const delay = 500;

const useEnter: UseEnter = (value, onChange) => {
  const [realTimeValue, setRealTimeValue] = React.useState(value);

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRealTimeValue(e.target.value);
    debounce(onChange, delay);
  };

  return {
    realTimeValue,
    handleOnChange,
  };
};

export default useEnter;
