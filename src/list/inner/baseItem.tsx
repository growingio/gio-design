import classNames from 'classnames';
import React, { DOMAttributes, ReactElement } from 'react';
import { isEmpty, isString, noop } from 'lodash';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import { PREFIX } from '../constants';
import { BaseItemProps } from '../interfance';
import Tooltip from '../../tooltip';
import WithRef from '../../utils/withRef';

const defaultContentRender = (element: React.ReactNode | Element): React.ReactElement => element as React.ReactElement;
const renderIcon = (className: string, prefix: React.ReactNode) => <span className={className}>{prefix}</span>;
const BaseItem = WithRef<HTMLLIElement, BaseItemProps & Omit<DOMAttributes<HTMLLIElement>, 'onClick'>>(
  (props, ref?) => {
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
      wrapper = defaultContentRender,
    } = props;

    const prefixCls = `${usePrefixCls(PREFIX)}--item`;

    const content = children ?? label;
    const prefixIcon = prefix ? renderIcon(`${prefixCls}-prefix-icon`, prefix) : undefined;
    const suffixIcon = suffix ? renderIcon(`${prefixCls}-suffix-icon`, suffix) : undefined;

    const contentElement = isString(content) ? (
      <>
        {prefixIcon}
        <span className={classNames(`${prefixCls}--text`, `${prefixCls}--ellipsis`)} title={content?.toString()}>
          {content}
        </span>
        {suffixIcon}
      </>
    ) : (
      <>{content}</>
    );
    const renderElement = (
      <Tooltip
        disabled={!disabled || isEmpty(disabledTooltip)}
        strategy="fixed"
        title={disabledTooltip}
        getContainer={() => document.body}
      >
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
          onClick={() => (!disabled ? onClick?.(value) : noop)}
        >
          {contentRender?.(contentElement)}
        </li>
      </Tooltip>
    );

    return wrapper(renderElement) as ReactElement;
  }
);

export default BaseItem;
