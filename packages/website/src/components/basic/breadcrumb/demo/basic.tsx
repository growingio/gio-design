import * as React from 'react';
import { Breadcrumb } from '@gio-design/components';
import '@gio-design/components/es/components/checkbox/style/css.js';

export default () => {
  const routes = [{
    path: 'index',
    breadcrumbName: '首页',
    onClick: () => {alert('首页')}
  }, {
    breadcrumbName: '一级面包屑',
    onClick: () => {alert('一级面包屑')}
  }, {
    breadcrumbName: '二级面包屑'
  }];
  return (
    <>
      <Breadcrumb routes={routes} />
    </>
  );
};
