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

      <Subheading>{formatMessage({ defaultMessage: '基本使用' })}</Subheading>
      <Description>`overlay`参数传tooltip内容，`children`内容是触发器，必要传值</Description>
      <Canvas>
        <Story id="upgraded-tooltip--default" />
      </Canvas>
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
        <Story id="upgraded-tooltip--tooltip-link" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'title属性' })}</Subheading>
      <Description>
        `title`属性常和`tooltipLink`属性连用，当没有overlay属性时，title生效，title理解为是tooltipLink的前缀
      </Description>
      <Canvas>
        <Story id="upgraded-tooltip--title" />
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

      <Subheading>{formatMessage({ defaultMessage: 'delay延迟' })}</Subheading>
      <Description>通过`delay`属性可以设置tooltip出现的延迟时间</Description>
      <Canvas>
        <Story id="upgraded-tooltip--delay" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'hideDelay隐藏延迟' })}</Subheading>
      <Description>通过`hideDelay`属性可以设置tooltip消失时的延迟时间</Description>
      <Canvas>
        <Story id="upgraded-tooltip--hide-delay" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'offset 位置偏移' })}</Subheading>
      <Description>通过`offset`属性可以设置tooltip的x，y轴平移</Description>
      <Canvas>
        <Story id="upgraded-tooltip--offset" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'destroyOnHide 隐藏时销毁' })}</Subheading>
      <Description>
        通过`destroyOnHide`属性可以设置tooltip的隐藏状态，默认为true，在dom中会被销毁，可设置false在dom中隐藏
      </Description>
      <Canvas>
        <Story id="upgraded-tooltip--destroy-on-hide" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Tooltip} />
    </>
  );
}
