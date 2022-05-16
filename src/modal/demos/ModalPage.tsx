import React from 'react';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Modal from '../index';
import Alert from '../../alert';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Modal 弹窗' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '模态对话框。',
        })}
      </Description>
      <Alert
        style={{ margin: '0 0 38px' }}
        message={
          <Description>
            {formatMessage({
              defaultMessage:
                'Modal组件底层使用了 [rc-dialog.js](https://www.npmjs.com/package/rc-dialog)，更多参数您可以参考该库的说明。',
            })}
          </Description>
        }
      />
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=6905%3A79848"
      />
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '默认样式，宽度固定，无title',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-modal--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '宽度固定' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '设置`size`为fixed，默认为fixed',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-modal--fixed-width-demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '宽度由内容决定' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '设置`size`属性为normal',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-modal--width-auto" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '全屏模式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '设置`size`属性为full',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-modal--full-modal" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '高度溢出' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '当内容高度超出Modal高度时，出现滚动条',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-modal--height-overflow-modal" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'Custom Button' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '`confirmLoading`用来确定按钮的loading，`okText`确定按钮自定义文字，`cancelText`关闭按钮自定义文字，`closeIcon`关闭icon自定义，`okType`，确定按钮类型',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-modal--custom-button" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'onOk and onCLose' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '`onOK`确定按钮调用，`onClose`关闭按钮调用，`afterClose`弹窗关闭后调用，可打开Action查看调用顺序',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-modal--on-close-and-on-ok" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'Hook 调用' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '可以同过hook来调用此组件，`const [modalFuncs, hookModal] = Modal.useModal(); modalFuncs.open() 为触发器，hookModal为 dom内容`',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-modal--use-modal" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Modal} />
    </>
  );
}
