import React, { useState } from 'react';
import classnames from 'classnames';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

interface TogglesProps {
  suffixContent?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  size?: string;
  onChange?: any;
  onClick?: any;
  className?: string;
  inactiveValue?: number | string;
  activeValue?: number | string;
  activeColor?: string;
  inactiveColor?: string;
}

const Toggles: React.FC<TogglesProps> = (props) => {
  const {
    activeColor,
    inactiveValue,
    inactiveColor,
    activeValue,
    defaultChecked,
    disabled,
    className,
    suffixContent,
  } = props;
  const prefixCls = usePrefixCls('toggles');

  const inactiveValues = inactiveValue || false;
  const activeValues = activeValue || true;

  const [status, setStatus] = useState(defaultChecked || false);

  const changeStatus = () => {
    !props.disabled && setStatus(!status);
    props.onChange && props.onChange(status ? inactiveValues : activeValues);
    props.onClick && props.onClick(status ? inactiveValues : activeValues);
  };

  return (
    <div className={classnames({ [`${prefixCls}-disabled`]: disabled })}>
      <div
        className={classnames(prefixCls, { [`${prefixCls}-checked`]: status }, className)}
        style={{ background: status ? activeColor : inactiveColor, borderColor: activeColor }}
        onClick={changeStatus}
        aria-hidden="true"
      >
        <div
          className={classnames(`${prefixCls}-handle`)}
          style={{ background: status ? inactiveColor : activeColor }}
        />
      </div>
      {suffixContent && <span className={classnames(`${prefixCls}-suffixContent`)}>{status ? '开' : '关'}</span>}
    </div>
  );
};

export default Toggles;
