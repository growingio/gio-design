import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Breadcrumbs from '../Breadcrumbs';

export default function BreadcrumbsPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Breadcrumbs 面包屑' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage:
            '面包屑包含一个链接列表，帮助用户在网站的层次结构中可视化页面的位置，并允许导航到其任何“祖先页面”。',
        })}
      </Description>

      <Subtitle>{formatMessage({ defaultMessage: '使用场景' })}</Subtitle>
      <Description>
        {formatMessage({
          defaultMessage: '一般要求所有页面都有面包屑，弹窗等非页面不需要面包屑。',
        })}
      </Description>

      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4061%3A35944"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Description>
        {formatMessage({
          defaultMessage: '如果该面包屑没有跳转功能，不应该传一个 `Link` 组件，而是使用 `span` 包裹或者直接传字符串',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage: '支持所有原生 `div` 标签的 `props`',
        })}
      </Description>

      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-breadcrumbs--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义分隔符' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '在以下示例中，我们使用了两个字符串分隔符和一个 SVG 图标。' })}
      </Description>
      <Canvas>
        <Story id="upgraded-breadcrumbs--separator" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Breadcrumbs} />
    </>
  );
}
