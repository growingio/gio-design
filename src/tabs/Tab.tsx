import React, { useContext } from 'react';
import classnames from 'classnames';
import { WithCommonProps } from '../utils/interfaces';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { TabProps } from './interface';
import TabsContext from './context';

const Tab: React.FC<WithCommonProps<TabProps>> = ({ value, children, classname, style }) => {
  const prefixCls = usePrefixCls('tabs-new-tabpanel');
  const { activeValue } = useContext(TabsContext);

  if (!children) return null;
  return (
    <div
      className={classnames(classname, prefixCls, { [`${prefixCls}-active`]: activeValue === value })}
      style={style}
      role="tabpanel"
      data-testid="tabpanel"
    >
      {children}
    </div>
  );
};

export default Tab;
