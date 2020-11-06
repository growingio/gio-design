import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import find from 'lodash/find';

import { defineMenuPaths } from './helper';
import MenuItem, { Props as MenuItemProps, NodeData } from './menu-item';

export type Value = string | number;

export interface Props extends Omit<MenuItemProps, 'dataSource'> {
  dataSource?: NodeData[];
  onRender?: (nodeData: NodeData) => ReactElement;
}

const Menu: React.FC<Props> = (props) => {
  const {
    className,
    style,
    dataSource = [],
    onRender,
    trigger,
    value,
    onTrigger: userOnTrigger,
    onSelect: userOnSelect,
    ...others
  } = props;
  // const [dataSource, setDataSource] = useState(originDataSource);
  const [selected, setSelected] = useState<Value>();
  const [childNodeData, setChildNodeData] = useState<NodeData[] | undefined>();
  const [offset, setOffset] = useState([0, 0]);
  const onTrigger = (nodeData: NodeData, event: React.MouseEvent | React.KeyboardEvent) => {
    const { offsetLeft, offsetTop } = event.currentTarget as HTMLElement;
    setOffset([offsetLeft, offsetTop]);
    setSelected(nodeData.value);
    userOnTrigger?.(nodeData, event);
  };
  const onSelect = (nodeData: NodeData) => {
    setSelected('');
    userOnSelect?.(nodeData);
  };

  useMemo(() => {
    defineMenuPaths(dataSource);
  }, [dataSource]);

  useEffect(() => {
    const { children } = find(dataSource, (d) => d.value === selected) || {};
    setChildNodeData(children);
  }, [selected, dataSource]);

  let childMenu;
  if (Array.isArray(childNodeData) && childNodeData.length) {
    const [left, top] = offset;
    childMenu = (
      <Menu {...props} dataSource={childNodeData} style={{ transform: `translate(${left}px, ${top}px)`, ...style }} />
    );
  }

  if (!(Array.isArray(dataSource) && dataSource.length)) {
    return null;
  }

  return (
    <>
      <div tabIndex={0} className={classNames('cascader-menu', className)} role="menu" style={style}>
        {dataSource.map((data) => (
          <MenuItem
            key={data.value}
            value={value}
            dataSource={data}
            trigger={trigger}
            onRender={onRender}
            onTrigger={onTrigger}
            onSelect={onSelect}
            {...others}
          />
        ))}
      </div>
      {childMenu}
    </>
  );
};

export default Menu;

export { NodeData };
