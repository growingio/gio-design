import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Grid from '../index';

export default function GridPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Grid 栅格' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: 'Grid 组件是用flex底层重构的grid布局',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage: 'Row+Col 是12栅格系统',
        })}
      </Description>
      <Description>
        {formatMessage({
          defaultMessage: '布局的栅格化系统，基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。',
        })}
      </Description>
      <Description>
      {formatMessage({
          defaultMessage:
            '通过 row 在水平方向建立一组 column（简写 col）。 你的内容应当放置于 col 内，并且，只有 col 可以作为 row 的直接元素。',
        })}
      </Description>
      <Description>
      {formatMessage({
          defaultMessage:
            '栅格系统中的列是指 1 到 12 的值来表示其跨越的范围。如果一个 row 中的 col 总和超过 12，那么多余的 col 会作为一个整体另起一行排列。',
        })}
      </Description>
      <Description>
      {formatMessage({
          defaultMessage:
            '栅格化系统基于 Flex 布局，允许子元素在父节点内的水平对齐方式 - 居左、居中、居右、等宽排列、分散排列。子元素与子元素之间，支持顶部对齐、垂直居中对齐、底部对齐的方式。同时，支持使用 order 来定义元素的排列顺序。',
        })}
      </Description>
      <Subheading>{formatMessage({ defaultMessage: 'Grid默认样式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: 'Grid的children内容与grid布局类似',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-grid--grid-demo" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'Row默认样式' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: 'Row中使用Col达到的布局效果，共12份，分别为2，4，6，12',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-grid--row-default" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: 'Gutter 参数设置间隔' })}</Heading>
      <Description>
        {formatMessage({
          defaultMessage: '`gutter`参数接受一个数组[number,number],分别为左右间隔和上下间隔，如果超过当前行，则自动移动到下一行',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-grid--row-gutter" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: 'Direction 参数主轴方向' })}</Heading>
      <Description>
        {formatMessage({
          defaultMessage: '`direction`参数接受`row、column、row-reverse、column-reverse`中的一个，同flex布局的主轴设置，',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-grid--row-gutter" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: 'Col-order 自定义排序' })}</Heading>
      <Description>
        {formatMessage({
          defaultMessage: '`order`参数在col标签上，设置number值，按照从大大小排列',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-grid--col-order" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Grid} />
    </>
  );
}
