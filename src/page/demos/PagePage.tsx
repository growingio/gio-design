import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Page from '../Page';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Modal 弹窗' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '根据 HTTP 响应状态码，显示对应的页面',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '403 你还没有此页面的访问权限' })}</Subheading>
      <Canvas>
        <Story id="components-page--forbidden" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '404 此页面未找到' })}</Subheading>
      <Canvas>
        <Story id="components-page--not-found" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '500 服务器发生了错误' })}</Subheading>
      <Canvas>
        <Story id="components-page--internal-server-error" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Page} />
    </>
  );
}
