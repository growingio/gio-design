import classNames from 'classnames';
import React from 'react';
import { usePrefixCls } from '..';
import WithRef from '../utils/withRef';
import BreadcrumbsProps from './interface';

const Breadcrumb = WithRef<HTMLElement, BreadcrumbsProps>((props, ref) => {
  const { separator = '/', className, children, ...otherProps } = props;
  const prefixCls = usePrefixCls('breadcrumb');
  const classes = classNames([className, prefixCls]);

  const breadcrumbItems = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child))
    .map((child, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <li className={`${prefixCls}__li`} key={`${prefixCls}-li-${index}`}>
        {child}
      </li>
    ));

  return (
    <nav ref={ref} className={classes} aria-label="breadcrumb" data-testid="breadcrumb" {...otherProps}>
      <ol className={`${prefixCls}__ol`}>
        {breadcrumbItems.map((child, index) => {
          if (index === breadcrumbItems.length - 1) return child;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={`${prefixCls}-fragment-${index}`}>
              {child}
              {/* eslint-disable-next-line react/no-array-index-key */}
              <li aria-hidden className={`${prefixCls}__separator`} key={`${prefixCls}-separator-${index}`}>
                {separator}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumbs';

Breadcrumb.defaultProps = {
  separator: '/',
};

export default Breadcrumb;
