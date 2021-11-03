import classNames from 'classnames';
import React, { DOMAttributes } from 'react';
import { isEmpty, isString } from 'lodash';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { PREFIX } from '../constants';
import { BaseItemProps } from '../interfance';
import Checkbox from '../../checkbox/Checkbox';
import Tooltip from '../../legacy/tooltip';
import WithRef from '../../utils/withRef';

const BaseItem: React.ForwardRefRenderFunction<HTMLLIElement, BaseItemProps & DOMAttributes<HTMLLIElement>> = (
  props,
  ref?
) => {
  const {
    label,
    value,
    className,
    style,
    prefix,
    suffix,
    children,
    disabled,
    selected,
    disabledTooltip,
    isMultiple,
    ...rest
  } = props;

  const prefixCls = `${usePrefixCls(PREFIX)}--item`;

  const context = children ?? label;
  const prefixIcon = prefix ? <span className={`${prefixCls}-prefix-icon`}>{prefix}</span> : undefined;
  const suffixIcon = suffix ? <span className={`${prefixCls}-suffix-icon`}>{suffix}</span> : undefined;

  return (
    <Tooltip disabled={!(disabled && !isEmpty(disabledTooltip))} title={disabledTooltip}>
      <li
        style={style}
        className={classNames(
          className,
          prefixCls,
          {
            [`${prefixCls}--disabled`]: disabled,
            [`${prefixCls}--actived`]: selected,
            [`${prefixCls}--multiple`]: isMultiple,
          },
          className
        )}
        key={value}
        aria-hidden="true"
        ref={ref}
        {...rest}
      >
        {isMultiple && <Checkbox className={`${prefixCls}--checkbox`} checked={selected} disabled={disabled} />}
        {isString(context) ? (
          <>
            {prefixIcon}
            <span className={classNames(`${prefixCls}--text`, `${prefixCls}--ellipsis`)} title={context}>
              {context}
            </span>
            {suffixIcon}
          </>
        ) : (
          <>{context}</>
        )}
      </li>
    </Tooltip>
  );
};

export default WithRef(BaseItem);
