import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import trim from 'lodash/trim';

import { useLocale } from '@gio-design/utils';
import useMergeRef from '../utils/hooks/useMergeRef';
import { dataFilter, makeSearchParttern, mergeKeyMapping, toInt, withPrefix } from './helper';
import Empty from './empty';
import MenuItem from './menu-item';
import { MenuProps, MaybeElementOrFn, NodeData } from './interface';
import defaultLocale from './locales/zh-CN';

const getMayBeElement = (maybeElement: MaybeElementOrFn, dataSource: NodeData[]) =>
  isFunction(maybeElement) ? maybeElement(dataSource) : maybeElement;

const SingleMenu = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
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

  const locale = useLocale('Cascader');
  const { noResult }: { noResult: string } = {
    ...defaultLocale,
    ...locale,
  };

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

  if (isEmpty(filteredDataSource) && !isRootMenu) {
    return null;
  }

  const groupData = groupBy(filteredDataSource, 'groupId');
  let menu;

  if (isEmpty(filteredDataSource) && isRootMenu) {
    menu = getEmpty ? getEmpty(keyword) : <Empty tip={keyword ? noResult : undefined} />;
  } else {
    menu = Object.keys(groupData).map((groupId) => {
      const mergedGroupName = isFunction(groupName) ? groupName(groupId[0] as any) : groupData[groupId][0].groupName;
      return (
        <div key={groupId} className={withWrapperCls('group')}>
          {groupName && mergedGroupName && <div className={withWrapperCls('group-name')}>{mergedGroupName}</div>}
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
              expanded={expandedId === data[keyMapping.value] && !isEmpty(data.children)}
              {...others}
            />
          ))}
        </div>
      );
    });
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
