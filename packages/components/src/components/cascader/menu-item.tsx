import { CheckOutlined, DownFilled } from '@gio-design/icons';
import React, { FocusEvent, KeyboardEvent, MouseEvent, ReactElement } from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';

import { isHit, makeSearchParttern, useDataSource, withPrefix } from './helper';

export type Value = string | number;

export type NodeData = {
  label: string;
  value: Value;
  disable?: boolean;
  children?: NodeData[];
  [key: string]: unknown;
};

export interface Props {
  className?: string;
  style?: React.CSSProperties;
  dataSource: NodeData;
  value?: Value;
  searchBy?: string;
  ignoreCase?: boolean;
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

const renderLabel = (label: string, searchBy: string, ignoreCase: boolean) => {
  const rSearch = makeSearchParttern(searchBy, ignoreCase);
  const replaceValues: string[] = [];
  label.replace(rSearch, (s) => {
    replaceValues.push(s);
    return s;
  });

  const result = label.split(rSearch).reduce((acc, b) => {
    acc.push(
      <span key={b}>
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
    searchBy,
    ignoreCase = true,
  } = props;
  const [dataSource, setDataSource] = useDataSource(originDataSource);
  const { label, children: childNodeData } = dataSource;
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

  const hitTarget = searchBy && isHit(dataSource.label, searchBy, ignoreCase);

  if (searchBy && !hitTarget) {
    return null;
  }

  return (
    <div role="menuitem" className={classNames(className, withWrapperCls())} ref={ref}>
      <div
        className={withWrapperCls('inner')}
        role="button"
        tabIndex={0}
        onKeyUp={handleKeyUp}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {isFunction(onRender) ? (
          onRender(dataSource)
        ) : (
          <div className={withWrapperCls('content')}>
            <div>{hitTarget && searchBy ? renderLabel(label, searchBy, ignoreCase) : label}</div>
            <div>
              {(selectAny || isEmpty(dataSource.children)) && value === dataSource.value && (
                <CheckOutlined className="icon-checked" />
              )}
              {!isEmpty(childNodeData) && <DownFilled className={withWrapperCls('icon')} />}
            </div>
          </div>
        )}
      </div>

      {afterInner}
    </div>
  );
});

export default React.memo(MenuItem);
