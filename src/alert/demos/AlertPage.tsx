import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Alert from '../Alert';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Alert 警告信息' })}</Title>
      <p>
        当某个页面需要向用户显示警告、提示的信息时使用，这部分信息是用户必须了解的，例如未对公众号进行授权则影响某些功能的使用。
      </p>
      <p>通常为页面级提示信息，提示重要性高，通常位置在页面或弹窗顶部。</p>
      <p> Alert宽度根据不同使用场景，可以设置为固定宽度，内容超长时，换行展示。</p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A45313">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>移除size样式控制</li>
        <li>移除texticon自定义关闭按钮</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: 'Demo' })}</Subheading>
      <Canvas>
        <Story id="upgraded-alert--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default' })}</Subheading>
      <Canvas>
        <Story id="upgraded-alert--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Icon & 标题 & 关闭' })}</Subheading>
      <Canvas>
        <Story id="upgraded-alert--no-description" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Icon & 正文 & 关闭' })}</Subheading>
      <Canvas>
        <Story id="upgraded-alert--no-title" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '标题 & 正文 & 关闭' })}</Subheading>
      <Canvas>
        <Story id="upgraded-alert--no-icon" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Icon & 标题 & 正文 ' })}</Subheading>
      <Canvas>
        <Story id="upgraded-alert--no-close" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Alert} />
    </>
  );
}
