import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Subtitle, Description } from '@storybook/addon-docs';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import { FormattedMessage, useIntl } from 'react-intl';
import Card from '../index';

export default function CardPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Card 卡片' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '卡片是一个显示与单个主题相关的内容和可被操作的容器',
        })}
      </Description>
      <Subtitle>
        <FormattedMessage defaultMessage="使用场景" />
      </Subtitle>
      <Description>
        {formatMessage({
          defaultMessage:
            '卡片内包含关于同一事物的内容和行动。最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。',
        })}
      </Description>
      <Subtitle>
        <FormattedMessage defaultMessage="设计稿" />
      </Subtitle>
      <Figma
        height="30%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4066%3A42614"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基础卡片' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '包含【标题】【副标题】【首图】【描述】【操作区域】,当“可点击”时，鼠标hover时会显示阴影的变化',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-card--without-content" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '卡片阴影' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '默认情况下卡片只有在鼠标 hover 时有一个阴影，可以设置 boxShadow=true 来给 Card 添加一个默认阴影效果',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-card--box-shadow" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '不展示 hover 阴影' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '默认情况下卡片在鼠标hover时有一个阴影变化，可以设置 clickable=true 来去除卡片的阴影效果',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-card--clickable" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '禁用' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '当卡片被禁用时，卡片本身不可被点击。此时卡片的【操作区域】仍可点击' })}
      </Description>
      <Canvas>
        <Story id="upgraded-card--disabled" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'FullWidthContent' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '卡片默认有一个16px的padding， 通过设置 fullWidthContent=true 来去除卡片的padding。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-card--full-width-content" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '栅格卡片' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '在系统概览页面常常和栅格进行配合。展示一个卡片列表' })}
      </Description>
      <Canvas>
        <Story id="upgraded-card--grid-card" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多内容结构' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '在多内容结构下，卡片可以嵌入【图片】【图表】【表格】等多种组合。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-card--complex-card" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: '复杂应用' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '卡片结合其他组件可以组合出一个复杂的可操作页面',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-card--complex-card-panel" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Card} />
    </>
  );
}
