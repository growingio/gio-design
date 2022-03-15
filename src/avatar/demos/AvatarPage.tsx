import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Avatar from '../Avatar';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Avatar 头像' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '用来代表用户，支持图片或字符展示。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=6876%3A80615"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '图片头像' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '通过将 `src` 属性传递到组件中，您可以创建图片头像。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-avatar--image-avatars" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '字母头像' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '通过传入一个作为 `children` 的字符串，您可以创建包含简单字符的头像组件。',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage:
            '通过设置 `omit=false` 可以解除默认只显示首字母的限制，并且还可以传入标准 `CSS` 属性 `backgroundColor` 设置字母头像的背景颜色',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-avatar--letter-avatars" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '展示 Tooltip' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '如您需要在鼠标 hover 到头像上时，给予用户提示，可以设置 `displayTooltip` 属性开启 Tooltip 提示，`tooltipTitle` 设置提示的内容。',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage: '如果是字母头像，组件会默认提示 `children` 里的内容。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-avatar--tooltip" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '尺寸' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '您可以通过 `size` 属性来设置不同大小的头像，目前 `size` 仅支持 `small`, `medium`(默认值), `large` 以及 `x-large` 四种选项',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage:
            '如果您不喜欢我们定义的尺寸大小，您还可以通过传入 `style` 属性来设置不同的 `width` 和 `height`',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-avatar--sizes" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '其他形状' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '如果您需要矩形头像组件，请设置 `mode=square`',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-avatar--modes" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '备选方案' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '如果在加载头像组件时发生错误(提供了无效的 `src` 属性)，组件将按照如下顺序切换到以下备选方案：',
        })}
      </Description>
      <ul>
        <li>
          <Description>{formatMessage({ defaultMessage: '提供的图标' })}</Description>
        </li>
        <li>
          <Description>{formatMessage({ defaultMessage: '提供的 `children` 子元素' })}</Description>
        </li>
        <li>
          <Description>{formatMessage({ defaultMessage: '一个通用头像图标组件' })}</Description>
        </li>
      </ul>
      <Canvas>
        <Story id="upgraded-avatar--fallbacks" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '分组' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '使用 `<Avatar.Group />` 组件并传入 `users` 参数，可以将头像排列成一组。用 `number` 参数来限制渲染的头像数量',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage: '`users` 参数接收一个数组，数组的元素代表每个头像组件的 `props`。`name` 相当于 `children`',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-avatar--grouped" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '包含下拉菜单的头像' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '可以设置 `droppable` 属性，可以配合 `Dropdown` 组件一起使用，实现点击头像展示下拉菜单的操作',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-avatar--dropdown-avatars" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Avatar} />
    </>
  );
}
