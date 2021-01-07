import React from 'react';
import classNames from 'classnames';
import { isString } from 'lodash/fp';
import { isUndefined } from 'lodash';
import { CardMetaProps } from './interfaces';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const Meta = ({
  title,
  description,
  image,
  className,
  children,
  style
}: CardMetaProps) => {
  const prefixCls = usePrefixCls('card-meta');

  const renderImage = () => {
    if(isUndefined(image)) return undefined;
    if(isString(image)) return <img src={image} className={`${prefixCls}-image`} alt="" />;
    return React.cloneElement(image, { className: classNames(`${prefixCls}-image`, image.props.className) });
  }

  const renderDetail = () => {
    if(isUndefined(title) && isUndefined(description)) return undefined;
    return (
      <div className={`${prefixCls}-detail`}>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        {description && <div className={`${prefixCls}-description`}>{description}</div>}
      </div>
    );
  } 

  const renderInfo = () => {
    if(isUndefined(image)) return renderDetail();
    return (
      <div className={`${prefixCls}-info`}>
        {renderImage()}
        {renderDetail()}
      </div>
    );
  }

  const renderChildren = () => {
    if(isUndefined(children)) return undefined;
    return (
      <div className={`${prefixCls}-content`}>
        {children}
      </div>
    )
  }
  
  return (
    <div className={classNames(prefixCls, className)} style={style}>
      {renderInfo()}
      {renderChildren()}
    </div>
  );
}

export default Meta;