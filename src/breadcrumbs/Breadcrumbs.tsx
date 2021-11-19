import classNames from 'classnames';
import React from 'react';
import { usePrefixCls } from '@gio-design/utils';
import WithRef from '../utils/withRef';
import BreadcrumbsProps from './interface';

const Breadcrumbs = WithRef<HTMLElement, BreadcrumbsProps>(
  ({ separator = '/', className, children, ...otherProps }: BreadcrumbsProps, ref) => {
    const prefixCls = usePrefixCls('breadcrumbs-new');
    const classes = classNames([className, prefixCls]);

    const breadcrumbsItems = React.Children.toArray(children)
      .filter((child) => React.isValidElement(child))
      .map((child, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <li className={`${prefixCls}__li`} key={`${prefixCls}-li-${index}`}>
          {child}
        </li>
      ));

    return (
      <nav ref={ref} className={classes} aria-label="breadcrumbs" data-testid="breadcrumbs" {...otherProps}>
        <ol className={`${prefixCls}__ol`}>
          {breadcrumbsItems.map((child, index) => {
            if (index === breadcrumbsItems.length - 1) return child;
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
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';

Breadcrumbs.defaultProps = {
  separator: '/',
};

export default Breadcrumbs;
