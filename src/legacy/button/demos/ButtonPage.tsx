import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Button from '../index';

export default function ButtonPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Button 按钮' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '触发后即执行相应操作。按钮通常使用在页面或弹窗等多种场景中，例如新建、删除等。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '默认按钮' })}</Subheading>
      <Canvas>
        <Story id="legacy-button--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '主要按钮' })}</Subheading>
      <Canvas>
        <Story id="legacy-button--primary-button" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '次要按钮' })}</Subheading>
      <Canvas>
        <Story id="legacy-button--secondary-button" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '文本按钮' })}</Subheading>
      <Canvas>
        <Story id="legacy-button--text-button" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Block宽度按钮' })}</Subheading>
      <Canvas>
        <Story id="legacy-button--block-button" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '图标按钮' })}</Subheading>
      <Canvas>
        <Story id="legacy-button--icon-button" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Button} />
    </>
  );
}
