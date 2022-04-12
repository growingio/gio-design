import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Popover from '../index';
import Alert from '../../alert';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Popover 气泡弹出框' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage:
            '通过点击或鼠标Hover元素，在目标元素附近弹出浮层提示消息，当需要用户进一步确认，可讲鼠标移动到弹出框上进行确认。',
        })}
      </Description>
      <Alert
        style={{ margin: '0 0 38px' }}
        message={
          <Description>
            {formatMessage({
              defaultMessage:
                'Popover组件底层使用了 [popover.js](https://popper.js.org/)，更多参数您可以参考该库的说明。',
            })}
          </Description>
        }
      />
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: 'Controlled' })}</Subheading>
      <Description>
        用户可通过`visible`控制Popover弹出和隐藏，并可用`onVisibleChange` 监听Popover的弹出框现实和隐藏的状态。
      </Description>
      <Canvas>
        <Story id="upgraded-popover--controlled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: ' Default Visible' })}</Subheading>
      <Description>通过`allowArrow`可控制popover的弹出框是否具有箭头，默认为`false`。</Description>
      <Description>
        当设置为`true`时，可以通过`overlayClassName`添加的className或直接使用
        `gio-popover__content`来为popover弹出框设置样式，在此样式内，可为通过`gio-popover__arrow` 设置箭头的样式。
      </Description>
      <Canvas>
        <Story id="upgraded-popover--default-visible" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Disabled' })}</Subheading>
      <Description>通过`disabled`控制popover弹出框不显示出来。</Description>
      <Canvas>
        <Story id="upgraded-popover--disabled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Support ref' })}</Subheading>
      <Description>
        当trigger支持ref，popover组件会自动使用trigger用来定位弹出框的位置。比如当trigger设置有margin时，弹出框的位置会忽略掉margin。
      </Description>
      <Canvas>
        <Story id="upgraded-popover--support-ref" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Not Support ref' })}</Subheading>
      <Description>
        当trigger是一个字符串或者数字时，本身并不支持ref参数来定位弹出框的位置，Popover组件会默认为trigger元素包裹一层span，以便准确定位了。
      </Description>
      <Canvas>
        <Story id="upgraded-popover--not-support-ref" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Placement' })}</Subheading>
      <Description>
        通过`placement`设置弹出框显示的方位，可设置为：`top`、`left`、`right`、
        `bottom`、`topLeft`、`topRight`、`bottomLeft`、`bottomRight`、
        `leftTop`、`leftBottom`、`rightTop`、`rightBottom`。
      </Description>
      <Canvas>
        <Story id="upgraded-popover--placement" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Portal' })}</Subheading>
      <Description>
        {`通过\`getContainer={() => divRef.current || document.body}\`
        来设定弹出框的挂载点，可以指定某个div或者body上。`}
      </Description>
      <Canvas>
        <Story id="upgraded-popover--portal" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Not Support ref' })}</Subheading>
      <Description>
        当trigger的元素，是一个字符串或者数字时，本身并不支持ref参数来定位弹出框的位置，Popover组件会默认为trigger元素包裹一层span，这样便可以准确定位了。
        如下面的案例，左边container设置在最外层，右边的container设置在内层，并设置30%的透明度。可以看到弹出框的透明度也发生了变化，而左边的弹出框无变化。
      </Description>
      <Canvas>
        <Story id="upgraded-popover--not-support-ref" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Trigger' })}</Subheading>
      <Description>
        通过`trigger`可以设置弹出框的弹出方式，包括：`hover`、`click`、`focus` 三种，默认是`hover`。
        同时多种trigger方式可以并用，如`[&quot;click&quot;, &quot;hover&quot;]`
      </Description>
      <Canvas>
        <Story id="upgraded-popover--trigger" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Delay and hideDelay' })}</Subheading>
      <Description>
        通过`delay`可以设置弹出框打开时的延迟时间，`hideDelay`设置弹出框关闭时的延迟时间。默认情况下，`hideDelay`默认值为`delay`的值。
      </Description>
      <Canvas>
        <Story id="upgraded-popover--delay-and-hide-delay" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Popover} />
    </>
  );
}
