import React from 'react';
import { Canvas, Title, Heading, Story, Subheading, ArgsTable } from '@storybook/addon-docs';
import { useIntl } from 'react-intl';
import Table from '../index';

export default function TablePage() {
  const { formatMessage } = useIntl();

  return (
    <>
      <Title>{formatMessage({ defaultMessage: 'Table 列表' })}</Title>
      <Heading>{formatMessage({ defaultMessage: '代码演示' })}</Heading>

      <Subheading>{formatMessage({ defaultMessage: '基础列表' })}</Subheading>
      <p>
        {formatMessage({
          defaultMessage: '- 列表标题：标题是对列表信息内容的整体概括，以便用户对列表内通有整体认知。',
        })}
        <br />
        {formatMessage({
          defaultMessage: '- 表头：一般指列标签，这里也指首列行标签，是对所属列/行的信息描述。',
        })}
        <br />
        {formatMessage({
          defaultMessage: '- 表体：列表主体内容，具体信息内容的填充区域。',
        })}
      </p>
      <Canvas>
        <Story id="data-display-table--base" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '紧凑型' })}</Subheading>
      <p>{formatMessage({ defaultMessage: '行高为40px，可在Modal、Drawer等展示空间较小的场景下使用。' })}</p>
      <Canvas>
        <Story id="data-display-table--compact-table" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '表头多样式' })}</Subheading>
      <p>
        {formatMessage({ defaultMessage: '【常用辅助控件】：一般对当前表头所属列的内容进行解释，便于用户理解。' })}
        {formatMessage({
          defaultMessage: '- 提示：一般对当前表头所属列的内容进行解释，便于用户理解。始终跟随表头文案，居其右侧排列。',
        })}
        {formatMessage({
          defaultMessage:
            '- 排序：可以对当前列进行升序/降序排序。始终在表头所属表格居右显示；当过滤等其他操作设置也居右显示时，排序控件位置不变，其他操作设置随其左侧显示。',
        })}
        {formatMessage({
          defaultMessage:
            '- 过滤：可以快速定位当前列的某个元素。正常情况下，在所属表格居右显示；当「排序」也居右显示时，过滤居其左。',
        })}
        {formatMessage({
          defaultMessage: '- 不建议一个表头中超过 2 个以上的辅助性控件。多控件的出现，反而会影响用户阅读信息的效率。',
        })}
      </p>
      <Canvas>
        <Story id="data-display-table--table-header" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '多行表头' })}</Subheading>
      <Canvas>
        <Story id="data-display-table--multi-line" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '滚动' })}</Subheading>
      <Canvas>
        <Story id="data-display-table--table-scroll" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '无结果' })}</Subheading>
      <Canvas>
        <Story id="data-display-table--table-empty" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '列表加载' })}</Subheading>
      <Canvas>
        <Story id="data-display-table--table-loading" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '分页' })}</Subheading>
      <Canvas>
        <Story id="data-display-table--table-pagination" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '行展开' })}</Subheading>
      <p>{formatMessage({ defaultMessage: '列表行可展开，支持展示文字、图片、图表、表格，不支持内部滚动' })}</p>
      <Canvas>
        <Story id="data-display-table--row-expand-table" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '树形结构展开' })}</Subheading>
      <Canvas>
        <Story id="data-display-table--tree-expand-table" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '表格展开' })}</Subheading>
      <Canvas>
        <Story id="data-display-table--expand-with-table" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '固定列展开 + 滚动' })}</Subheading>
      <Canvas>
        <Story id="data-display-table--row-expand-with-fixed-column" />
      </Canvas>

      <Subheading>{formatMessage({ defaultMessage: '自定义列宽' })}</Subheading>
      <Canvas>
        <Story id="data-display-table--resizable-with-table" />
      </Canvas>

      <Heading>{formatMessage({ defaultMessage: '参数说明' })}</Heading>
      <ArgsTable of={Table} />
    </>
  );
}
