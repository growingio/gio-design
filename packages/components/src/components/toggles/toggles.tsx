import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { TogglesProps } from './interface';

const Toggles: React.FC<TogglesProps> = (props) => {
  const {
    activeColor,
    inactiveValue = false,
    inactiveColor,
    activeValue = true,
    defaultChecked = false,
    checked = false,
    disabled,
    className,
    suffixContent,
  } = props;
  const prefixCls = usePrefixCls('toggles');

  const inactiveValues = inactiveValue;
  const activeValues = activeValue;

  const [status, setStatus] = useState(defaultChecked);

  useEffect(() => {
    setStatus(checked)
  }, [checked])

  const changeStatus = () => {
    if (!disabled) {
      setStatus(!status);
      props.onChange && props.onChange(status ? inactiveValues : activeValues);
      props.onClick && props.onClick(status ? inactiveValues : activeValues);
    }
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
