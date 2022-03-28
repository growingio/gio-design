import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description, Subtitle } from '@storybook/addon-docs';
import { FormattedMessage, useIntl } from 'react-intl';
import Skeleton from '../Skeleton';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Skeleton 骨架屏' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '在需要等待加载内容的位置提供一个占位图形组合。',
        })}
      </Description>
      <Subtitle>
        <FormattedMessage defaultMessage="使用场景" />
      </Subtitle>
      <Description>
        {formatMessage({
          defaultMessage: '网络较慢，需要长时间等待加载处理的情况下',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage: '图文信息内容较多的列表',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage: '通常只在第一次加载数据的时候使用,可以被 Loading 代替,但是在可用的场景下可以比 Loading 提供更好的视觉效果和用户体验',
        })}
      </Description>

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '骨架图' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '最简单的占位效果',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-skeleton--default" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '动画效果' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '设置active=true 显示动画效果',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-skeleton--active" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '占位图' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '展示一张图像,可用于图片卡片列表',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-skeleton--image" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '复杂组合' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '头像,段落,图片组合。paragraph定制段落显示。 paragraph.row控制文本显示行数。paragraph.width 设置每行的宽度',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-skeleton--image-and-paragraph" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Skeleton} />
    </>
  );
}
