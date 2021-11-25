import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Modal from '../index';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Modal 弹窗' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '在当前页面正中打开一个浮层',
        })}
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式变化：过渡动画移除</li>
        <li>调用方式有三种，组件，func，hook</li>
        <li>APi变动：size有full和fixed两种，其他api请看rc；</li>
        <li>
          此组件包装自rc-dialog;
          <a href="https://www.npmjs.com/package/rc-dialog">rc-dialog</a>
        </li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-modal--open-modal" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '宽度自动撑开' })}</Subheading>
      <Canvas>
        <Story id="upgraded-modal--adaptive-width-demo" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '宽度固定' })}</Subheading>
      <Canvas>
        <Story id="upgraded-modal--fixed-width-demo" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '全屏模式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-modal--full-modal" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '高度溢出' })}</Subheading>
      <Canvas>
        <Story id="upgraded-modal--height-overflow-modal" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'Hook 调用' })}</Subheading>
      <Canvas>
        <Story id="upgraded-modal--use-modal" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Modal} />
    </>
  );
}
