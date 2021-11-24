import React from 'react'
import RcCollapse from 'rc-collapse'
import toArray from 'rc-util/lib/Children/toArray';
import { omit } from 'lodash'
import classnames from 'classnames';
import { RightFilled } from '@gio-design/icons'
import { cloneElement } from '../utils/reactNode';
import { CollapseProps, PanelProps } from './interface'
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import CollapsePanel from './CollapsePanel';

interface CollapseInterface extends React.FC<CollapseProps> {
  Panel: typeof CollapsePanel;
}

const Collapse: CollapseInterface = props => {
  const prefixCls = usePrefixCls('collapse-new');
  const renderExpandIcon = (panelProps: PanelProps = {}) => {
    const { expandIcon } = props;
    const icon = (
      expandIcon ? (
        expandIcon(panelProps)
      ) : (
        <RightFilled />
      )
    ) as React.ReactNode;
    return (
      <div className={(panelProps.isActive ? 'arrow-isRotate' : undefined)}>
        {cloneElement(icon, () => ({
          className: classnames((icon as any).props.className, `${prefixCls}-arrow`),
        }))}
      </div>
    );
  };
  const getItems = () => {
    const { children } = props;
    return toArray(children).map((child: React.ReactElement, index: number) => {
      if (child.props?.disabled) {
        const key = child.key || String(index);
        const { disabled, collapsible } = child.props;
        const childProps: CollapseProps & { key: React.Key } = {
          ...omit(child.props, ['disabled']),
          key,
          collapsible: collapsible ?? (disabled ? 'disabled' : undefined),
        };
        return cloneElement(child, childProps);
      }
      return child;
    });
  }
  return (
    <RcCollapse
      {...props}
      prefixCls={prefixCls} expandIcon={renderExpandIcon}
    >
      {getItems()}
    </RcCollapse >
  )
}
Collapse.Panel = CollapsePanel

export default Collapse;
