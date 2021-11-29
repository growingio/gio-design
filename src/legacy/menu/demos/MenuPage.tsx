import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Menu from '../Menu';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: ' Menu 导航菜单' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '提供平级的区域将大块内容进行收纳和展现，保持界面整洁、层级清晰。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '垂直模式' })}</Subheading>
      <Canvas>
        <Story id="legacy-menu--vertical" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '水平模式' })}</Subheading>
      <Canvas>
        <Story id="legacy-menu--horizontal" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Menu} />
    </>
  );
}
