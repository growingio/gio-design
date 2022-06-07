import React from 'react';
import RcCollapse from 'rc-collapse';
import classnames from 'classnames';
import { RightFilled } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import { get } from 'lodash';
import { cloneElement } from '../utils/reactNode';
import { CollapseProps, PanelProps } from './interface';
import WithRef from '../utils/withRef';
import { WithCommonProps } from '../utils/interfaces';

export const Collapse = WithRef<HTMLDivElement, WithCommonProps<CollapseProps>>((props, ref) => {
  const {
    destroyOnHide,
    disabled,
    children,
    dataTestId: legacyDataTestId,
    'data-testid': dataTestId = 'collapse',
    bordered = true,
    className,
    expandIcon,
    ...otherProps
  } = props;
  const prefixCls = usePrefixCls('collapse');
  const renderExpandIcon = (panelProps: PanelProps) => {
    const icon = expandIcon ? expandIcon(panelProps) : <RightFilled />;
    return (
      <div className={classnames('collapse-arrow-bar', panelProps?.isActive ? 'arrow-isRotate' : undefined)}>
        {cloneElement(icon, () => ({
          className: classnames(get(icon, 'props.className'), `${prefixCls}-arrow`),
        }))}
      </div>
    );
  };
  return (
    <div className={`${prefixCls}-contain`} data-testid={legacyDataTestId || dataTestId} ref={ref}>
      <RcCollapse
        prefixCls={prefixCls}
        expandIcon={renderExpandIcon}
        destroyInactivePanel={destroyOnHide}
        collapsible={disabled ? 'disabled' : undefined}
        className={classnames(className, {
          [`${prefixCls}-bordered`]: bordered,
        })}
        {...otherProps}
      >
        {children}
      </RcCollapse>
    </div>
  );
});

Collapse.displayName = 'Collapse';

export default Collapse;
