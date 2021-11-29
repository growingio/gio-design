import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Layout from '../index';

export default function LayoutPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Layout 布局' })}</Title>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式变化：内部的tooltip和list重做，样式有些变化，</li>
        <li>APi变动：无变化。</li>
      </ul>
      <Subheading>{formatMessage({ defaultMessage: '无侧导航页面' })}</Subheading>
      <Canvas>
        <Story id="upgraded-layout--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '嵌入式展开侧导航' })}</Subheading>
      <Canvas>
        <Story id="upgraded-layout--sider" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '悬浮式展开侧导航' })}</Subheading>
      <Canvas>
        <Story id="upgraded-layout--suspend" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Layout} />
    </>
  );
}
