import * as React from 'react';
import { useDebounce } from 'react-use';

interface UseEnterResult {
  realTimeValue: string;
  handleOnChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
}

type UseEnter = (value: string | undefined, onChange: ((e: string) => void) | undefined) => UseEnterResult;

const delay = 500;

const useEnter: UseEnter = (value, onChange) => {
  const [realTimeValue, setRealTimeValue] = React.useState('');

  React.useEffect(() => {
    if (typeof value === 'string') {
      setRealTimeValue(value);
    }
  }, [value]);

  useDebounce(
    () => {
      onChange?.(realTimeValue);
    },
    delay,
    [realTimeValue]
  );

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRealTimeValue(e.target.value);
  };

  return {
    realTimeValue,
    handleOnChange,
  };
};

export default useEnter;
