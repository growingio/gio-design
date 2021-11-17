import React from 'react';
import classnames from 'classnames';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import { PageProps } from './interfaces';
import ForbiddenSVG from './svg/ForbiddenSVG';
import NotFoundSVG from './svg/NotFoundSVG';
import DeletedSVG from './svg/DeletedSVG';
import SharedSVG from './svg/SharedSVG';
import InternalServerErrorSVG from './svg/InternalServerErrorSVG';
import EmptyImage from './svg/EmptyImageSVG';
import NoDataImage from './svg/NoDataImageSVG';
import NoResultImage from './svg/NoResultImageSVG';
import NoFindImage from './svg/NoFindImageSVG';
import Button from '../button';
import defaultLocale from './locales/zh-CN';

function Page({ className, style, type = 'noData', image, description, cta, size = 'normal' }: PageProps) {
  const locale = useLocale('Page');
  const localeContent: { [key: string]: string } = {
    ...defaultLocale,
    ...locale,
  };
  const typeMap = {
    empty: {
      image: EmptyImage,
      description: localeContent.empty,
    },
    noData: {
      image: NoDataImage,
      description: localeContent.noData,
    },
    noResult: {
      image: NoResultImage,
      description: localeContent.noResult,
    },
    noFind: {
      image: NoFindImage,
      description: localeContent.noFind,
    },
    noAuth: {
      image: ForbiddenSVG,
      description: localeContent.noAuth,
    },
    noResource: {
      image: DeletedSVG,
      description: localeContent.noResource,
    },
    noShared: {
      image: SharedSVG,
      description: localeContent.noShared,
    },
    type304: {
      image: ForbiddenSVG,
      description: localeContent.type304,
    },
    type404: {
      image: NotFoundSVG,
      description: localeContent.type404,
    },
    type500: {
      image: InternalServerErrorSVG,
      description: localeContent.type500,
    },
  };
  const prefixCls = usePrefixCls('page-new');
  const cls = classnames(prefixCls, `${prefixCls}-${size}`, className, {
    [`${prefixCls}-empty`]: ['empty', 'noData', 'noResult', 'noFind'].includes(type),
  });
  const des = description || typeMap[type].description;
  const img = image || typeMap[type].image;

  return (
    <div className={cls} style={style}>
      <div className={classnames(`${prefixCls}__image`, `${prefixCls}__image-${size}`)}>
        {React.createElement(img as React.ElementType)}
      </div>
      <div className={classnames(`${prefixCls}__description`, `${prefixCls}__description-${size}`)}>{des}</div>
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
