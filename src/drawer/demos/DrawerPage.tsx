import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Drawer from '../index';

export default function DrawerPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Drawer 抽屉' })}</Title>
      <p>
        {formatMessage({ defaultMessage: '屏幕边缘滑出的浮层面板，用于承载更详细的内容或操作。' })}
        <br />
        {formatMessage({
          defaultMessage:
            '抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到到原任务。',
        })}
        <br />
        {formatMessage({
          defaultMessage:
            '- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。',
        })}
        <br />
        {formatMessage({
          defaultMessage: '- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。',
        })}
      </p>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '默认样式' })}</Subheading>
      <Canvas>
        <Story id="data-display-drawer--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '可编辑和多步骤' })}</Subheading>
      <Canvas>
        <Story id="data-display-drawer--change-content" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多层嵌套' })}</Subheading>
      <Canvas>
        <Story id="data-display-drawer--parent-drawer" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Drawer} />
    </>
  );
}
