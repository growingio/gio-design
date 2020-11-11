import { CheckOutlined, DownFilled } from '@gio-design/icons';
import React, { FocusEvent, KeyboardEvent, MouseEvent, ReactElement } from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';

import { isHit, makeSearchParttern, useDynamicData, withPrefix } from './helper';

export type Value = string | number;

export type NodeData = {
  label: string;
  value: Value;
  disabled?: boolean;
  children?: NodeData[];
  groupId?: Value;
  [key: string]: unknown;
};

export interface Props {
  className?: string;
  style?: React.CSSProperties;
  dataSource: NodeData;
  value?: Value;
  hasChild?: boolean;
  keyword?: string;
  ignoreCase?: boolean;
  deepSearch?: boolean;
  parentsData?: NodeData[];
  onClick?: (event: MouseEvent, nodeData: NodeData) => void;
  onMouseEnter?: (event: MouseEvent, nodeData: NodeData) => void;
  trigger?: 'click' | 'hover';
  selectAny?: boolean;
  onTrigger?: (event: MouseEvent | KeyboardEvent, nodeData: NodeData) => void;
  beforeSelect?: (event: MouseEvent | KeyboardEvent, nodeData: NodeData) => void | NodeData[] | Promise<NodeData[]>;
  onSelect?: (nodeData: NodeData, parentsData: NodeData[]) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onRender?: (nodeData: NodeData) => ReactElement;
  afterInner?: ReactElement;
}

const triggerMap = {
  click: 'onClick',
  hover: 'onMouseEnter',
} as const;

const renderKeyword = (label: string, keyword: string, ignoreCase: boolean) => {
  const rSearch = makeSearchParttern(keyword, ignoreCase);
  const replaceValues: string[] = [];
  label.replace(rSearch, (s) => {
    replaceValues.push(s);
    return s;
  });

  const result = label.split(rSearch).reduce((acc, b, i) => {
    acc.push(
      // eslint-disable-next-line react/no-array-index-key
      <span key={`${b}-${i}`}>
        <span>{b}</span>
        <b className="keyword">{replaceValues.shift()}</b>
      </span>
    );
    return acc;
  }, [] as JSX.Element[]);

  return result;
};

const MenuItem = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    className,
    dataSource: originDataSource,
    value,
    hasChild = false,
    parentsData = [],
    beforeSelect,
    onSelect,
    onClick,
    onKeyUp,
    onFocus,
    onBlur,
    onMouseEnter,
    trigger = 'click',
    selectAny,
    onTrigger,
    onRender,
    afterInner,
    keyword,
    ignoreCase = true,
    deepSearch = false,
  } = props;
  const [dataSource, setDataSource] = useDynamicData(originDataSource);
  const { label, disabled } = dataSource;
  const withWrapperCls = withPrefix('cascader-menu-item');
  const mergedTrigger = triggerMap[trigger.toLowerCase() as typeof trigger];
  const resolveBeforeSelect = (event: MouseEvent | KeyboardEvent) => {
    // 没有子节点 || selectAny 先调用 beforeSelect 回调
    const { children } = dataSource;
    const isSelect = isEmpty(children) || (event.type.toLowerCase() === mergedTrigger && selectAny);
    const mergedData = isSelect ? beforeSelect?.(event, dataSource) : children;
    return Promise.resolve(mergedData).then((c) => ({ ...dataSource, children: c || children }));
  };
  const getCopyEvent = <T extends MouseEvent | KeyboardEvent>(event: T) => {
    event.persist();
    return { ...event };
  };
  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    onTrigger?.(event, dataSource);
    onMouseEnter?.(event, dataSource);
  };
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const eventCopy = getCopyEvent(event);
    resolveBeforeSelect(eventCopy).then((data) => {
      onTrigger?.(eventCopy, data);
      onClick?.(eventCopy, data);
      if (isEmpty(data.children) || selectAny) {
        setDataSource(data);
        onSelect?.(data, parentsData);
      }
    });
  };
  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    const eventCopy = getCopyEvent(event);
    if ([' ', 'Enter', 'ArrowRight'].indexOf(event.key) >= 0) {
      event.preventDefault();
      event.stopPropagation();
      resolveBeforeSelect(event).then((data) => {
        onTrigger?.(eventCopy, data);
        if (isEmpty(data.children) || selectAny) {
          setDataSource(data);
          onSelect?.(data, parentsData);
        }
      });
    }
    onKeyUp?.(event);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ' ') {
      event.preventDefault();
    }
  };

  const hitTarget = keyword && isHit(dataSource.label, keyword, ignoreCase);
  const shouldRenderKeyword = hitTarget && (isEmpty(parentsData) || deepSearch);

  let childNode = (
    <div className={withWrapperCls('content')}>
      <div>{shouldRenderKeyword && keyword ? renderKeyword(label, keyword, ignoreCase) : label}</div>
      <div>
        {value === dataSource.value && (selectAny || !hasChild) && (
          <CheckOutlined className={withWrapperCls('icon-checked')} />
        )}
        {!hasChild && <DownFilled className={withWrapperCls('icon-down')} />}
      </div>
    </div>
  );
  if (isFunction(onRender)) {
    childNode = onRender(dataSource);
  }

  return (
    <div
      role="menuitem"
      className={classNames(className, withWrapperCls(), disabled && withPrefix('disable'))}
      ref={ref}
    >
      <div
        className={withWrapperCls('inner')}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {childNode}
      </div>

      {afterInner}
    </div>
  );
});

export default React.memo(MenuItem);
