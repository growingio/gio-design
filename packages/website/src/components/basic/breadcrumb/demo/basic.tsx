import * as React from 'react';
import Breadcrumb from '@gio-design/components/es/components/breadcrumb';
import '@gio-design/components/es/components/breadcrumb/style/css.js';

export default () => {
  const routes = [
    {
      path: 'components',
      breadcrumbName: '首页',
    },
    {
      path: 'basic',
      breadcrumbName: '一级面包屑',
    },
    {
      path: 'breadcrumb',
      breadcrumbName: '二级面包屑',
    },
  ];
  return (
    <div>
      <Breadcrumb routes={routes} />
      <Breadcrumb>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/components/basic/breadcrumb">一级面包屑</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="breadcrumb">二级面包屑</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>三级面包屑</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};
