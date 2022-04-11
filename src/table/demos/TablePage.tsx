import React from 'react';
import {
  Canvas,
  Title,
  Heading,
  Story,
  Subheading,
  ArgsTable,
  Description,
  Subtitle,
  Source,
} from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import { Figma } from 'storybook-addon-designs/esm/blocks';
import Table, { Table as TableWithoutRef } from '../Table';
import { Alert } from '../..';

export default function TablePage() {
  const { formatMessage } = useIntl();
  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Table 表格' })}</Title>
      <Description>
        {formatMessage({
          defaultMessage:
            '展示行列数据。大量结构化数据的展现，且需要对数据进行排序、搜索、分页、自定义操作等复杂行为。',
        })}
      </Description>

      <Alert
        style={{ margin: '0 0 38px' }}
        message={
          <Description>
            {formatMessage({
              defaultMessage:
                'Table 组件底层使用了 [rc-table](https://github.com/react-component/table)，更多参数您可以参考该库的说明。',
            })}
          </Description>
        }
      />

      <Subtitle>{formatMessage({ defaultMessage: '设计稿' })}</Subtitle>
      <Figma
        height="50%"
        collapsable
        url="https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GIO-Design?node-id=4066%3A42548"
      />

      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>
      <Subheading>{formatMessage({ defaultMessage: '基本样式' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--basic" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '选择' })}</Subheading>
      <Description>
        {formatMessage({ defaultMessage: '`Table` 表格提供了一个 `rowSelection` 的属性，专门处理表格的行选择。' })}
      </Description>
      <Canvas>
        <Story id="upgraded-table--selection" />
      </Canvas>

      <Canvas>
        <Subtitle>RowSelection Prop</Subtitle>
        <Source
          language="typescript"
          code={`
interface RowSelection<RecordType> {
  selectedRowKeys?: Key[];
  columnWidth?: number | string;
  fixed?: 'left' | 'right' | boolean;
  onChange?: (selectedRowKeys: Key[], selectedRows: RecordType[]) => void;
  getCheckboxProps?: (record: RecordType) => CheckboxProps & { tooltipProps?: Omit<TooltipProps, 'children'> };
}
          `}
        />
        <Table
          rowKey="name"
          padding="6px"
          columns={[
            { dataIndex: 'name', title: 'Name' },
            { dataIndex: 'description', title: 'Description' },
            { dataIndex: 'default', title: 'Default' },
          ]}
          pagination={false}
          dataSource={[
            {
              name: 'selectedRowKeys',
              description: '当前已经选择的行标识符（受控）',
              default: '[]',
            },
            {
              name: 'columnWidth',
              description: '列表选择框的宽度',
              default: '52px',
            },
            {
              name: 'fixed',
              description: '是否固定选择框，或设置固定的方向',
              default: 'false',
            },
            {
              name: 'onChange',
              description: '触发行选择后的回调函数',
              default: '-',
            },
            {
              name: 'getCheckboxProps',
              description: '选择框的默认属性配置（传递给 Checkbox 组件的 Props）',
              default: '-',
            },
          ]}
        />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '过滤' })}</Subheading>
      <Description>{formatMessage({ defaultMessage: '通过一个或多个过滤条件，轻松过滤您的行。' })}</Description>
      <Description>
        {formatMessage({
          defaultMessage:
            '默认情况下，表格不支持任何过滤条件。需要手动设置 filters 和 onFilter 两个参数，才会在表头部分显示一个过滤图标，点击该图标会弹出过滤菜单。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-table--filtering" />
      </Canvas>
      <Canvas>
        <Subtitle>过滤相关的参数</Subtitle>
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
              name: 'filters',
              description: '当前列的过滤选项',
              type: 'string | Array<{ label: string; value: string }>',
              default: '-',
            },
            {
              name: 'onFilter',
              description:
                '自定义过滤函数，该函数的第一个参数为 filters 中的 value，第二个参数为当前。参考 Array.filter() 函数',
              type: '(value: string, record: RecordType) => boolean',
              default: '-',
            },
            {
              name: 'filteredValue',
              description: '筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组',
              type: 'Array<string>',
              default: '-',
            },
            {
              name: 'defaultFilteredValue',
              description: '默认筛选值',
              type: 'Array<string>',
              default: '-',
            },
            {
              name: 'filterSearchPlaceHolder',
              description: '过滤器中搜索框的占位符',
              type: 'string',
              default: '搜索过滤条件',
            },
          ]}
        />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '可折叠的表格行' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '设置 `expandable` 参数可以开启表格的折叠功能。参数介绍您可以前往 `rc-table` 库的[参数介绍页](https://table-react-component.vercel.app/#properties)查看。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-table--collapsible" />
        <Source
          code={`
interface ExpandableConfig<RecordType> {
  expandedRowKeys?: readonly Key[];
  defaultExpandedRowKeys?: readonly Key[];
  expandedRowRender?: ExpandedRowRender<RecordType>;
  expandRowByClick?: boolean;
  expandIcon?: RenderExpandIcon<RecordType>;
  onExpand?: (expanded: boolean, record: RecordType) => void;
  onExpandedRowsChange?: (expandedKeys: readonly Key[]) => void;
  defaultExpandAllRows?: boolean;
  indentSize?: number;
  /** @deprecated Please use \`EXPAND_COLUMN\` in \`columns\` directly */
  expandIconColumnIndex?: number;
  showExpandColumn?: boolean;
  expandedRowClassName?: RowClassName<RecordType>;
  childrenColumnName?: string;
  rowExpandable?: (record: RecordType) => boolean;
  columnWidth?: number | string;
  fixed?: FixedType;
}
        `}
        />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '树形表格' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            'Table 组件提供了树形数据展示的功能，您可以在您的 `dataSource` 中设置 `children` 参数，即可开启此功能。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-table--tree-data" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '固定表头和列' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 `scroll.x` 配合使用。',
        })}
      </Description>
      <Description>* 若列头与内容不对齐或出现列重复，请指定固定列的宽度 `width。`</Description>
      <Description>
        * 如果指定 `width`
        不生效或出现白色垂直空隙，请尝试建议留一列不设宽度以适应弹性布局，或者检查是否有超长连续字段破坏布局。
      </Description>
      <Description>* 建议指定 `scroll.x` 为大于表格宽度的固定值或百分比。</Description>
      <Description>* 注意，且非固定列宽度之和不要超过 `scroll.x`。</Description>
      <Canvas>
        <Story id="upgraded-table--fixed" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '按列分组' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '您可以在一个表头内渲染多个表行来分组列头',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-table--column-grouping" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '内容省略' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            '您可以通过 `column.ellipsis` 属性来设置表格内容如果太长该如何处理。设置了 `column.ellipsis=true`, 如果内容太长，会做省略处理，鼠标 hover 后，浏览器会通过默认的 tooltip 展示所有内容。您可以设置 `column.ellipsis.showTitle: false` 来取消该行为。',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-table--ellipsis" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '表格分页' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage:
            'Table 提供了 `pagination` 属性来实现您的表格分页功能，该参数的详细介绍可以参考 [Pagination 组件](?path=/docs/upgraded-pagination--default)',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-table--pagination-table" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '加载状态' })}</Subheading>
      <Canvas>
        <Story id="upgraded-table--loading" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '空表格' })}</Subheading>
      <Description>
        {formatMessage({
          defaultMessage: '请参考 [Page 组件](?path=/docs/upgraded-page--custom)',
        })}
      </Description>
      <Canvas>
        <Story id="upgraded-table--empty" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={TableWithoutRef} />
      <Canvas>
        <Subtitle>Column Type</Subtitle>
        <Table
          padding="6px"
          rowKey="name"
          columns={[
            { dataIndex: 'name', title: 'Name' },
            { dataIndex: 'description', title: 'Description', render: (text) => <Description>{text}</Description> },
            { dataIndex: 'type', title: 'Type' },
            { dataIndex: 'default', title: 'Default' },
          ]}
          pagination={false}
          dataSource={[
            {
              name: 'dataIndex',
              description: '列数据在数据项中对应的路径，支持通过数组查询嵌套路径',
              type: 'string | string[]',
              default: '-',
            },
            {
              name: 'info',
              description: '标题列的描述信息',
              type: 'string',
              default: '-',
            },
            {
              name: 'align',
              description: '列文字的对齐方式',
              type: "'left' | 'right' | 'center'",
              default: '-',
            },
            {
              name: 'colSpan',
              description:
                '表头列合并，设置为 0 时，不渲染（[原生的 colspan 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td#attr-colspan)）',
              type: 'number',
              default: '-',
            },
            {
              name: 'ellipsis',
              description:
                '单元格文本过长时，将使用 `text-overflow: ellipsis` 的方式省略文本，并在 `td` 标签上添加 `title` 属性为该单元格的文本。如果您需要取消该行为，可以给 `ellipsis` 传递一个 `{ showTitle: false }` 对象。',
              type: 'boolean | { showTitle?: boolean }',
              default: '-',
            },
            {
              name: 'fixed',
              description: '设置该列是否固定在最左侧或最右侧（设置 true 等效于设置 left）',
              type: "boolean | 'left' | 'right'",
              default: '-',
            },
            {
              name: 'key',
              description: 'React 需要的 key，如果已经设置了唯一的 dataIndex，可以忽略这个属性',
              type: 'string',
              default: '-',
            },
            {
              name: 'render',
              description: '生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引',
              type: 'function(text, record, index) {}',
              default: '-',
            },
            {
              name: 'title',
              description: '列头显示文字',
              type: 'React.ReactNode | (currentPageData: ReadonlyArray<RecordType>) => string',
              default: '-',
            },
            {
              name: 'width',
              description: '列表宽度',
              type: "React.CSSProperties['width']",
              default: '-',
            },
            {
              name: 'onCell',
              description: '设置单元格属性',
              type: '(record: RecordType, rowIndex: number) => React.TdHTMLAttributes<HTMLElement>',
              default: '-',
            },
            {
              name: 'onHeaderCell',
              description: '设置头部单元格属性',
              type: '(record: RecordType, rowIndex: number) => React.TdHTMLAttributes<HTMLElement>',
              default: '-',
            },
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
            {
              name: 'filters',
              description: '当前列的过滤选项',
              type: 'string | Array<{ label: string; value: string }>',
              default: '-',
            },
            {
              name: 'onFilter',
              description:
                '自定义过滤函数，该函数的第一个参数为 filters 中的 value，第二个参数为当前。参考 Array.filter() 函数',
              type: '(value: string, record: RecordType) => boolean',
              default: '-',
            },
            {
              name: 'filteredValue',
              description: '筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组',
              type: 'Array<string>',
              default: '-',
            },
            {
              name: 'defaultFilteredValue',
              description: '默认筛选值',
              type: 'Array<string>',
              default: '-',
            },
            {
              name: 'filterSearchPlaceHolder',
              description: '过滤器中搜索框的占位符',
              type: 'string',
              default: '搜索过滤条件',
            },
          ]}
        />
      </Canvas>
    </>
  );
}
