import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Page from '../Page';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Page Result 页面结果' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '用于反馈一系列操作任务的处理结果。当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A47838">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>新增size属性，控制两种大小，normal宽度为450，small宽度为220</li>
        <li>兼容了过去的304，新的status有noResource|noAuth|noShared| 304 | 404 | 500;</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-page--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '无权限' })}</Subheading>
      <Canvas>
        <Story id="upgraded-page--no-auth" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '无资源权限' })}</Subheading>
      <Canvas>
        <Story id="upgraded-page--no-resource" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '无共享' })}</Subheading>
      <Canvas>
        <Story id="upgraded-page--no-shared" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '404 此页面未找到' })}</Subheading>
      <Canvas>
        <Story id="upgraded-page--not-found" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '500 服务器发生了错误' })}</Subheading>
      <Canvas>
        <Story id="upgraded-page--internal-server-error" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Page} />
    </>
  );
}
