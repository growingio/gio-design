import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Grid from '../index';

export default function GridPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Grid 栅格' })}</Title>
      <p>
        {formatMessage({
          defaultMessage:
            '布局的栅格化系统，基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。',
        })}
        <br />
        {formatMessage({
          defaultMessage:
            '通过 row 在水平方向建立一组 column（简写 col）。 你的内容应当放置于 col 内，并且，只有 col 可以作为 row 的直接元素。',
        })}
        <br />
        {formatMessage({
          defaultMessage:
            '栅格系统中的列是指 1 到 12 的值来表示其跨越的范围。如果一个 row 中的 col 总和超过 12，那么多余的 col 会作为一个整体另起一行排列。',
        })}
        <br />
        {formatMessage({
          defaultMessage:
            '栅格化系统基于 Flex 布局，允许子元素在父节点内的水平对齐方式 - 居左、居中、居右、等宽排列、分散排列。子元素与子元素之间，支持顶部对齐、垂直居中对齐、底部对齐的方式。同时，支持使用 order 来定义元素的排列顺序。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '完整栅格示例' })}</Subheading>
      <Canvas>
        <Story id="legacy-grid--default" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Grid} />
    </>
  );
}
