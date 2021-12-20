import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import ListPicker from '../index';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'ListPicker' })}</Title>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式变化：圆角样式，新popover样式。</li>
        <li>APi变动：children是popover弹出的内容，无冗余api</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '样例展示' })}</Subheading>
      <Canvas>
        <Story id="upgraded-listpicker--demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-listpicker--default" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '单选' })}</Subheading>
      <Canvas>
        <Story id="upgraded-listpicker--single" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '多选' })}</Subheading>
      <Canvas>
        <Story id="upgraded-listpicker--multiple" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '不可选' })}</Subheading>
      <Canvas>
        <Story id="upgraded-listpicker--disable" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '全选' })}</Subheading>
      <Canvas>
        <Story id="upgraded-listpicker--all-chose" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '分组' })}</Subheading>
      <Canvas>
        <Story id="upgraded-listpicker--selection" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '事件选择器' })}</Subheading>
      <Canvas>
        <Story id="upgraded-listpicker--event-target-picker" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '用户选择器' })}</Subheading>
      <Canvas>
        <Story id="upgraded-listpicker--user-picker" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '目标用户选择器' })}</Subheading>
      <Canvas>
        <Story id="upgraded-listpicker--target-user-picker" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '属性选择器' })}</Subheading>
      <Canvas>
        <Story id="upgraded-listpicker--dimension-picker" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '分群选择器' })}</Subheading>
      <Canvas>
        <Story id="upgraded-listpicker--split-picker" />
      </Canvas>
      <ArgsTable of={ListPicker} />
    </>
  );
}
