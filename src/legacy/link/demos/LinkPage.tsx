import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Link from '../Link';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Link 链接' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '用于表示当前内容可进行页面跳转。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '默认' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage: '默认使用 a 标签作为组件。',
        })}
      </p>
      <Canvas>
        <Story id="legacy-link--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '禁用' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage: '失效状态，不可点击。',
        })}
      </p>
      <Canvas>
        <Story id="legacy-link--disabled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义组件' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage: '可以 component props 来自定义组件。',
        })}
      </p>
      <Canvas>
        <Story id="legacy-link--custom-component" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Link} />
    </>
  );
}
