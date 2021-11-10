import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { modeType } from '../interface';

interface SearchInputProps {
  prefix: string;
  onInputChange: (value: string) => void;
  inputValue: string;
  mode: modeType;
  multiple?: boolean;
}

const SearchInput: React.ForwardRefRenderFunction<unknown, SearchInputProps> = (props, ref) => {
  const { prefix, inputValue, onInputChange: onChange, mode, multiple } = props;
  const inputWidthRef = useRef<HTMLDivElement>(null);
  const [inputWidth, setInputWidth] = useState(2);

  useEffect(() => {
    if (inputWidthRef.current) {
      setInputWidth(inputWidthRef.current?.getBoundingClientRect().width + 4);
    }
  }, [inputValue]);

  const onInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    if (inputValue) e.stopPropagation();
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onChange(e.target.value);
  };
  return (
    <>
      <div ref={inputWidthRef} className={classnames(`${prefix}-input-reference`, `${prefix}-item`)}>
        {inputValue}
      </div>
      <input
        ref={ref as any}
        style={{ width: inputWidth }}
        className={classnames(`${prefix}-input`, `${prefix}-item`, {
          [`${prefix}-input-tags`]: mode === 'tags' && multiple,
        })}
        type='text'
        value={inputValue}
        onChange={onInputChange}
        tabIndex={-1}
        // onKeyDown={onSelectionKeyDown}
        onClick={onInputClick}
      />
    </>
  );
};
const ForwardSearchInput = React.forwardRef(SearchInput);

export default ForwardSearchInput;
