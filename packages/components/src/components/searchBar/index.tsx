import * as React from 'react';
import Input from '../input';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { CloseCircleFilled, Search } from '@gio-design/icons';

export const prefixCls = 'gio-searchbar';

export interface SearchBarProps {
  showStorage?: boolean;
  storageNum?: number;
  allowClearStorage?: boolean;
  showClear?: boolean;
  disabled?: boolean;
  size?: 'large' | 'medium' | 'small';
  inputStyle?: React.CSSProperties;
  inputWrapStyle?: React.CSSProperties;
  wrapStyle?: React.CSSProperties;

  value: string;
  onChange: (value: string) => void;
  id: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  showStorage = false,
  storageNum = 5,
  allowClearStorage = false,
  showClear = false,
  disabled = false,
  size = 'medium',
  inputStyle,
  inputWrapStyle,
  wrapStyle,

  value,
  onChange,
  id,
}) => {
  const renderSuffix = () => {
    if (value) {
      return showClear ? <CloseCircleFilled /> : null;
    }
    return <Search />;
  };

  const renderStorage = () => {
    if (!showStorage) {
      return null;
    }

    return <div>123</div>;
  };

  return (
    <div className={prefixCls} style={wrapStyle}>
      <Input
        disabled={disabled}
        size={size}
        inputStyle={inputStyle}
        wrapStyle={inputWrapStyle}
        suffix={renderSuffix()}
        value={value}
        onChange={onChange as any}
      />
      {renderStorage()}
    </div>
  );
};

export default SearchBar;
