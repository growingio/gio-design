import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Tabs from '../Tabs';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Tabs 标签页' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '提供平级的区域将大块内容进行收纳和展现，保持界面整洁、层级清晰',
        })}
      </p>

      <Heading>{formatMessage({ defaultMessage: '块状标签导航' })}</Heading>
      <Subheading>
        {formatMessage({ defaultMessage: '一共四种尺寸：L（40px）、M（36px）、S（30px）、XS（24px）。' })}
      </Subheading>
      <Canvas>
        <Story id="legacy-tabs--block" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '线状标签导航' })}</Heading>
      <Subheading>
        {formatMessage({ defaultMessage: '提供平级的区域将大块内容进行收纳和展现，保持界面整洁、层级清晰。' })}
      </Subheading>
      <Subheading>{formatMessage({ defaultMessage: '一共三种尺寸：L（40px）、M（36px）、S（30px）。' })}</Subheading>
      <Canvas>
        <Story id="legacy-tabs--icon" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Tabs} />
    </>
  );
}
