import React, { useState } from 'react';
import classnames from 'classnames';

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
  const { activeColor } = props;
  const { inactiveColor } = props;

  const inactiveValue = props.inactiveValue ? props.inactiveValue : false;
  const activeValue = props.activeValue ? props.activeValue : true;

  const [status, setStatus] = useState(props.defaultChecked || false);

  const changeStatus = () => {
    !props.disabled && setStatus(!status);
    props.onChange && props.onChange(status ? inactiveValue : activeValue);
    props.onClick && props.onClick(status ? inactiveValue : activeValue);
  };

  return (
    <div className={classnames({ 'gio-toggles-disabled': props.disabled })}>
      <div
        className={classnames('gio-toggles', { 'gio-toggles-checked': status }, props.className)}
        style={{ background: status ? activeColor : inactiveColor, borderColor: activeColor }}
        onClick={changeStatus}
      >
        <div
          className={classnames('gio-toggles-handle')}
          style={{ background: status ? inactiveColor : activeColor }}
        />
      </div>
      {props.suffixContent && <span className={classnames('gio-toggles-suffixContent')}>{status ? '开' : '关'}</span>}
    </div>
  );
};

export default Toggles;
