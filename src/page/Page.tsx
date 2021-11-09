import React from 'react';
import classnames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
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

export const typeMap = {
  empty: {
    image: EmptyImage,
    description: '你还没有属于自己的看板，快去新建一个吧',
  },
  noData: {
    image: NoDataImage,
    description: '你还没有创建内容，快去创建一个吧',
  },
  noResult: {
    image: NoResultImage,
    description: '没有搜索到相关结果',
  },
  noFind: {
    image: NoFindImage,
    description: '当前查询条件下暂无数据',
  },
  noAuth: {
    image: ForbiddenSVG,
    description: '无访问权限，请联系管理员',
  },
  noResource: {
    image: DeletedSVG,
    description: '该项目已删除',
  },
  noShared: {
    image: SharedSVG,
    description: '此看板已取消与你共享',
  },
  '304': {
    image: ForbiddenSVG,
    description: '无访问权限，请联系管理员',
  },
  '404': {
    image: NotFoundSVG,
    description: '抱歉，出现了一个错误，页面不见了',
  },
  '500': {
    image: InternalServerErrorSVG,
    description: '抱歉，服务器出现了错误',
  },
};

function Page({ className, style, type = 'noData', image, description, cta, size = 'normal' }: PageProps) {
  const prefixCls = usePrefixCls('page-new');
  const cls = classnames(prefixCls, className, {
    [`${prefixCls}-empty`]: ['empty', 'noData', 'noResult', 'noFind'].includes(type),
  });
  const des = description || typeMap[type].description;
  const img = image || typeMap[type].image;

  return (
    <div className={cls} style={style}>
      <div className={classnames(`${prefixCls}__image`, `${prefixCls}__image-${size}`)}>
        {React.createElement(img as string)}
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
