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
  const { activeColor, inactiveValue, inactiveColor, activeValue, defaultChecked, disabled, className, suffixContent  } = props;

  const inactiveValues = inactiveValue || false;
  const activeValues = activeValue || true;

  const [status, setStatus] = useState(defaultChecked || false);

  const changeStatus = () => {
    !props.disabled && setStatus(!status);
    props.onChange && props.onChange(status ? inactiveValues : activeValues);
    props.onClick && props.onClick(status ? inactiveValues : activeValues);
  };

  return (
    <div className={classnames({ 'gio-toggles-disabled': disabled })}>
      <div
        className={classnames('gio-toggles', { 'gio-toggles-checked': status }, className)}
        style={{ background: status ? activeColor : inactiveColor, borderColor: activeColor }}
        onClick={changeStatus}
        aria-hidden="true"
      >
        <div
          className={classnames('gio-toggles-handle')}
          style={{ background: status ? inactiveColor : activeColor }}
        />
      </div>
      {suffixContent && <span className={classnames('gio-toggles-suffixContent')}>{status ? '开' : '关'}</span>}
    </div>
  );
};

export default Toggles;
