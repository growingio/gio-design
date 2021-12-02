import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import List from '../List';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'List' })}</Title>
      <p>最基础的列表展示，可承载文字、列表、图片、段落，常用于后台数据展示页面。</p>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式变化：list无外层样式,</li>
        <li>APi变动：model支持三种模式：1，simple(默认)，2，cascader，3，multiple。</li>
        <li>DragList,可拖拽list，代替listPro的drag</li>
        <li>Selection，分组list。</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-list--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-list--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'mutiple' })}</Subheading>
      <Canvas>
        <Story id="upgraded-list--mutiple" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'cascader' })}</Subheading>
      <Canvas>
        <Story id="upgraded-list--cascader" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'collapse' })}</Subheading>
      <Canvas>
        <Story id="upgraded-list--collapse" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'drag' })}</Subheading>
      <Canvas>
        <Story id="upgraded-list--drag" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'selection list' })}</Subheading>
      <Canvas>
        <Story id="upgraded-list--selection-list" />
      </Canvas>
      <ArgsTable of={List} />
    </>
  );
}
