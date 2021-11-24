import React, { DOMAttributes, useEffect } from 'react';
import classnames from 'classnames';
import { isNil } from 'lodash';
import { CheckOutlined } from '@gio-design/icons';
import { StepsProps } from './interface';
import { TabProps } from '../tabs/interface';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import useControlledState from '../utils/hooks/useControlledState';
import Tab from '../tabs/Tab';
import TabButton from '../tabs/TabButton';
import { WithCommonProps } from '../utils/interfaces';
import WithRef from '../utils/withRef';
import StepsContext from '../tabs/context';

export const Steps = WithRef<
  HTMLDivElement,
  WithCommonProps<StepsProps> & Omit<DOMAttributes<HTMLDivElement>, 'onChange'>
>(
  (
    {
      current = 1,
      value,
      onChange,
      classname,
      children,
      size = 'normal',
      ...restProps
    }: WithCommonProps<StepsProps> & Omit<DOMAttributes<HTMLDivElement>, 'onChange'>,
    ref?
  ) => {
    const [activeValue, setActiveValue] = useControlledState<React.Key>(value, current - 1);
    const prefixCls = usePrefixCls('tabs-new');
    const tabClasses = classnames(classname, prefixCls);

    const elementList = React.Children.toArray(children).filter(
      (node) => React.isValidElement(node) && node.type === Tab
    );

    useEffect(() => {
      let currentVal: number;
      if (current > elementList.length) {
        currentVal = elementList?.length + 1;
      } else if (current <= 1) {
        currentVal = 1;
      } else {
        currentVal = current;
      }
      setActiveValue(currentVal - 1);
    }, [current, elementList.length, setActiveValue]);

    const onClick = (v: React.Key) => {
      if (v <= current - 1) {
        setActiveValue(v);
        onChange?.(v);
      }
    };

    const tabs = elementList.map((tab: React.ReactElement<WithCommonProps<TabProps>>, index) => {
      let prefix = null;
      let className = '';
      if (index < current - 1) {
        prefix = <CheckOutlined />;
        className = 'complete';
      } else if (index === current - 1) {
        className = 'process';
      } else if (index >= current) {
        className = 'uncomplete';
      }
      return (
        <span className={`${prefixCls}-tablist-stepbar stepbar-${className}`} key={tab.props.value}>
          <TabButton
            value={tab.props.value || index}
            size={size}
            onClick={onClick}
            prefix={prefix}
            active={activeValue === index}
            disabled={tab.props.disabled}
          >
            {tab.props.label}
          </TabButton>
        </span>
      );
    });

    const tabPanels = elementList.map((tab: React.ReactElement<WithCommonProps<TabProps>>, index) => {
      if (isNil(tab.props.value)) {
        return React.cloneElement(<Tab />, { ...tab.props, value: index, key: tab.props.value });
      }
      return React.cloneElement(<Tab />, { ...tab.props, key: tab.props.value });
    });

    return (
      <StepsContext.Provider value={{ activeValue }}>
        <div className={tabClasses} data-testid="tabs" ref={ref} {...restProps}>
          <div data-testid="tablist" className={`${prefixCls}-tablist`}>
            {tabs}
          </div>
          <div data-testid="tabpanels" className={`${prefixCls}-tabpanels`}>
            {tabPanels}
          </div>
        </div>
      </StepsContext.Provider>
    );
  }
);
Steps.defaultProps = {
  current: 1,
  size: 'normal',
};

Steps.displayName = 'Steps';

export default Steps;
