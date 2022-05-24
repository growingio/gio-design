import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, Subtitle, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Alert from '../../alert';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Toast 全局提示' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage:
            '全局展示成功、警告和错误等反馈信息。顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。通常为对于操作成功或失败的状态提示，提示重要性偏低，位置悬浮于页面，默认在操作完成后的一定时间（参数可控）消失。Toast宽度随内容自适应。',
        })}
      </Description>
      <Alert
        style={{ margin: '0 0 38px' }}
        message={
          <Description>
            {formatMessage({
              defaultMessage:
                'Toast组件底层使用了 [rc-notification](https://github.com/react-component/notification)，更多参数您可以参考该库的说明。',
            })}
          </Description>
        }
      />
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A45841"
      />
      <Description>
        {formatMessage({
          defaultMessage: 'Toast组件用函数方式调用，Toast[type(args)],type 有4种success,error,warning,info',
        })}
      </Description>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '基本案例' })}</Subheading>
      <Canvas>
        <Story id="upgraded-toast--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '4种样式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: 'Toast.success(),Toast.error(),Toast.warning(),Toast.info()',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-toast--function" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'content中包含跳转' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '在content属性中，添加Link',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-toast--next-step" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'content 内容区域' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`content`属性控制内容区域，支持React.Node',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-toast--content" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'duration 持续时间' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`duration` 参数控制持续时间 默认为1s',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-toast--duration" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'onClose 关闭回调' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`onclose` 参数接受一个函数，在toast消失后执行',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-toast--on-close" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'icon 自定义icon' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`icon` 参数自定义content前的icon',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-toast--icon" />
      </Canvas>
    </>
  );
}
