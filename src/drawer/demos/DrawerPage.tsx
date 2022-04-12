import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import { useIntl } from 'react-intl';
import Drawer from '../index';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Drawer 抽屉' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '屏幕边缘滑出的浮层面板，用于承载更详细的内容或操作。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4093%3A44795"
      />
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Description>
       {formatMessage({
          defaultMessage: ' `drawer` 封装自`rc-dialog`',
        })}
      </Description>
      <Subheading>
      <a href='https://github.com/react-component/dialog'>rc-dialog</a>
      </Subheading>
      <Subheading>{formatMessage({ defaultMessage: '默认样式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '默认样式，宽度固定，无title',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-drawer--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '宽度撑开' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '宽度由内容决定，`fixed`属性设置为false',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-drawer--adaptive" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '无关闭按钮' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '设置`closable`属性为false,默认为true',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-drawer--closable" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '固定宽度 Drawer' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '设置`fixed` 属性，实现宽度固定500px，原size属性依旧生效，未来将弃用',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-drawer--fixed" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '自定义宽度' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '设置`width`属性为string或number，实现自定义宽度',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-drawer--custom-width" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'onClose & afterClose' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`onClose`属性为点击关闭按钮时触发，`afterClose`为dialog动画结束后执行(无参数)，请打开控制台看执行顺序差异',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-drawer--on-close-and-after-close" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '蒙版去除' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '设置`mask`属性为false',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-drawer--mask" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '自定义closeIcon' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '设置`closeIcon`属性为自定义Node',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-drawer--close-icon" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'mask样式和drawer样式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '设置`maskStyle`属性 和 `bodyStyle` 属性',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-drawer--mask-style-or-body-style" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '用例演示' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`title`属性，`footer` children 等 ',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-drawer--demo" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Drawer} />
    </>
  );
}
