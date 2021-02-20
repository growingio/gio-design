import React from 'react';
import classnames from 'classnames';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import NoDataImage from './NoDataImage';
import NoResultImage from './NoResultImage';
import { EmptyProps } from './interfaces';
import Button from '../button';

const Empty: React.FC<EmptyProps> & { NO_DATA_IMAGE: React.FC; NO_RESULT_IMAGE: React.ReactNode } = ({
  className,
  style,
  size = 'large',
  image = 'no-data',
  description = 'No data',
  cta,
}: EmptyProps) => {
  const prefixCls = usePrefixCls('empty');
  const cls = classnames(
    prefixCls,
    {
      [`${prefixCls}--${size}`]: true,
    },
    className
  );
  let imageContent;
  if (image === 'no-data') {
    imageContent = <NoDataImage />;
  } else if (image === 'no-result') {
    imageContent = <NoResultImage />;
  } else {
    imageContent = image;
  }

  return (
    <div className={cls} style={style}>
      <div className={`${prefixCls}__image`}>{imageContent}</div>
      {description && <div className={`${prefixCls}__description`}>{description}</div>}
      {cta && (
        <div className={`${prefixCls}__footer`}>
          <Button size={size} onClick={cta.onClick}>
            {cta.text}
          </Button>
        </div>
      )}
    </div>
  );
};

Empty.NO_DATA_IMAGE = NoDataImage;
Empty.NO_RESULT_IMAGE = NoResultImage;

export default Empty;
