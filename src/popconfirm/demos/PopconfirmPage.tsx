import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Popconfirm from '../index';
import Alert from '../../alert';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Popconfirm 气泡确认框' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage:
            '点击元素，弹出气泡式的确认框。目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。',
        })}
      </Description>
      <Alert
        style={{ margin: '0 0 38px' }}
        message={
          <Description>
            {formatMessage({
              defaultMessage:
                'PopConfirm组件底层使用了 [popover.js](https://popper.js.org/)，更多参数您可以参考该库的说明。',
            })}
          </Description>
        }
      />
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4093%3A45837"
      />
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: 'controlled' })}</Subheading>
      <Description>
        用户可通过`visible`控制`PopConfirm`弹出和隐藏，并可用`onVisibleChange`
        监听`PopConfirm`的弹出框现实和隐藏的状态。同时通过`onCancel`和`onConfirm`来关闭弹出框。
      </Description>
      <Canvas>
        <Story id="upgraded-popconfirm--controlled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'description' })}</Subheading>
      <Description>
        通过`title`和`desc`为`PopConfirm`弹出框添加标题和描述，当`desc`为空时，则不现实描述信息。
      </Description>
      <Canvas>
        <Story id="upgraded-popconfirm--description" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'disabled' })}</Subheading>
      <Description>通过`disabled`来控制是否显示`PopConfirm`弹出框。</Description>
      <Canvas>
        <Story id="upgraded-popconfirm--disabled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'placement' })}</Subheading>
      <Description>
        通过`placement`设置弹出框显示的方位，可设置为：`top`、`left`、`right`、
        `bottom`、`topLeft`、`topRight`、`bottomLeft`、`bottomRight`、
        `leftTop`、`leftBottom`、`rightTop`、`rightBottom`。
      </Description>
      <Canvas>
        <Story id="upgraded-popconfirm--placement" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'trigger' })}</Subheading>
      <Description>
        通过`trigger`可以设置弹出框的弹出方式，包括：`hover`、`click`、`focus` 三种，默认是`hover`。
        同时多种trigger方式可以并用，如`[&quot;click&quot;, &quot;hover&quot;]`
      </Description>
      <Canvas>
        <Story id="upgraded-popconfirm--trigger" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Popconfirm} />
    </>
  );
}
