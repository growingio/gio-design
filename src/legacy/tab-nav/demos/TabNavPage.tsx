import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import TabNav from '../TabNav';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'TabNav 标签导航' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '标签导航是两个或更多按钮段的集合。标签导航 TabNav 与 标签页 Tabs的区别：点击切换标签页时，页面内容随之切换；点击分段控件，切换内容由页面决定。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '块状标签导航' })}</Subheading>
      <Canvas>
        <Story id="legacy-tabnav--block" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '线状标签导航' })}</Subheading>
      <Canvas>
        <Story id="legacy-tabnav--line" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={TabNav} />
    </>
  );
}
