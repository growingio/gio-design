import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Divider from '../Divider';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Divider  分割线' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '区隔内容的横竖分割线。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4066%3A43358">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <Divider orientation="vertical" />
      </ul>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-divider--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '列表分割线' })}</Subheading>
      <Canvas>
        <Story id="upgraded-divider--horizontal" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '行内元素的垂直分割线' })}</Subheading>
      <Canvas>
        <Story id="upgraded-divider--vertical" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '适应 Flex 容器的垂直分割线' })}</Subheading>
      <Canvas>
        <Story id="upgraded-divider--flex-item" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Divider} />
    </>
  );
}
