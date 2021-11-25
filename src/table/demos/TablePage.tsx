import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Table from '..';

export default function TablePage() {
  const { formatMessage } = useIntl();
  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Table 表格' })}</Title>
      <p>
        {formatMessage({
          defaultMessage: 'table 切换的交互行为类似 Radio Button Group，用于在多个备选项中选中单个选项。',
        })}
      </p>
      <p>
        <a href="https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4066%3A42548">
          Figma
        </a>
      </p>
      <p>Upgrading Guide</p>
      <ul>
        <li>样式变化：全新样式</li>
        <li>api:</li>
      </ul>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--basic" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'customthead' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--custom-thead" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'ellipsis' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--ellipsis" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'empty' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--empty" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'filterable' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--filterable" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'fixed' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--fixed" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'loading' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--loading" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'paginationtable' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--pagination-table" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'resizablecolum' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--resizable-column" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'selectable' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--selectable" />
      </Canvas>{' '}
      <Subheading>{formatMessage({ defaultMessage: 'sortable' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--sortable" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'spanningtable' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--spanning-table" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'theadgroup' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--thead-group" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'treedata' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--tree-data" />
      </Canvas>
      <Subheading>{formatMessage({ defaultMessage: 'collapsible' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--collapsible" />
      </Canvas>
      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Table} />
    </>
  );
}
