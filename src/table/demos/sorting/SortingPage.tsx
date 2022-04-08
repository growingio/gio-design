import { Canvas, Description, Story, Subtitle, Title } from '@storybook/addon-docs';
import React from 'react';
import { useIntl } from 'react-intl';
import Table from '../..';

export default function SortingPage() {
  const { formatMessage } = useIntl();
  return (
    <>
      <Title>{formatMessage({ defaultMessage: '排序' })}</Title>
      <Description>{formatMessage({ defaultMessage: '通过一个或多个标准轻松对行进行排序。' })}</Description>
      <Description>
        {formatMessage({
          defaultMessage:
            '默认情况下，表格不支持排序。需要手动设置 sorter 排序函数才支持排序功能。在此基础上，可以通过 `sortDirections`、`sortPriorityOrder`、`defaultSortOrder` 和 `sortOrder` 等参数更加精细的控制您的排序功能。',
        })}
      </Description>

      <Subtitle>单列排序</Subtitle>
      <Description>
        {formatMessage({
          defaultMessage:
            'Table 一次只能根据一个标准对行进行排序。要使用多列排序，您需要使用 `sortPriorityOrder` 参数。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-table-sorting--sorting" />
      </Canvas>

      <Subtitle>多列排序</Subtitle>
      <Description>{formatMessage({ defaultMessage: '设置 `sortPriorityOrder` 参数可以开启多列排序。' })}</Description>
      <Canvas>
        <Story id="upgraded-table-sorting--multiple-sorting" />
      </Canvas>

      <Subtitle>受控的排序</Subtitle>
      <Canvas>
        <Story id="upgraded-table-sorting--controlled-sorting" />
      </Canvas>

      <Canvas>
        <Subtitle>排序相关的参数</Subtitle>
        <Table
          padding="6px"
          rowKey="name"
          columns={[
            { dataIndex: 'name', title: 'Name' },
            { dataIndex: 'description', title: 'Description' },
            { dataIndex: 'type', title: 'Type' },
            { dataIndex: 'default', title: 'Default' },
          ]}
          pagination={false}
          dataSource={[
            {
              name: 'sorter',
              description: '排序函数，本地排序使用一个函数(参考 Array.sort)，传入 `true` 开启服务端排序',
              type: 'true | ((a: RecordType, b: RecordType) => number)',
              default: '-',
            },
            {
              name: 'sortDirections',
              description: '支持的排序方式',
              type: `Array<'ascend' | 'descend' | null>`,
              default: `['ascend', 'descend', null]`,
            },
            {
              name: 'sortPriorityOrder',
              description: '排序优先级，数值越大越靠前',
              type: 'number',
              default: '-',
            },
            {
              name: 'defaultSortOrder',
              description: '默认的排序类型',
              type: `'ascend' | 'descend' | null`,
              default: 'null',
            },
            {
              name: 'sortOrder',
              description: '排序的受控属性，外界可用此控制列的排序。',
              type: `'ascend' | 'descend' | null`,
              default: '-',
            },
          ]}
        />
      </Canvas>
    </>
  );
}
