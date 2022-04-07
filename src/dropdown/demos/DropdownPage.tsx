import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Dropdown from '../index';

export default function DropdownPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Dropdown 下拉菜单' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '菜单在临时出现的位置上显示了一系列的选项。菜单在临时的表面上显示选择列表。',
        })}
      </Description>

      <Subtitle>{formatMessage({ defaultMessage: '使用场景' })}</Subtitle>
      <Description>
        {formatMessage({
          defaultMessage:
            '主要用在表格的操作栏或用户头像中，承载一个操作列表。当用户和一个按钮、或者其他控制元件交互的时候，菜单会出现。',
        })}
      </Description>

      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=6795%3A78355"
      />

      <Subtitle>Tips</Subtitle>
      <Description>
        1. `Dropdown` 在非受控模式下，会在 `content` 外包一层 `div`，并且监听该 `div` 的 `onClick`
        事件，以实现自动隐藏和显示。
      </Description>
      <Description>
        2. 如果需要阻止 `Dropdown` 自动隐藏，可以使用 `List.Item` 或者 `CascaderItem` 的 `onClick` 回调函数，调用
        `event.stopPropagation()` 来实现
      </Description>
      <Description>
        3. 如果触发元素为 `Button` 或者 `Button.IconButton`，`Dropdown` 在展开的时候会添加一个 `active`
        参数，如果不需要，可以在 `Button` 或者 `Button.IconButton` 中设置 `active=false` 来强制覆盖。
      </Description>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '基础示例' })}</Subheading>
      <Description>`Dropdown` 组件底层使用 `Popover` 组件封装，所以可以使用 `Popover` 的所有参数。</Description>
      <Canvas>
        <Story id="upgraded-dropdown--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '包含确认框' })}</Subheading>
      <Description>
        如果您在 `Dropdown` 组件中使用了 `PopConfirm`，则需要将 `PopConfirm` 的 `children` 包裹一层 div，因为 List.Item
        onClick 的参数跟 PopConfirm 里监听 trigger onClick 的参数不一致，List.Item onClick 返回的参数为 value 而不是
        even
      </Description>
      <Canvas>
        <Story id="upgraded-dropdown--confirm" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多级菜单' })}</Subheading>
      <Canvas>
        <Story id="upgraded-dropdown--cascader" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '不可用的菜单项，和分割线' })}</Subheading>
      <Canvas>
        <Story id="upgraded-dropdown--disabled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义菜单元素' })}</Subheading>
      <Canvas>
        <Story id="upgraded-dropdown--custom-item" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Dropdown} />
    </>
  );
}
