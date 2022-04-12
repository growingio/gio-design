import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Tooltip from '..';
import Alert from '../../alert';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Tooltip 文字提示' })}</Title>
      <Description>简单的文字提示气泡框。鼠标悬停时显示提示，移出即消失，气泡浮层不承载复杂文本和操作。</Description>

      <Alert
        style={{ margin: '0 0 38px' }}
        message={
          <Description>
            {formatMessage({
              defaultMessage:
                'Tooltip组件底层使用了 [popover.js](https://popper.js.org/)，更多参数您可以参考该库的说明。',
            })}
          </Description>
        }
      />

      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A45835"
      />
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '可控制弹出框' })}</Subheading>
      <Description>
        用户可通过`visible`控制Tooltip弹出和隐藏，并可用`onVisibleChange` 监听Tooltip的弹出框现实和隐藏的状态。
      </Description>
      <Canvas>
        <Story id="upgraded-tooltip--controlled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'Disabled' })}</Subheading>

      <Description>通过`disabled`来控制是否显示`tooltip`弹出框。</Description>
      <Canvas>
        <Story id="upgraded-tooltip--disabled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多行消息' })}</Subheading>
      <Description>`Tooltip`的消息弹出框，具有最大宽度`500px`，当消息的过长时，会自动折行。</Description>
      <Canvas>
        <Story id="upgraded-tooltip--multi-line" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '查看链接功能' })}</Subheading>
      <Description>{`通过\`tooltipLink: { name: '点击这里', link: 'www.growingio.com' }\`设置，可以为\`tooltip\`添加一个link。`}</Description>
      <Canvas>
        <Story id="upgraded-tooltip--link" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Placement' })}</Subheading>
      <Description>
        通过`placement`设置弹出框显示的方位，可设置为：`top`、`left`、`right`、
        `bottom`、`topLeft`、`topRight`、`bottomLeft`、`bottomRight`、
        `leftTop`、`leftBottom`、`rightTop`、`rightBottom`。
      </Description>
      <Canvas>
        <Story id="upgraded-tooltip--placement" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '触发方式' })}</Subheading>
      <Description>
        通过`trigger`可以设置弹出框的弹出方式，包括：`hover`、`click`、`focus` 三种，默认是`hover`。
        同时多种trigger方式可以并用，如`[&quot;click&quot;, &quot;hover&quot;]`
      </Description>
      <Canvas>
        <Story id="upgraded-tooltip--trigger" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Tooltip} />
    </>
  );
}
