import React from 'react';
import RcCollapse from 'rc-collapse';
import classnames from 'classnames';
import { RightFilled } from '@gio-design/icons';
import { cloneElement } from '../utils/reactNode';
import { CollapseProps, PanelProps } from './interface';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import CollapsePanel from './CollapsePanel';

interface CollapseInterface extends React.FC<CollapseProps> {
  Panel: typeof CollapsePanel;
}

export const Collapse: CollapseInterface = (props) => {
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
};
Collapse.Panel = CollapsePanel;

export default Collapse;
