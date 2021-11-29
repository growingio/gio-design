import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Drawer from '../index';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Drawer 抽屉' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '基于modal，可支持固定宽度（默认为500px）和 内容撑开。',
        })}
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>
          封装自rc-dialog，详情
          <a href="https://github.com/react-component/dialog">rc-dialog</a>
        </li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-drawer--adaptive-width-demo" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '固定宽度 Drawer' })}</Subheading>
      <Canvas>
        <Story id="upgraded-drawer--fixed-width-demo" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Drawer} />
    </>
  );
}
