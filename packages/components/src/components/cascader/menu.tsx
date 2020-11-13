import React, { ReactElement, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';

import { dataFilter, makeSearchParttern, toInt, useDynamicData, withPrefix } from './helper';
import MenuItem, { Props as MenuItemProps, NodeData } from './menu-item';

export interface Props extends Omit<MenuItemProps, 'dataSource' | 'hasChild'> {
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
    keyword,
    ignoreCase,
    deepSearch = false,
    parentsData = [],
    onTrigger: userOnTrigger,
    onSelect: userOnSelect,
    header,
    footer,
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
    const { paddingLeft, paddingTop } = getComputedStyle(menu!);
    const { offsetLeft = 0, offsetTop = 0 } = (event.currentTarget || {}) as HTMLElement;
    setOffset([offsetLeft - toInt(paddingLeft), offsetTop - toInt(paddingTop)]);
    // setTriggerData(undefined);
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
        open={false}
        dataSource={triggerData.children}
        parentsData={[triggerData, ...parentsData]}
        style={{ ...style, top: top + toInt(sTop), left: left + toInt(sLeft) }}
      />
    );
  }

  const filteredDataSource = useMemo(() => {
    if (!keyword) {
      return dataSource;
    }

    const searchParttern = makeSearchParttern(keyword, ignoreCase);
    return dataFilter(dataSource, searchParttern, deepSearch);
  }, [dataSource, deepSearch, keyword, ignoreCase]);

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
              {groupData[groupId].map((data) => (
                <MenuItem
                  key={`${depth}-${data.value}`}
                  value={value}
                  keyword={keyword}
                  dataSource={data}
                  onTrigger={onTrigger}
                  onSelect={onSelect}
                  parentsData={parentsData}
                  deepSearch={deepSearch}
                  hasChild={!isEmpty(data.children)}
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
