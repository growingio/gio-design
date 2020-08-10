import * as React from 'react';
import { BaseInputProps } from './types';
import Button from '../button';
import { Close, Check } from '@gio-design/icons';

export const prefixCls = 'gio-input';

const iconStyle: React.CSSProperties = {
  width: '16px',
  height: '16px',
  verticalAlign: 'text-top',
};

const BaseInput: React.FC<BaseInputProps> = ({
  showOpt,
  errorMsg = '',
  label = '',
  wrapStyle,
  children,
  onOk,
  onCancel,
}) => {
  const showExpand = React.useMemo(() => !!errorMsg || showOpt, [errorMsg, showOpt]);

  const renderLabel = () => <div className={`${prefixCls}-label`}>{label}</div>;

  const renderExpand = () => (
    <div className={`${prefixCls}-expand`}>
      <div className={`${prefixCls}-expand-error`}>{errorMsg}</div>
      <div>
        {showOpt && (
          <Button
            type="secondary"
            icon={<Close color="#f21300" style={iconStyle} />}
            onClick={onCancel}
            style={{ marginRight: '4px' }}
          />
        )}
        {showOpt && (
          <Button
            type="secondary"
            icon={<Check color="#008a56" style={iconStyle} />}
            onClick={onOk}
            disabled={!!errorMsg}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className={prefixCls} style={wrapStyle}>
      {!!label && renderLabel()}
      {children}
      {showExpand && renderExpand()}
    </div>
  );
};

export default BaseInput;
