import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Banner from '../Banner';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Banner 横幅' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '将重要的信息通知到用户，例如：线下活动报名，系统维护等通知',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '信息通知' })}</Subheading>
      <Canvas>
        <Story id="legacy-banner--base" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '警告通知' })}</Subheading>
      <Canvas>
        <Story id="legacy-banner--alert" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '可关闭' })}</Subheading>
      <Canvas>
        <Story id="legacy-banner--closeable" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Banner} />
    </>
  );
}
