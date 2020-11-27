import React, { ReactElement, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import trim from 'lodash/trim';

import { dataFilter, makeSearchParttern, toInt, withPrefix } from './helper';
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
  parentMenu?: HTMLDivElement;
}

const SingleMenu = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    className,
    style = {},
    dataSource = [],
    value,
    depth = 0,
    ignoreCase,
    keyMapping = { label: 'label', value: 'value' },
    keyword: originKeyword,
    deepSearch = false,
    parentsData = [],
    header,
    footer,
    groupName,
    getEmpty,
    parentMenu,
    ...others
  } = props;
  const isRootMenu = depth === 0;
  const [innerStyle, setInnerStyle] = useState({
    ...style,
    visibility: parentMenu ? 'hidden' : '',
  } as React.CSSProperties);
  const keyword = trim(originKeyword);
  const wrapRef = useRef<HTMLDivElement>(null);
  const withWrapperCls = withPrefix('cascader-menu');

  // 合并 ref
  useEffect(() => {
    if (typeof ref === 'function') {
      ref(wrapRef.current);
    } else if (ref) {
      // eslint-disable-next-line no-param-reassign
      ref.current = wrapRef.current;
    }
  }, [ref]);

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
            parentsData={parentsData}
            deepSearch={deepSearch}
            keyMapping={keyMapping}
            ignoreCase={ignoreCase}
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
