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
        {formatMessage({
          defaultMessage:
            '当某个页面需要向用户显示警告、提示的信息时使用，这部分信息是用户必须了解的，例如未对公众号进行授权则影响某些功能的使用。通常为页面级提示信息，提示重要性高，通常位置在页面或弹窗顶部。Alert宽度根据不同使用场景，可以设置为固定宽度，内容超长时，换行展示。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: 'Icon、标题、正文、关闭按钮' })}</Subheading>
      <Canvas>
        <Story id="components-alert--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Icon & 标题 & 关闭' })}</Subheading>
      <Canvas>
        <Story id="components-alert--no-description" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Icon & 正文 & 关闭' })}</Subheading>
      <Canvas>
        <Story id="components-alert--no-title" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '标题 & 正文 & 关闭' })}</Subheading>
      <Canvas>
        <Story id="components-alert--no-icon" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Icon & 标题 & 正文 ' })}</Subheading>
      <Canvas>
        <Story id="components-alert--no-close" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Alert} />
    </>
  );
}
