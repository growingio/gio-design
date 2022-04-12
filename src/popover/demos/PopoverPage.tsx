import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Popover from '../index';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Popover 气泡确认框' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage:
            '通过点击或鼠标Hover元素，在目标元素附近弹出浮层提示消息，当需要用户进一步确认，可讲鼠标移动到弹出框上进行确认。',
        })}
      </Description>
      <Description>Upgrading Guide</Description>
      <ul>
        <li>样式：Popover的弹出框无样式。</li>
        <li>API变化：内容由content包裹，去除了footer，组件用到了react-popper</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: 'controlled' })}</Subheading>
      <Description>
        用户可通过`visible`控制Popover弹出和隐藏，并可用`onVisibleChange` 监听Popover的弹出框现实和隐藏的状态。
      </Description>
      <Canvas>
        <Story id="upgraded-popover--controlled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'default-visible' })}</Subheading>
      <Description>通过`allowArrow`可控制popover的弹出框是否具有箭头，默认为`false`。</Description>
      <Description>
        当设置为`true`时，可以通过`overlayClassName`添加的className或直接使用
        `gio-popover__content`来为popover弹出框设置样式，在此样式内，可为通过`gio-popover__arrow` 设置箭头的样式。
      </Description>
      <Canvas>
        <Story id="upgraded-popover--default-visible" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'disabled' })}</Subheading>
      <Description>通过`disabled`控制popover弹出框不显示出来。</Description>
      <Canvas>
        <Story id="upgraded-popover--disabled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'support-ref' })}</Subheading>
      <Description>
        当trigger支持ref，popover组件会自动使用trigger用来定位弹出框的位置。比如当trigger设置有margin时，弹出框的位置会忽略掉margin。
      </Description>
      <Canvas>
        <Story id="upgraded-popover--support-ref" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'placement' })}</Subheading>
      <Description>
        通过`placement`设置弹出框显示的方位，可设置为：`top`、`left`、`right`、
        `bottom`、`topLeft`、`topRight`、`bottomLeft`、`bottomRight`、
        `leftTop`、`leftBottom`、`rightTop`、`rightBottom`。
      </Description>
      <Canvas>
        <Story id="upgraded-popover--placement" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'portal' })}</Subheading>
      <Description>
        {`通过\`getContainer={(node) => node?.parentElement || document.body}\`
        来设定弹出框的挂载点，可以指定某个div或者body上。`}
      </Description>
      <Canvas>
        <Story id="upgraded-popover--portal" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'support-ref' })}</Subheading>
      <Description>
        当trigger的元素，是一个字符串或者数字时，本身并不支持ref参数来定位弹出框的位置，Popover组件会默认为trigger元素包裹一层span，这样便可以准确定位了。
      </Description>
      <Canvas>
        <Story id="upgraded-popover--support-ref" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'trigger' })}</Subheading>
      <Description>
        通过`trigger`可以设置弹出框的弹出方式，包括：`hover`、`click`、`focus` 三种，默认是`hover`。
        同时多种trigger方式可以并用，如`[&quot;click&quot;, &quot;hover&quot;]`
      </Description>
      <Canvas>
        <Story id="upgraded-popover--trigger" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Popover} />
    </>
  );
}
