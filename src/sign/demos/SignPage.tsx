import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Sign from '../Sign';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Sign 标记' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '图标右上角的圆形徽标数字。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4092%3A41172">
          Figma
        </a>
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '默认-数字标记' })}</Subheading>
      <Canvas>
        <Story id="upgraded-sign--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '状态标记' })}</Subheading>
      <Canvas>
        <Story id="upgraded-sign--dot-sign" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Sign} />
    </>
  );
}
