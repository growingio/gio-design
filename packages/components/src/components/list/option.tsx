import React, { useCallback, useRef } from 'react';
import classnames from 'classnames';
import Checkbox from '../checkbox';
import { OptionProps } from './interface';
import Tooltip from '../tooltip';
import './style/option.less';
import { noop } from 'lodash';

const SelectOption = (props: OptionProps) => {
  const {
    isSelected = false,
    className = '',
    isMultiple = false,
    allowDuplicate = false,
    disabled = false,
    style,
    hasGroupIcon,
    showGroupCheckBox,
    onSelect,
    option,
    getPopupContainer,
  } = props;

  const ref = useRef(null);
  const handleSelect = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (onSelect) {
        onSelect(option);
      }
    },
    [option]
  );

  const renderContent = () => (
    <div
      className={classnames('gio-select-option', className, {
        multiple: isMultiple,
        selected: isSelected,
        indented: hasGroupIcon,
        disabled,
      })}
      style={style}
      onClick={disabled ? undefined : handleSelect}
      title={props.title}
      ref={ref}
    >
      {showGroupCheckBox && <span style={{ width: 25 }} />}
      {isMultiple && !allowDuplicate && (
        <>
          <Checkbox checked={isSelected} disabled={disabled} onChange={noop} />
          <span style={{ width: 10 }} />
        </>
      )}
      {props.children}
    </div>
  );

  if (option.tooltip) {
    return (
      <Tooltip title={option.tooltip} placement="top" getTooltipContainer={getPopupContainer}>
        {renderContent()}
      </Tooltip>
    );
  }

  return renderContent();
};

export default SelectOption;
