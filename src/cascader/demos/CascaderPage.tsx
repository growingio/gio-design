import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Cascader from '../index';

export default function CascaderPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Cascader 级联选择器' })}</Title>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '基础用法' })}</Subheading>
      <Canvas>
        <Story id="data-input-cascader--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '键名映射' })}</Subheading>
      <Canvas>
        <Story id="data-input-cascader--key-mapping" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '分组' })}</Subheading>
      <Canvas>
        <Story id="data-input-cascader--group" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '触发方式' })}</Subheading>
      <Canvas>
        <Story id="data-input-cascader--trigger" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '可搜索的' })}</Subheading>
      <Canvas>
        <Story id="data-input-cascader--search" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义' })}</Subheading>
      <Canvas>
        <Story id="data-input-cascader--custom" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '异步获取数据' })}</Subheading>
      <Canvas>
        <Story id="data-input-cascader--async" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '添加文字提示' })}</Subheading>
      <Canvas>
        <Story id="data-input-cascader--tooltip" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Cascader} />
    </>
  );
}

// # Cascader 级联选择器

// <Subtitle>多级选择</Subtitle>

// ## 参数说明

// <ArgsTable of={Cascader} />

// ## 代码演示

// ### 基础用法

// <Canvas>
//   <Story id="basic-components-cascader--default" />
// </Canvas>

// ### 键名映射

// <Canvas>
//   <Story id="basic-components-cascader--key-mapping" />
// </Canvas>

// ### 分组

// <Canvas>
//   <Story id="basic-components-cascader--group" />
// </Canvas>

// ### 触发方式

// <Canvas>
//   <Story id="basic-components-cascader--trigger" />
// </Canvas>

// ### 可搜索的

// <Canvas>
//   <Story id="basic-components-cascader--search" />
// </Canvas>

// ### 自定义

// <Canvas>
//   <Story id="basic-components-cascader--custom" />
// </Canvas>

// ### 异步获取数据

// <Canvas>
//   <Story id="basic-components-cascader--async" />
// </Canvas>

// ### 添加文字提示

// <Canvas>
//   <Story id="basic-components-cascader--tooltip" />
// </Canvas>
