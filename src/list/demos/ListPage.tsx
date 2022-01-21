import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { FormattedMessage, useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/blocks'
import List from '../List';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'List' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '列表是对文本或图像的连续、垂直的索引',
        })}
      </Description>
      <Subtitle>
        <FormattedMessage defaultMessage="使用场景" />
      </Subtitle>
      <Description>{formatMessage({
        defaultMessage: '最基础的列表展示，可以在Dropdown、选择器里使用。',
      })}</Description>
      <Subtitle>
        <FormattedMessage defaultMessage="设计稿" />
      </Subtitle>
      <Figma
        height="30%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=6876%3A78482"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Description>{formatMessage({
        defaultMessage: 'List 宽度默认根据外层容器自适应。列表为空时，设置needEmpty=true 显示一个空值状态。也可以设置empty 自定义空值状态显示',
      })}</Description>
      <Canvas>
        <Story id="upgraded-list--default" />
        <Story id="upgraded-list--empty" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '样式组合' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '通过设置列表Item 的prefix，sufix 属性可以组合出不同的交互样式',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-list--basic" />
        <Story name="Avatar With Text" id="upgraded-list--prefix" />
        <Story id="upgraded-list--suffix" />
        <Story id="upgraded-list--avatar-with-text-and-icon" />
      </Canvas>
      <Description>
        {formatMessage({
          defaultMessage: '复杂交互列表',
        })}
      </Description>
      <Canvas>
        <Story name="结合toggle组件" id="upgraded-list--with-icon-and-switch" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Checkbox 多选列表' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '列表多选模式 可以通过设置列表的 model="multiple" , 每个列表项会展示一个Ckeckbox复选框',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-list--multiple-select" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Cascader 级联列表' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '级联列表，可以通过设置列表的 model="cascader" ，cascader的value值格式为 "value1.value1-2.value1-2-3", 可以通过设置valueSeparator属性改value 的联接符，默认为‘.’',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-list--cascader" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'Collapse 折叠内容' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '列表默认超过10个元素会折叠，设置collapse更改。 collapse=Infinity 不折叠。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-list--collapse" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'DragList 拖拽列表' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: 'DragList 组件方便的实现一个可拖拽排序的列表',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-list--drag" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'Selection 分组列表' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '将不同的 List 通过 Selection 作为外层容器包裹， 可以实现列表分组效果。设置List 的title 来显示分组标题',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-list--selection-list" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '应用场景' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '结合dropdown 实现一个下拉选择',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-list--dropdown-list" />
      </Canvas>
      <ArgsTable of={List} />
    </>
  );
}
