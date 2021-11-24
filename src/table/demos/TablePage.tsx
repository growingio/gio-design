import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Table from '../index';

export default function TablePage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Table' })}</Title>
      <p>
        {/* formatMessage({
          defaultMessage: '',
        }) */}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4066%3A42548">
          Figma
        </a>
      </p>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基础表格' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--basic" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '可选择的' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--selectable" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '可过滤的' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--filterable" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '可排序的' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--sortable" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '受控的排序' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--controlled-sortable" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '可展开的' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--collapsible" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '跨越表格' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--spanning-table" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '展示树形数据' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--tree-data" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '可固定表头和列' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--fixed" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '表头分组' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--thead-group" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '内容省略' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--ellipsis" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '宽度可调整的列' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--resizable-column" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义表格' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--custom-thead" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '分页表格' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--pagination-table" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '加载中' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--loading" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '表格无数据时的展示页面' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--empty" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Table} />
    </>
  );
}
