import React, { PropsWithChildren, ReactElement } from 'react';
import classNames from 'classnames';
import { TabProps } from './interface';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import useControlledState from '../utils/hooks/useControlledState';
import TabPanel from './TabPanel';
import TabButton from './TabButton';
import WithRef from '../utils/withRef';

export const Tabs = WithRef<HTMLDivElement, TabProps>((props: PropsWithChildren<TabProps>, ref?) => {
  const {
    defaultActiveKey = '',
    activeKey,
    onChange,
    className,
    style,
    children,
    size = 'normal',
    ...restProps
  } = props;
  const [localActiveKey, setLocalActiveKey] = useControlledState<string>(activeKey, defaultActiveKey);
  const prefixCls = usePrefixCls('tabs-new');
  const tabClasses = classNames(className, prefixCls);
  const elementList = React.Children.toArray(children).filter(
    (node) => React.isValidElement(node) && node.type === TabPanel
  );

  return (
    <div className={tabClasses} style={style} data-testid="tabs" ref={ref} {...restProps}>
      <div data-testid="tablist" className={`${prefixCls}-tablist`}>
        {elementList.map((item: ReactElement, index: number) => {
          const TabButtonOptions = {
            prefixCls,
            key: index.toString(),
            realKey: item.props.key ? item.props.key.toString() : index.toString(),
            size,
            localActiveKey,
            setLocalActiveKey,
            onChange,
            ...item.props,
          };
          return React.cloneElement(<TabButton />, TabButtonOptions);
        })}
      </div>
      <div data-testid="tabpanel" className={`${prefixCls}-tabpanel`}>
        {elementList.map((item: ReactElement, index: number) => (
          <div
            data-testid={`tabpanel-item-${index}`}
            style={
              (item.props.key ? item.props.key.toString() : index.toString()) === localActiveKey
                ? undefined
                : { display: 'none' }
            }
            key={index.toString()}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
});

Tabs.displayName = 'Tabs';

export default Tabs;
