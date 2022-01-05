import React, { DOMAttributes } from 'react';
import classnames from 'classnames';
import { isNil } from 'lodash';
import { usePrefixCls } from '@gio-design/utils';
import { TabProps, TabsProps } from './interface';
import useControlledState from '../utils/hooks/useControlledState';
import Tab from './Tab';
import TabButton from './TabButton';
import { WithCommonProps } from '../utils/interfaces';
import WithRef from '../utils/withRef';
import TabsContext from './context';

export const Tabs = WithRef<
  HTMLDivElement,
  WithCommonProps<TabsProps> & Omit<DOMAttributes<HTMLDivElement>, 'onChange'>
>(
  (
    {
      defaultValue = 0,
      value,
      onChange,
      className: classname,
      children,
      size = 'normal',
      tabListStyle,
      ...restProps
    }: WithCommonProps<TabsProps> & Omit<DOMAttributes<HTMLDivElement>, 'onChange'>,
    ref?
  ) => {
    const [activeValue, setActiveValue] = useControlledState<React.Key>(value, defaultValue);
    const prefixCls = usePrefixCls('tabs');
    const tabClasses = classnames(classname, prefixCls);

    const elementList = React.Children.toArray(children).filter(
      (node) => React.isValidElement(node) && node.type === Tab
    );

    const onClick = (v: React.Key) => {
      setActiveValue(v);
      onChange?.(v);
    };

    const tabs = elementList.map((tab: React.ReactElement<WithCommonProps<TabProps>>, index) => (
      <TabButton
        key={tab.props.value}
        value={tab.props.value || index}
        size={size}
        onClick={onClick}
        prefix={tab.props.prefix}
        active={activeValue === tab.props.value}
        disabled={tab.props.disabled}
      >
        {tab.props.label}
      </TabButton>
    ));

    const tabPanels = elementList.map((tab: React.ReactElement<WithCommonProps<TabProps>>, index) => {
      if (isNil(tab.props.value)) {
        return React.cloneElement(<Tab />, { ...tab.props, value: index });
      }
      return React.cloneElement(<Tab />, tab.props);
    });

    return (
      <TabsContext.Provider value={{ activeValue }}>
        <div className={tabClasses} data-testid="tabs" ref={ref} {...restProps}>
          <div data-testid="tablist" className={`${prefixCls}-tablist`} style={tabListStyle}>
            {tabs}
          </div>
          <div data-testid="tabpanels" className={`${prefixCls}-tabpanels`}>
            {tabPanels}
          </div>
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.defaultProps = {
  defaultValue: 0,
  size: 'normal',
};

Tabs.displayName = 'Tabs';

export default Tabs;
