import classNames from 'classnames';
import React, { DOMAttributes } from 'react';
import { isEmpty, isString } from 'lodash';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { PREFIX } from '../constants';
import { BaseItemProps } from '../interfance';
import Tooltip from '../../legacy/tooltip';
import WithRef from '../../utils/withRef';

const defaultContentRender = (element: React.ReactNode | Element) => element;

const BaseItem: React.ForwardRefRenderFunction<
  HTMLLIElement,
  BaseItemProps & Omit<DOMAttributes<HTMLLIElement>, 'onClick'>
> = (props, ref?) => {
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
    onClick,
    contentRender = defaultContentRender,
    ...rest
  } = props;

  const prefixCls = `${usePrefixCls(PREFIX)}--item`;

  const content = children ?? label;
  const prefixIcon = prefix ? <span className={`${prefixCls}-prefix-icon`}>{prefix}</span> : undefined;
  const suffixIcon = suffix ? <span className={`${prefixCls}-suffix-icon`}>{suffix}</span> : undefined;
  const contentElement = isString(content) ? (
    <>
      {prefixIcon}
      <span className={classNames(`${prefixCls}--text`, `${prefixCls}--ellipsis`)} title={content}>
        {content}
      </span>
      {suffixIcon}
    </>
  ) : (
    <>{content}</>
  );
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
          },
          className
        )}
        key={value}
        aria-hidden="true"
        ref={ref}
        {...rest}
        onClick={() => onClick?.(value)}
      >
        {contentRender?.(contentElement)}
      </li>
    </Tooltip>
  );
};

export default WithRef(BaseItem);
