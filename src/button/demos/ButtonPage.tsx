import React from 'react';
import { Canvas, Title, Description, Heading, Story, Subheading, ArgsTable, Subtitle } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/blocks';

import { useIntl, FormattedMessage } from 'react-intl';
import Button from '../index';

export default function ButtonPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Button 按钮' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '按钮传达用户可以采取的行动，它可以发起一次即时操作或页面跳转。',
        })}
      </Description>
      <Subtitle>
        <FormattedMessage defaultMessage="使用场景" />
      </Subtitle>
      <Description>
        {formatMessage({
          defaultMessage: '作为一种触发器，配合下拉菜单、选择器使用；',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage: '发起一次即时操作或页面跳转，可在对话框，弹窗，表单，工具栏中使用。',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage: 'gio-design 提供了3种类型的按钮:',
        })}
      </Description>
      <ul className="gio-docs-list">
        <li>
          <code>Primary</code>{' '}
          {formatMessage({
            defaultMessage: '最重要的操作不建议在同一页面使用多个 Primary Button 通常用于“新建”、“确定”等操作',
          })}
        </li>
        <li>
          <code>Secondary</code>{' '}
          {formatMessage({
            defaultMessage: '次重要的操作',
          })}
        </li>
        <li>
          <code>Text</code>{' '}
          {formatMessage({
            defaultMessage: '重要性最低，辅助性操作',
          })}
        </li>
      </ul>
      <Description>
        {formatMessage({
          defaultMessage: '支持所有原生 button 标签属性',
        })}
      </Description>
      <Subtitle>
        <FormattedMessage defaultMessage="设计稿" />
      </Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4066%3A42614"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '按钮类型' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '三种按钮类型:Primary，Secondary，Text.不建议在同一页面使用多个Primary Button',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-button--types" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '按钮大小' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '按钮有Normal（36px）、Small（30px）两种尺寸。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-button--sizes" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '禁用状态' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-button--disabled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '带图标的按钮' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '有些时候你可能希望为某些按钮设置图标，以增强应用程序的用户体验。可以通过设置 prefix, suffix 为Svg图标来实现',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-button--contains-icon" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'Button.IconButton 图标按钮' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '图标按钮通常位于应用栏和工具栏中。 通过 Button.IconButton组件，配合Svg图标使用。可以通过设置IconButton 的style.fontSize修改图标的大小',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-button--icon-only" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '加载状态' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '添加 loading 属性即可让按钮处于加载状态。加载中状态的按钮不可点击',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-button--loading" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Block 按钮' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以通过设置Button 的style.width=100% 使按钮适合其父宽度',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-button--block-button" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '按钮的active状态' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '按钮在非禁用状态下包含hover/active样式。可以设置active=true 来给按钮添加一个active状态。可以用于按钮与Dropdown组合下拉菜单时，当下拉列表展开时给按钮一个激活状态',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-button--active" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Button} />
      <Description>
        {formatMessage({
          defaultMessage: '支持所有原生 button 标签属性',
        })}
      </Description>
    </>
  );
}
