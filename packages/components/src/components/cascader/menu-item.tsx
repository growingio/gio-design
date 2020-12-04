import { CheckOutlined, DownFilled } from '@gio-design/icons';
import React, { FocusEvent, KeyboardEvent, MouseEvent, ReactElement } from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';

import { dataFilter, dataKeyMapping, isHit, makeSearchParttern, useDynamicData, withPrefix } from './helper';

export type Value = string | number;

export type KeyMapping = {
  label?: string;
  value?: string;
};

export type NodeData = {
  label?: string;
  value?: Value;
  disabled?: boolean;
  children?: NodeData[];
  groupId?: Value;
  groupName?: string;
  [key: string]: unknown;
};

export interface Props {
  className?: string;
  style?: React.CSSProperties;
  dataSource: NodeData;
  keyMapping?: KeyMapping;
  value?: Value;
  keyword?: string;
  expanded?: boolean;
  ignoreCase?: boolean;
  deepSearch?: boolean;
  parentsData?: NodeData[];
  onClick?: (event: MouseEvent, nodeData: NodeData) => void;
  onMouseEnter?: (event: MouseEvent, nodeData: NodeData) => void;
  trigger?: 'click' | 'hover';
  selectAny?: boolean;
  onTrigger?: (event: MouseEvent | KeyboardEvent, nodeData: NodeData) => void;
  beforeSelect?: (event: MouseEvent | KeyboardEvent, nodeData: NodeData) => void | NodeData[] | Promise<NodeData[]>;
  onSelect?: (nodeData: NodeData, parentsData: NodeData[], event: MouseEvent | KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
  onRender?: (nodeData: NodeData) => ReactElement;
  afterInner?: (nodeData: NodeData) => React.ReactNode;
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
    style,
    dataSource: originDataSource,
    value,
    expanded,
    keyMapping = { label: 'label', value: 'value' },
    parentsData = [],
    beforeSelect,
    onSelect,
    onClick,
    onKeyUp,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    trigger = 'hover',
    selectAny,
    onTrigger,
    onRender,
    afterInner,
    keyword,
    ignoreCase = true,
    deepSearch = false,
  } = props;
  const [dataSource, setDataSource] = useDynamicData(originDataSource);
  const { label: dataLabel, value: dataValue, disabled } = dataKeyMapping(dataSource, keyMapping);
  const { children } = dataSource;
  const noChild = isEmpty(children);
  const withWrapperCls = withPrefix('cascader-menu-item');
  const mergedTrigger = triggerMap[trigger.toLowerCase() as typeof trigger];

  const getCopyEvent = <T extends MouseEvent | KeyboardEvent>(event: T) => {
    event.persist();
    return { ...event };
  };

  const resolveBeforeSelect = (event: MouseEvent | KeyboardEvent) => {
    if (disabled) {
      return Promise.reject(Error('disabled'));
    }
    // const eventCopy = getCopyEvent(event);
    // 没有子节点 || selectAny 先调用 beforeSelect 回调
    const isSelect = noChild || (event.type.toLowerCase() === mergedTrigger && selectAny);
    const mergedData = isSelect ? beforeSelect?.(event, dataSource) : children;
    const pipe = (data: NodeData) => {
      onTrigger?.(event, data);
      if (isEmpty(data.children) || selectAny) {
        setDataSource(data);
        try {
          if (!(event.type === 'keyup' && (event as KeyboardEvent).key === 'ArrowRight')) {
            onSelect?.(data, parentsData, event);
          }
        } catch (e) {
          throw new Error(e);
        }
      }
      return data;
    };
    return Promise.resolve(mergedData)
      .then((c) => ({ ...dataSource, children: c || children }))
      .then(pipe)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('[cascader]', error);
        return pipe(dataSource);
      });
  };

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.nativeEvent.target as HTMLDivElement;
    // 这里有个奇怪的问题，点 input 会触发这里的 MouseEvent 事件
    if (trigger === 'hover' && target.closest('.cascader-menu-outer') && !disabled) {
      onTrigger?.(event, dataSource);
    }
    onMouseEnter?.(event, dataSource);
  };

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const eventCopy = getCopyEvent(event);
    resolveBeforeSelect(eventCopy)
      .then((data) => {
        onClick?.(eventCopy, data);
      })
      .catch(() => onClick?.(eventCopy, dataSource));
  };

  const handleKeyUp = (event: KeyboardEvent<HTMLDivElement>) => {
    if ([' ', 'Enter', 'ArrowRight'].indexOf(event.key) >= 0) {
      event.preventDefault();
      event.stopPropagation();
      resolveBeforeSelect(getCopyEvent(event)).catch(() => {
        onKeyUp?.(event);
      });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === ' ') {
      event.preventDefault();
    }
  };

  const hitTarget = keyword && dataLabel && isHit(dataLabel, keyword, ignoreCase);
  const shouldRenderKeyword = hitTarget && (isEmpty(parentsData) || deepSearch);
  const parttern = makeSearchParttern(keyword, ignoreCase);
  const mergedHasChild =
    keyword && deepSearch
      ? !isEmpty(dataFilter(dataSource.children, parttern, deepSearch, keyMapping.label))
      : !noChild;

  let childNode = (
    <div className={withWrapperCls('content')}>
      <div>
        {shouldRenderKeyword && keyword && dataLabel ? renderKeyword(dataLabel, keyword, ignoreCase) : dataLabel}
      </div>
      <div>
        {value === dataValue && (selectAny || !mergedHasChild) && (
          <CheckOutlined size="1em" className={withWrapperCls('icon-checked')} />
        )}
        {mergedHasChild && <DownFilled size="1em" className={withWrapperCls('icon-down')} />}
      </div>
    </div>
  );
  if (isFunction(onRender)) {
    childNode = onRender(dataSource);
  }

  return (
    <div
      role="menuitem"
      aria-expanded={expanded}
      className={classNames(className, withWrapperCls(), disabled && withWrapperCls('disabled'))}
      ref={ref}
      style={style}
    >
      <div
        className={withWrapperCls('inner')}
        role="button"
        aria-haspopup={mergedHasChild}
        aria-disabled={disabled}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseLeave={onMouseLeave}
      >
        {childNode}
      </div>

      {isFunction(afterInner) ? afterInner(dataSource) : afterInner}
    </div>
  );
});

export default React.memo(MenuItem);
