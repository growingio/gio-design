import React from 'react';
import RcCollapse from 'rc-collapse';
import classnames from 'classnames';
import { RightFilled } from '@gio-design/icons';
import { usePrefixCls } from '@gio-design/utils';
import { cloneElement } from '../utils/reactNode';
import { CollapseProps, PanelProps } from './interface';
import WithRef from '../utils/withRef';
import { WithCommonProps } from '../utils/interfaces';

export const Collapse = WithRef<HTMLDivElement, WithCommonProps<CollapseProps>>((props: CollapseProps) => {
  const { destoryOnHide, disabled, children, dataTestId = 'collapse' } = props;
  const prefixCls = usePrefixCls('collapse');
  const renderExpandIcon = (panelProps: PanelProps = {}) => {
    const { expandIcon } = props;
    const icon = expandIcon ? expandIcon(panelProps) : <RightFilled />;
    return (
      <div className={classnames('collapse-arrow-bar', panelProps.isActive ? 'arrow-isRotate' : undefined)}>
        {cloneElement(icon, () => ({
          className: classnames((icon as any).props.className, `${prefixCls}-arrow`),
        }))}
      </div>
    );
  };
  return (
    <div className="gio-collapse-contain" data-testid={dataTestId}>
      <RcCollapse
        {...props}
        prefixCls={prefixCls}
        expandIcon={renderExpandIcon}
        destroyInactivePanel={destoryOnHide}
        collapsible={disabled ? 'disabled' : undefined}
      >
        {children}
      </RcCollapse>
    </div>
  );
});

Collapse.displayName = 'Collapse';

export default Collapse;
