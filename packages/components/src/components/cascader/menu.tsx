import React, { ReactElement, useRef, useState } from 'react';
import classNames from 'classnames';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';

import { dataFilter, makeSearchParttern, toInt, useDynamicData, dataKeyMapping, withPrefix } from './helper';
import Empty from './empty';
import MenuItem, { Props as MenuItemProps, NodeData } from './menu-item';

type MaybeElementOrFn = React.ReactNode | ((dataSource: NodeData[]) => React.ReactNode);

const getMayBeElement = (maybeElement: MaybeElementOrFn, dataSource: NodeData[]) => {
  return isFunction(maybeElement) ? maybeElement(dataSource) : maybeElement;
};

export interface Props extends Omit<MenuItemProps, 'dataSource' | 'hasChild'> {
  dataSource?: NodeData[];
  onRender?: (nodeData: NodeData) => ReactElement;
  open?: boolean;
  depth?: number;
  header?: MaybeElementOrFn;
  footer?: MaybeElementOrFn;
  offsetLeft?: number;
  offsetTop?: number;
  getEmpty?: (keyword?: string) => React.ReactElement;
  groupName?: MaybeElementOrFn;
}

const Menu: React.FC<Props> = (props) => {
  const {
    className,
    style,
    dataSource: originDataSource = [],
    value,
    keyMapping: originKeyMapping,
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
    groupName,
    getEmpty,
    offsetLeft: userOffsetLeft = 5,
    offsetTop: userOffsetTop = 0,
    ...others
  } = props;
  const isRootMenu = depth === 0;
  const keyMapping = { label: 'label', value: 'value', ...originKeyMapping };
  const [dataSource, setDataSource] = useDynamicData(originDataSource);
  const wrapRef = useRef<HTMLDivElement>(null);
  const withWrapperCls = withPrefix('cascader-menu');
  const [canOpen, setCanOpen] = useDynamicData(open);
  const [triggerData, setTriggerData] = useState<NodeData>();
  const [offset, setOffset] = useState([0, 0]);
  const onTrigger = (event: React.MouseEvent | React.KeyboardEvent, nodeData: NodeData) => {
    const menu = event.currentTarget.closest('.cascader-menu');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { width, paddingLeft, paddingTop } = getComputedStyle(menu!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { scrollTop, scrollLeft } = menu!.querySelector('.cascader-menu-body')!;
    const { offsetLeft = 0, offsetTop = 0 } = (event.currentTarget || {}) as HTMLElement;
    setOffset([toInt(width) + offsetLeft - toInt(paddingLeft) - scrollLeft, offsetTop - toInt(paddingTop) - scrollTop]);
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
    const [offsetLeft, offestTop] = offset;
    const { top: inheritTop = 0, left: inheritLeft = 0 } = style || {};
    const nextDepth = depth + 1;
    childMenu = (
      <Menu
        {...props}
        key={[nextDepth, triggerData[keyMapping.value]].join('-')}
        depth={nextDepth}
        open={false}
        dataSource={triggerData.children}
        parentsData={[triggerData, ...parentsData]}
        style={{
          ...style,
          top: userOffsetTop + offestTop + toInt(inheritTop),
          left: userOffsetLeft + offsetLeft + toInt(inheritLeft),
        }}
      />
    );
  }

  let filteredDataSource = dataSource;
  if (keyword && (isRootMenu || deepSearch)) {
    const searchParttern = makeSearchParttern(keyword, ignoreCase);
    filteredDataSource = dataFilter(dataSource, searchParttern, deepSearch, keyMapping.label);
  }

  const groupData = groupBy(filteredDataSource, 'groupId');

  if (isEmpty(filteredDataSource) && !isRootMenu) {
    return null;
  }

  let menu;

  if (isEmpty(filteredDataSource) && isRootMenu) {
    menu = getEmpty ? getEmpty(keyword) : <Empty tip={!keyword ? '无搜索结果' : undefined} />;
  } else {
    menu = Object.keys(groupData).map((groupId) => (
      <div key={groupId} className={withWrapperCls('group')}>
        <div className={withWrapperCls('group-name')}>
          {getMayBeElement(groupName, groupData[groupId]) ?? groupData[groupId][0].groupName}
        </div>
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
            keyMapping={keyMapping}
            {...others}
          />
        ))}
      </div>
    ));
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
        {isRootMenu && header && <div className={withWrapperCls('header')}>{getMayBeElement(header, dataSource)}</div>}
        <div className={withWrapperCls('body')}>{menu}</div>
        {isRootMenu && footer && <div className={withWrapperCls('footer')}>{getMayBeElement(footer, dataSource)}</div>}
      </div>
      {childMenu}
    </>
  );
};

export default React.memo(Menu);
