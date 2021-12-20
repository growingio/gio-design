import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Dropdown from '../index';

export default function DropdownPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Dropdown 下拉菜单' })}</Title>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式变化：新版dropdown等下拉菜单拥有更圆润的边框。</li>
        <li>APi变动：包装的Popover，弹出内容更名为content，children包装触发器。</li>
        <li>Dropdown 封装自 popover</li>
        <li>
          Dropdown 在非受控模式下，会在 content 外包一层 div，并且监听该 div 的 onClick 事件，以实现自动隐藏和显示。
        </li>
        <li>
          如果需要阻止 Dropdown 自动隐藏，可以使用 List.Item 或者 CascaderItem 的 onClick 回调函数，调用
          event.stopPropagation() 来实现
        </li>
        <li>
          在 Table 中使用 Dropdown，如果 该 Table 有 rowClick 监听事件，则可以使用 Dropdown 的 onContentClick 回调函数的
          event.stopPropagation() 停止事件传递
        </li>
        <li>
          如果触发元素为 Button 或者 IconButton，Dropdown 在展开的时候会添加一个 active 参数，如果不需要，可以在 Button
          或者 IconButton 中设置 active={`{false}`} 来强制覆盖。
        </li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例' })}</Subheading>
      <Canvas>
        <Story id="upgraded-dropdown--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-dropdown--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '不可用的菜单项，和分割线' })}</Subheading>
      <Canvas>
        <Story id="upgraded-dropdown--disabled" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Dropdown} />
    </>
  );
}
