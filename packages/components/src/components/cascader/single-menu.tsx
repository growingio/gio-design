import React, { ReactElement, useEffect, useState } from 'react';
import classNames from 'classnames';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import trim from 'lodash/trim';

import { dataFilter, makeSearchParttern, mergeKeyMapping, toInt, useMergeRef, withPrefix } from './helper';
import Empty from './empty';
import MenuItem, { Props as MenuItemProps, NodeData } from './menu-item';

type MaybeElementOrFn = React.ReactNode | ((dataSource: NodeData[]) => React.ReactNode);

const getMayBeElement = (maybeElement: MaybeElementOrFn, dataSource: NodeData[]) => {
  return isFunction(maybeElement) ? maybeElement(dataSource) : maybeElement;
};

export interface Props extends Omit<MenuItemProps, 'dataSource' | 'hasChild' | 'expanded'> {
  dataSource?: NodeData[];
  onRender?: (nodeData: NodeData) => ReactElement;
  open?: boolean;
  depth?: number;
  header?: MaybeElementOrFn;
  footer?: MaybeElementOrFn;
  offsetLeft?: number;
  offsetTop?: number;
  getEmpty?: (keyword?: string) => React.ReactElement;
  groupName?: boolean | MaybeElementOrFn;
  parentMenu?: HTMLDivElement;
  expandedId?: NodeData['value'];
  autoFocus?: boolean;
}

const SingleMenu = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    className,
    style = {},
    dataSource = [],
    value,
    depth = 0,
    ignoreCase,
    keyMapping: _keyMapping,
    keyword: originKeyword,
    deepSearch = false,
    parentsData = [],
    header,
    footer,
    groupName = false,
    getEmpty,
    parentMenu,
    expandedId,
    autoFocus = true,
    ...others
  } = props;
  const keyMapping = mergeKeyMapping(_keyMapping);
  const isRootMenu = depth === 0;
  const [innerStyle, setInnerStyle] = useState({
    ...style,
    visibility: parentMenu ? 'hidden' : '',
  } as React.CSSProperties);
  const keyword = trim(originKeyword);
  const wrapRef = useMergeRef(ref);
  const withWrapperCls = withPrefix('cascader-menu');

  // 超出浏览器高度与上一级对齐
  useEffect(() => {
    if (!(wrapRef.current && parentMenu)) {
      return;
    }

    const { bottom } = wrapRef.current.getBoundingClientRect();
    const nextStyle = { ...innerStyle, visibility: '' };
    if (bottom >= window.innerHeight) {
      const { bottom: parentBottom } = parentMenu.getBoundingClientRect();
      nextStyle.top = toInt(innerStyle.top?.toString()) - (bottom - parentBottom);
    }
    setInnerStyle(nextStyle as React.CSSProperties);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapRef, parentMenu]);

  useEffect(() => {
    if (autoFocus && wrapRef.current) {
      const firstItem = wrapRef.current.querySelector('.cascader-menu-item-inner') as HTMLElement;
      setTimeout(() => {
        firstItem?.focus();
      }, 50);
    }
  }, [autoFocus, wrapRef]);

  let filteredDataSource = dataSource;
  if (keyword && (isRootMenu || deepSearch)) {
    const searchParttern = makeSearchParttern(keyword, ignoreCase);
    filteredDataSource = dataFilter(dataSource, searchParttern, deepSearch, keyMapping.label);
  }

  if (isEmpty(dataSource) && !isRootMenu) {
    return null;
  }

  const groupData = groupBy(filteredDataSource, 'groupId');
  let menu;

  if (isEmpty(dataSource) && isRootMenu) {
    menu = getEmpty ? getEmpty(keyword) : <Empty tip={keyword ? '无搜索结果' : undefined} />;
  } else {
    menu = Object.keys(groupData).map((groupId) => (
      <div key={groupId} className={withWrapperCls('group')}>
        {groupName && (
          <div className={withWrapperCls('group-name')}>
            {groupName === true ? groupData[groupId][0].groupName : getMayBeElement(groupName, groupData[groupId])}
          </div>
        )}
        {groupData[groupId].map((data, i) => (
          <MenuItem
            key={[depth, i].join('-')}
            value={value}
            keyword={keyword}
            dataSource={data}
            parentsData={parentsData}
            deepSearch={deepSearch}
            keyMapping={keyMapping}
            ignoreCase={ignoreCase}
            expanded={expandedId === data[keyMapping.value]}
            {...others}
          />
        ))}
      </div>
    ));
  }

  return (
    <div
      data-depth={depth}
      data-deepsearch={deepSearch}
      className={classNames(className, withWrapperCls())}
      role="menu"
      style={innerStyle}
      ref={wrapRef}
    >
      {isRootMenu && header && <div className={withWrapperCls('header')}>{getMayBeElement(header, dataSource)}</div>}
      <div className={withWrapperCls('body')}>{menu}</div>
      {isRootMenu && footer && <div className={withWrapperCls('footer')}>{getMayBeElement(footer, dataSource)}</div>}
    </div>
  );
});

export default React.memo(SingleMenu);
