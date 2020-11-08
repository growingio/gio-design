import { DownFilled } from '@gio-design/icons';
import React, { FocusEvent, KeyboardEvent, MouseEvent, ReactElement } from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';

import { isHit, makeSearchParttern, withPrefix } from './helper';

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
  onClick?: (nodeData: NodeData, event: MouseEvent) => void;
  onMouseEnter?: (nodeData: NodeData, event: MouseEvent) => void;
  trigger?: 'click' | 'hover';
  selectAll?: boolean;
  onTrigger?: (nodeData: NodeData, event: MouseEvent | KeyboardEvent) => void;
  beforeSelect?: (nodeData: NodeData, event: MouseEvent | KeyboardEvent) => void | NodeData | Promise<NodeData>;
  onSelect?: (nodeData: NodeData, parentsData: NodeData[]) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onRender?: (nodeData: NodeData) => ReactElement;
  afterInner?: ReactElement;
  mouseEnterTimeout?: number;
  mouseLeaveTimeout?: number;
}

const triggerMap = {
  click: 'onClick',
  hover: 'onMouseEnter',
} as const;

const renderLabel = (label: string, searchBy: string, ignoreCase: boolean) => {
  const rSearch = makeSearchParttern(searchBy, ignoreCase);
  return label.replace(rSearch, (s) => `<b class="keyword">${s}</b>`);
};

const MenuItem = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    className,
    dataSource,
    dataSource: { label, children: childNodeData },
    value,
    parentsData = [],
    beforeSelect,
    onSelect,
    onKeyUp,
    onFocus,
    onBlur,
    trigger = 'click',
    selectAll,
    onTrigger,
    onRender,
    afterInner,
    searchBy,
    ignoreCase = true,
  } = props;
  const withWrapperCls = withPrefix('cascader-menu-item');
  const originTrigger = triggerMap[trigger.toLowerCase() as typeof trigger];
  const triggerPipe = (event: MouseEvent | KeyboardEvent) => {
    event.persist();
    const noChildren = isEmpty(dataSource.children);
    const copyEvent = { ...event };
    if (noChildren || selectAll) {
      Promise.resolve(beforeSelect?.(dataSource, event))
        .then((d) => d || dataSource)
        .then((resolveData) => {
          onSelect?.(resolveData, parentsData);
          if (selectAll) {
            onTrigger?.(resolveData, copyEvent);
          }
        });
    }
    if (!noChildren) {
      onTrigger?.(dataSource, event);
    }
  };
  const handleTrigger = (event: MouseEvent<HTMLDivElement>) => {
    if (trigger === event.type) {
      props[originTrigger]?.(dataSource, event);
      triggerPipe(event);
    }
  };
  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'enter' || event.key === ' ') {
      event.preventDefault();
      triggerPipe(event);
    }
    onKeyUp?.(event);
  };

  const hitTarget = searchBy && isHit(dataSource.label, searchBy, ignoreCase);

  if (searchBy && !hitTarget) {
    return null;
  }

  return (
    <div role="listitem" className={classNames(className, withWrapperCls())} ref={ref}>
      <div
        className={withWrapperCls('inner')}
        role="button"
        tabIndex={0}
        onKeyUp={handleKeyUp}
        onClick={handleTrigger}
        onMouseEnter={handleTrigger}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {isFunction(onRender) ? (
          onRender(dataSource)
        ) : (
          <div className={withWrapperCls('content')}>
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: hitTarget && searchBy ? renderLabel(label, searchBy, ignoreCase) : label,
              }}
            />
            {(selectAll || isEmpty(dataSource.children)) && value === dataSource.value && <span>✓</span>}
            {!isEmpty(childNodeData) && <DownFilled className={withWrapperCls('icon')} />}
          </div>
        )}
      </div>

      {afterInner}
    </div>
  );
});

export default React.memo(MenuItem);
