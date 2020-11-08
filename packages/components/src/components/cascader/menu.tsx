import React, { ReactElement, useState, useEffect } from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import MenuItem, { Props as MenuItemProps, NodeData } from './menu-item';

export interface Props extends Omit<MenuItemProps, 'dataSource'> {
  dataSource?: NodeData[];
  onRender?: (nodeData: NodeData) => ReactElement;
  open?: boolean;
  depth?: number;
}

const Menu: React.FC<Props> = (props) => {
  const {
    className,
    style,
    dataSource = [],
    value,
    open,
    depth = 0,
    parentsData = [],
    onTrigger: userOnTrigger,
    onSelect: userOnSelect,
    ...others
  } = props;
  // const [dataSource, setDataSource] = useState(originDataSource);
  const [canOpen, setCanOpen] = useState(open);
  const [triggered, setTriggered] = useState<NodeData>();
  const [offset, setOffset] = useState([0, 0]);
  const onTrigger = (nodeData: NodeData, event: React.MouseEvent | React.KeyboardEvent) => {
    const { offsetLeft, offsetTop } = event.currentTarget as HTMLElement;
    setOffset([offsetLeft, offsetTop]);
    setTriggered(nodeData);
    userOnTrigger?.(nodeData, event);
    setCanOpen(!isEmpty(nodeData.children));
  };
  const onSelect: MenuItemProps['onSelect'] = (nodeData, parents) => {
    userOnSelect?.(nodeData, parents);
    setCanOpen(false);
  };

  useEffect(() => {
    setCanOpen(open);
  }, [open]);

  let childMenu;
  if (canOpen && triggered && !isEmpty(triggered.children)) {
    const [left, top] = offset;
    childMenu = (
      <Menu
        {...props}
        depth={depth + 1}
        dataSource={triggered.children}
        parentsData={[triggered, ...parentsData]}
        style={{ transform: `translate(${left}px, ${top}px)`, ...style }}
      />
    );
  }

  if (isEmpty(dataSource)) {
    return null;
  }

  return (
    <>
      <div data-depth={depth} tabIndex={0} className={classNames('cascader-menu', className)} role="menu" style={style}>
        {dataSource.map((data) => (
          <MenuItem
            key={data.value}
            value={value}
            dataSource={data}
            onTrigger={onTrigger}
            onSelect={onSelect}
            parentsData={parentsData}
            {...others}
          />
        ))}
      </div>
      {childMenu}
    </>
  );
};

export default React.memo(Menu);
