import React from 'react';
import classnames from 'classnames';
import { useLocale, usePrefixCls } from '@gio-design/utils';
import { isUndefined } from 'lodash';
import { ResultProps } from './interfaces';
import {
  Forbidden,
  NotFound,
  Deleted,
  Locked,
  InternalServerError,
  EmptyChart,
  Empty,
  EmptyData,
  EmptyResult,
} from './images';
import Button from '../button';
import defaultLocale from './locales/zh-CN';
import { SizeContextProvider, SizeType } from '../utils/SizeContext';


/**
 * http status codes
 */
const ExceptionImageMap = {
  '404': NotFound,
  '403': Forbidden,
  '500': InternalServerError,
  '410': Deleted,
  '423': Locked
}
/**
 * empty states
 */
const EmptyImageMap = {
  'empty': Empty,
  'empty-chart': EmptyChart,
  'empty-data': EmptyData,
  'empty-result': EmptyResult,
}
const TYPE_IMAGE_MAP = {
  ...EmptyImageMap,
  ...ExceptionImageMap,
};
function Result({ className: customizeClassName, style, children, extra, type = '404', image, title: propsTitle, description, cta, size = 'normal' }: ResultProps) {
  const locale = useLocale('Result');
  const localeContent: { [key: string]: string } = {
    ...defaultLocale,
    ...locale,
  };
  type TypeMapKey = keyof typeof TYPE_IMAGE_MAP;
  const defaultTypeDescription: Record<TypeMapKey, string> = {
    'empty-chart': localeContent.emptyChart,
    'empty': localeContent.empty,
    'empty-data': localeContent.emptyData,
    "empty-result": localeContent.emptyResult,
    "403": localeContent['403'],
    "404": localeContent['404'],
    "410": localeContent['410'],
    "423": localeContent['423'],
    "500": localeContent['500'],
  };
  const prefixCls = usePrefixCls('result');
  const cls = classnames(prefixCls, `${prefixCls}-${size}`, { [`${prefixCls}-empty`]: Object.keys(EmptyImageMap).includes(type) }, `${prefixCls}-${type}`, customizeClassName);
  // description
  const defaultDesc = Object.keys(EmptyImageMap).includes(type) ? defaultTypeDescription[type] : null
  const desc = !isUndefined(description) ? description : defaultDesc;

  const img = image || React.createElement(TYPE_IMAGE_MAP[type]);
  // title
  const defaultTitle = Object.keys(EmptyImageMap).includes(type) ? null : defaultTypeDescription[type];
  const title = !isUndefined(propsTitle) ? propsTitle : defaultTitle;
  // extra
  const renderExtra = () => {
    if (cta) {
      return (<Button size={size} onClick={cta.onClick}>
        {cta.text}
      </Button>)
    }
    if (extra) {

      return extra;
    }
    return null
  }
  return (
    <div className={cls} style={style}>
      <SizeContextProvider size={size as SizeType}>
        <div className={`${prefixCls}__image ${prefixCls}__image-${type}`}>{img}</div>
        <div className={`${prefixCls}__title ${prefixCls}__title-${size}`}>{title}</div>
        <div className={classnames(`${prefixCls}__description`, `${prefixCls}__description-${size}`)}>{desc}</div>
        <div className={`${prefixCls}__extra`}>
          {renderExtra()}
        </div>
        {children && <div className={`${prefixCls}__content`}>{children}</div>}
      </SizeContextProvider>
    </div>
  );
}

const ResultImage: {
  ImgForbidden: React.ReactNode;
  ImgNotFound: React.ReactNode;
  ImgInternalServerError: React.ReactNode;
  ImgDeleted: React.ReactNode;
  ImgLocked: React.ReactNode;
  ImgEmpty: React.ReactNode;
  ImgEmptyChart: React.ReactNode;
  ImgEmptyData: React.ReactNode;
  ImgEmptyResult: React.ReactNode;
} = {
  ImgForbidden: TYPE_IMAGE_MAP['403'],
  ImgNotFound: TYPE_IMAGE_MAP['404'],
  ImgInternalServerError: TYPE_IMAGE_MAP['500'],
  ImgDeleted: TYPE_IMAGE_MAP['410'],
  ImgLocked: TYPE_IMAGE_MAP['423'],
  ImgEmpty: TYPE_IMAGE_MAP.empty,
  ImgEmptyChart: TYPE_IMAGE_MAP['empty-chart'],
  ImgEmptyData: TYPE_IMAGE_MAP['empty-data'],
  ImgEmptyResult: TYPE_IMAGE_MAP['empty-result']
};
export { Result, ResultImage };

