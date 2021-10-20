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
          defaultMessage: '一个可点击的按钮，可以用在表单或文档其他需要使用简单标准按钮的地方。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/J2wZWEocPEb1DbDEj99AgD/Design-System?node-id=21%3A11843">Figma</a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li> 支持所有原生html属性</li>
        <li> 原 Icon Button 现在需要在children内传入如 &lt;Button&gt;&lt;PlusOutlined /&gt;&lt;/Button&gt;</li>
        <li>block参数取消，需在样式表中覆写 display: block，或width: 100%;</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-button--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-button--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'disable' })}</Subheading>
      <Canvas>
        <Story id="upgraded-button--disable" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'IconButton' })}</Subheading>
      <Canvas>
        <Story id="upgraded-button--icon-button-demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'blockbutton' })}</Subheading>
      <Canvas>
        <Story id="upgraded-button--block-button" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Button} />
    </>
  );
}
