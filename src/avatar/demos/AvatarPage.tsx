import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Avatar from '../Avatar';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Avatar 头像' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '用来代表用户，支持图片或字符展示。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4092%3A41169">
          Figma
        </a>
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-avatar--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-avatar--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '尺寸' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage:
            '头像有以下几种尺寸：24px、32px、56px、80px。24px、32px 常用于列表&导航展示。56px、80px 常用于用户管理。默认为字符型头像，24px、32px 头像的文字字号为 12px；56px 头像的文字字号为 16px；80px 头像的文字字号为 20px。',
        })}
      </p>
      <Canvas>
        <Story id="upgraded-avatar--size" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '可展开操作' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage: 'hover 头像可显示 icon',
        })}
      </p>
      <Canvas>
        <Story id="upgraded-avatar--hover" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '重叠展示' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage:
            '可设置组显示数量，默认为 4。当用户未设置头像时，显示该用户名称的首个文字数字或字母。hover 头像时头像前置，并显示 tooltip。',
        })}
      </p>
      <Canvas>
        <Story id="upgraded-avatar--group" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Avatar} />
    </>
  );
}
