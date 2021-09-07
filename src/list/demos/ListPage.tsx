import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import List from '../List';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'List 列表' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: '以列表的形式展示同一类型的内容，可承载文字、头像、多选框、按钮等元素组合。',
        })}
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="data-display-list--basic" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '分组' })}</Subheading>
      <p>{formatMessage({ defaultMessage: '支持两级分组，一级分钟用 ItemGroup，二级分组用 ItemSubgroup。' })}</p>
      <Canvas>
        <Story id="data-display-list--groups" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '空样式' })}</Subheading>
      <Canvas>
        <Story id="data-display-list--empty" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '不同尺寸' })}</Subheading>
      <Canvas>
        <Story id="data-display-list--size" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: 'JSX 语法' })}</Subheading>
      <Canvas>
        <Story id="data-display-list--jsx" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自动省略' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage: 'List 本身不支持自动省略。想要自动省略超长文本，请使用 Typography.Text 组件。',
        })}
      </p>
      <Canvas>
        <Story id="data-display-list--ellipsis" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={List} />
    </>
  );
}
