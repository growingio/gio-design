import React, { useState } from 'react';
import classnames from 'classnames';

interface SwitchProps {
  // autoFocus?: boolean;
  // checked?: boolean;
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

const Switch: React.FC<SwitchProps> = (props) => {
  const activeColor = props.activeColor ? props.activeColor : null;
  const inactiveColor = props.inactiveColor ? props.inactiveColor : null;

  const inactiveValue = props.inactiveValue ? props.inactiveValue : false;
  const activeValue = props.activeValue ? props.activeValue : true;

  const [status, setStatus] = useState(props.defaultChecked || false);

  const changeStatus = () => {
    !props.disabled && setStatus(!status);
    props.onChange && props.onChange(status ? inactiveValue : activeValue);
    props.onClick && props.onClick(status ? inactiveValue : activeValue);
  };

  return (
    <div>
      <div
        className={classnames(
          'gio-switch',
          { 'gio-switch-checked': status },
          { 'gio-switch-disabled': props.disabled },
          props.className
        )}
        style={{ background: status ? activeColor : inactiveColor, borderColor: activeColor }}
        onClick={changeStatus}
      >
        <div className='gio-switch-handle' style={{ background: status ? inactiveColor : activeColor }} />
      </div>
      {props.suffixContent && <span className='suffixContent'>{status ? '开' : '关'}</span>}
    </div>
  );
};

export default Switch;
