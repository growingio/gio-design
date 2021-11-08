import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { PageProps } from './interfaces';
import ForbiddenSVG from './ForbiddenSVG';
import NotFoundSVG from './NotFoundSVG';
import DeletedSVG from './DeletedSVG';
import SharedSVG from './SharedSVG';
import InternalServerErrorSVG from './InternalServerErrorSVG';
import Button from '../button';

const statusCodeMap = {
  noAuth: ForbiddenSVG,
  noResource: DeletedSVG,
  noShared: SharedSVG,
  304: ForbiddenSVG,
  404: NotFoundSVG,
  500: InternalServerErrorSVG,
};

function Page({ className, style, statusCode, description, cta, size = 'normal' }: PageProps) {
  const prefixCls = usePrefixCls('page-new');
  const cls = classnames(prefixCls, className);
  return (
    <div className={cls} style={style}>
      <div className={classnames(`${prefixCls}__image`, `${prefixCls}__image-${size}`)}>
        {React.createElement(statusCodeMap[statusCode])}
      </div>
      <div className={classnames(`${prefixCls}__description`, `${prefixCls}__description-${size}`)}>{description}</div>
      {cta && (
        <div className={`${prefixCls}__footer`}>
          <Button size={size} onClick={cta.onClick}>
            {cta.text}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Page;
