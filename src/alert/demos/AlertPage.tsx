import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Alert from '../Alert';

export default function AlertPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Alert 警告信息' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '当某个页面需要向用户显示警告、提示的信息时使用，这部分信息是用户必须了解的。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '使用场景' })}</Subtitle>
      <Description>
        {formatMessage({ defaultMessage: '通常为页面级提示信息，提示重要性高，通常位置在页面或弹窗顶部。' })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4093%3A45313"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '简单的警告提示' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '`Alert` 组件有四种不同程度的级别，每种都有自己独特的颜色。' })}
      </Description>
      <Canvas>
        <Story id="upgraded-alert--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '描述信息' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '您可以使用 `description` 属性在标题下方显示描述信息。' })}
      </Description>
      <Canvas>
        <Story id="upgraded-alert--description" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '图标' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '您可以设置 `showIcon` 属性来显示默认的图标。您也可以设置 `icon` 属性，覆盖默认的图标。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-alert--icons" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '可关闭的' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '您可以设置 `closeable` 属性，在 Alert 组件的右侧展示一个关闭按钮，点击后会隐藏 Alert 组件，同时触发 `onClose` 事件。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-alert--closeable" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Alert} />
    </>
  );
}
