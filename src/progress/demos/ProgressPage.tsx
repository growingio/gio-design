import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Subtitle, Description } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import { useIntl } from 'react-intl';
import Progress from '../Progress';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Progress 进度条' })}</Title>

      <Description>
        {formatMessage({
          defaultMessage: '在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。',
        })}
      </Description>
      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4093%3A45838"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '默认样式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`percent`参数控制进度条百分比',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-progress--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '动画开启' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`animation`参数控制动画开启',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-progress--animation" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义render' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`format`参数返回node，(e)=>e+🌟',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-progress--format" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '展示右侧状态值' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`showInfo`参数设置有无右侧状态显示',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-progress--show-info" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Size大小' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '`size`大小有两种，small和normal，默认为normal',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-progress--size" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'status三种状态控制' })}</Subheading>

      <Description>
        {formatMessage({
          defaultMessage: '`status`分为三种，active, success, expection',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-progress--status" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Progress} />
    </>
  );
}
