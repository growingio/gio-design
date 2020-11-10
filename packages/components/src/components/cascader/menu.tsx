import React, { ReactElement, useRef, useState } from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { toInt, useDynamicData, withPrefix } from './helper';
import MenuItem, { Props as MenuItemProps, NodeData } from './menu-item';

export interface Props extends Omit<MenuItemProps, 'dataSource'> {
  dataSource?: NodeData[];
  onRender?: (nodeData: NodeData) => ReactElement;
  open?: boolean;
  depth?: number;
  header?: React.ReactElement | false;
  footer?: React.ReactElement | false;
}

const Menu: React.FC<Props> = (props) => {
  const {
    className,
    style,
    dataSource: originDataSource = [],
    value,
    open,
    depth = 0,
    parentsData = [],
    onTrigger: userOnTrigger,
    onSelect: userOnSelect,
    header,
    footer,
    ...others
  } = props;
  const [dataSource, setDataSource] = useDynamicData(originDataSource);
  const wrapRef = useRef(null);
  const withWrapperCls = withPrefix('cascader-menu');
  const [canOpen, setCanOpen] = useDynamicData(open);
  const [triggerData, setTriggerData] = useState<NodeData>();
  const [offset, setOffset] = useState([0, 0]);
  const onTrigger = (event: React.MouseEvent | React.KeyboardEvent, nodeData: NodeData) => {
    const menu = event.currentTarget.closest('.cascader-menu');
    const { paddingLeft, paddingTop } = getComputedStyle(menu);
    const { offsetLeft, offsetTop } = event.currentTarget as HTMLElement;
    setOffset([offsetLeft - toInt(paddingLeft), offsetTop - toInt(paddingTop)]);
    setTriggerData(nodeData);
    userOnTrigger?.(event, nodeData);
    setCanOpen(!isEmpty(nodeData.children));

    const nextData = dataSource.map((d) => {
      if (d.value === nodeData.value) {
        return nodeData;
      }
      return d;
    });
    setDataSource(nextData);
  };
  const onSelect: MenuItemProps['onSelect'] = (nodeData, parents) => {
    userOnSelect?.(nodeData, parents);
    setCanOpen(false);
  };

  let childMenu;
  if (canOpen && triggerData && !isEmpty(triggerData.children)) {
    const [left, top] = offset;
    const { top: sTop = 0, left: sLeft = 0 } = style || {};
    childMenu = (
      <Menu
        {...props}
        depth={depth + 1}
        dataSource={triggerData.children}
        parentsData={[triggerData, ...parentsData]}
        style={{ ...style, top: top + toInt(sTop), left: left + toInt(sLeft) }}
      />
    );
  }

  if (isEmpty(dataSource)) {
    return null;
  }

  return (
    <>
      <div
        data-depth={depth}
        className={classNames(className, withWrapperCls())}
        role="menu"
        style={style}
        ref={wrapRef}
      >
        {depth === 0 && <div className={withWrapperCls('header')}>{header}</div>}
        <div className={withWrapperCls('body')}>
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
        {depth === 0 && <div className={withWrapperCls('footer')}>{footer}</div>}
      </div>
      {childMenu}
    </>
  );
};

export default React.memo(Menu);
