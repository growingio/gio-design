import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable, Description } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import List from '../ListPicker';

export default function ListPage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'ListPicker 列表选择器' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage: '当用户需要选择某一项值时，可以从列表中选择。',
        })}
      </Description>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="internal-components-listpicker--basic" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '分组' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '支持两级分组，一级分钟用 ItemGroup，二级分组用 ItemSubgroup。' })}
      </Description>
      <Canvas>
        <Story id="internal-components-listpicker--groups" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '空样式' })}</Subheading>
      <Canvas>
        <Story id="internal-components-listpicker--empty" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '不同尺寸' })}</Subheading>
      <Canvas>
        <Story id="internal-components-listpicker--size" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自动省略' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: 'List 本身不支持自动省略。想要自动省略超长文本，请使用 Typography.Text 组件。',
        })}
      </Description>
      <Canvas>
        <Story id="internal-components-listpicker--ellipsis" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={List} />
    </>
  );
}
