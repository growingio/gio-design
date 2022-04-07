import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import { useIntl } from 'react-intl';
import Tag from '../Tag';
import Alert from '../../alert';

export default function TagPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Tag 标签' })}</Title>
      <Description>{formatMessage({ defaultMessage: '进行标记和分类的标签，作为已选内容的标签。' })}</Description>

      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4092%3A41171"
      />
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tag--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '标签类型和状态' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '标签支持两种类型（`normal`、`highlight`），和六种状态（`default`、`success`、`info`、`warning`、`error`、`draft`）',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tag--status-and-types" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '标签尺寸' })}</Subheading>
      <Canvas>
        <Story id="upgraded-tag--sizes" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '可关闭的标签' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '设置 `closable` 属性，可以为标签添加一个关闭按钮，点击关闭按钮会触发 `onClose` 事件。',
        })}
      </Description>
      <Alert
        message={
          <Description>
            {formatMessage({ defaultMessage: '可关闭标签仅支持 `type="normal"` 和 `status="default"` 类型的标签' })}
          </Description>
        }
      />
      <Canvas>
        <Story id="upgraded-tag--closable" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '标签禁用' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '主要用在`可关闭标签中`，设置了 `disabled` 属性，标签将不可关闭。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-tag--disabled" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Tag} />
    </>
  );
}
