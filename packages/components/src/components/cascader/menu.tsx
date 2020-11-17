import React, { ReactElement, useRef, useState } from 'react';
import classNames from 'classnames';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';

import { dataFilter, makeSearchParttern, toInt, useDynamicData, dataKeyMapping, withPrefix } from './helper';
import MenuItem, { Props as MenuItemProps, NodeData } from './menu-item';

export interface Props extends Omit<MenuItemProps, 'dataSource' | 'hasChild'> {
  dataSource?: NodeData[];
  onRender?: (nodeData: NodeData) => ReactElement;
  open?: boolean;
  depth?: number;
  header?: React.ReactElement | false;
  footer?: React.ReactElement | false;
  offsetLeft?: number;
  offsetTop?: number;
}

const Menu: React.FC<Props> = (props) => {
  const {
    className,
    style,
    dataSource: originDataSource = [],
    value,
    keyMapping = {},
    open,
    depth = 0,
    keyword,
    ignoreCase,
    deepSearch = false,
    parentsData = [],
    onTrigger: userOnTrigger,
    onSelect: userOnSelect,
    header,
    footer,
    offsetLeft: userOffsetLeft = 5,
    offsetTop: userOffsetTop = 0,
    ...others
  } = props;
  const isRootMenu = depth === 0;
  const [dataSource, setDataSource] = useDynamicData(originDataSource);
  const wrapRef = useRef(null);
  const withWrapperCls = withPrefix('cascader-menu');
  const [canOpen, setCanOpen] = useDynamicData(open);
  const [triggerData, setTriggerData] = useState<NodeData>();
  const [offset, setOffset] = useState([0, 0]);
  const onTrigger = (event: React.MouseEvent | React.KeyboardEvent, nodeData: NodeData) => {
    const menu = event.currentTarget.closest('.cascader-menu');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { width, paddingLeft, paddingTop } = getComputedStyle(menu!);
    const { offsetLeft = 0, offsetTop = 0 } = (event.currentTarget || {}) as HTMLElement;
    setOffset([toInt(width) + offsetLeft - toInt(paddingLeft), offsetTop - toInt(paddingTop)]);
    // setTriggerData(undefined);
    setTriggerData(nodeData);
    userOnTrigger?.(event, nodeData);
    setCanOpen(!isEmpty(nodeData.children));

    const nextData = dataSource.map((d) => {
      if (d.value === dataKeyMapping(nodeData, keyMapping).value) {
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
        open={false}
        dataSource={triggerData.children}
        parentsData={[triggerData, ...parentsData]}
        style={{ ...style, top: userOffsetTop + top + toInt(sTop), left: userOffsetLeft + left + toInt(sLeft) }}
      />
    );
  }

  const filteredDataSource = (() => {
    if (!keyword) {
      return dataSource;
    }

    const searchParttern = makeSearchParttern(keyword, ignoreCase);
    return dataFilter(dataSource, searchParttern, deepSearch, keyMapping.label);
  })();

  const groupData = groupBy(filteredDataSource, 'groupId');

  if (isEmpty(filteredDataSource) && !isRootMenu) {
    return null;
  }

  return (
    <>
      <div
        data-depth={depth}
        data-deepsearch={deepSearch}
        className={classNames(className, withWrapperCls())}
        role="menu"
        style={style}
        ref={wrapRef}
      >
        {isRootMenu && header && <div className={withWrapperCls('header')}>{header}</div>}
        <div className={withWrapperCls('body')}>
          {Object.keys(groupData).map((groupId) => (
            <div key={groupId} className={withWrapperCls('group')}>
              {groupData[groupId].map((data, i) => (
                <MenuItem
                  key={[depth, i].join('-')}
                  value={value}
                  keyword={keyword}
                  dataSource={data}
                  onTrigger={onTrigger}
                  onSelect={onSelect}
                  parentsData={parentsData}
                  deepSearch={deepSearch}
                  hasChild={!isEmpty(data.children)}
                  keyMapping={keyMapping}
                  {...others}
                />
              ))}
            </div>
          ))}
        </div>
        {isRootMenu && footer && <div className={withWrapperCls('footer')}>{footer}</div>}
      </div>
      {childMenu}
    </>
  );
};

export default React.memo(Menu);
