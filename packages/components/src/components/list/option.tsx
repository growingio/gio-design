import React, { useCallback, useRef } from 'react';
import classnames from 'classnames';
import { noop } from 'lodash';
import Checkbox from '../checkbox';
import { OptionProps } from './interface';
import Tooltip from '../tooltip';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import './style/option.less';

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
    onClick,
    option,
    getPopupContainer,
  } = props;

  const prefixCls = usePrefixCls('select');
  const ref = useRef(null);
  const handleSelect = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
      if (onSelect) {
        onSelect(option);
      }
      if (onClick) {
        onClick(option);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [option]
  );

  const renderContent = () => (
    <div
      className={classnames(`${prefixCls}-option`, className, {
        multiple: isMultiple,
        selected: isSelected,
        indented: hasGroupIcon,
        disabled,
      })}
      style={style}
      onClick={disabled ? undefined : handleSelect}
      title={props.title}
      ref={ref}
      aria-hidden="true"
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
