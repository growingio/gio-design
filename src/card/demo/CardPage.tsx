import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Card from '../index';

export default function CardPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Card 卡片' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '卡片内包含关于同一事物的内容和行动。最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4093%3A43508">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式变化：颜色，对齐</li>
        <li>Api变化</li>
        <li>action属性支持，右上角标题可以放ReactNode</li>
        <li>去除footer,去除外部title</li>
        <li>支持fullWidthContent 让内容宽度拉满</li>
        <li>底层div标签，支持div事件</li>
        <li>tablecard 和infocard 可兼容</li>
      </ul>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '简单结构' })}</Subheading>
      <p>
        {formatMessage({ defaultMessage: '1、简单结构下，卡片可以有【标题】【副标题】【首图】【描述】' })}
        <br />
        {formatMessage({
          defaultMessage:
            '2、在简单结构下，卡片可拥有“可点击”状态，在这时，默认为整张卡片可点。当卡片可点击时，卡片的阴影发生变化。',
        })}
      </p>
      <Canvas>
        <Story id="upgraded-card--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '禁用' })}</Subheading>
      <p>{formatMessage({ defaultMessage: '当卡片被禁用时，卡片不可被点击。' })}</p>
      <Canvas>
        <Story id="upgraded-card--disabled" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多内容结构' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage: '在多内容结构下，卡片可以嵌入【图片】【图表】【表格】的多种组合。每种内容的间距皆为16px。',
        })}
      </p>
      <Canvas>
        <Story id="upgraded-card--multiple" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'info-card' })}</Subheading>
      <p>pro中的infocard情况</p>
      <Canvas>
        <Story id="upgraded-card--info-card" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'info-card' })}</Subheading>
      <p>仅有description情况</p>
      <Canvas>
        <Story id="upgraded-card--only-des" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'table-card' })}</Subheading>
      <p>pro中的tablecards 情况</p>
      <Canvas>
        <Story id="upgraded-card--table-card" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Card} />
    </>
  );
}
