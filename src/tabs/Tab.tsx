import React, { useContext } from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { WithCommonProps } from '../utils/interfaces';
import { TabProps } from './interface';
import TabsContext from './context';

const Tab: React.FC<WithCommonProps<TabProps>> = ({ value, children, className: classname, style }) => {
  const prefixCls = usePrefixCls('tabs-tabpanel');
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
