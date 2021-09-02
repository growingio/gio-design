import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render, fireEvent } from '@testing-library/react';
import useEllipsisTooltip from '../hook/useEllipsisTooltip';
import { ColumnsType } from '../interface';

const columns = [
  {
    title: '列标题',
    dataIndex: 'first',
    align: 'left',
    width: 200,
    ellipsis: true,
  },
  {
    title: '列标题',
    dataIndex: 'second',
    align: 'left',
    ellipsis: true,
    render: (value: any, record: any) => record.name,
  },
  {
    title: '列标题',
    dataIndex: 'third',
    align: 'left',
  },
  {
    title: '列标题',
    dataIndex: 'fourth',
    align: 'left',
  },
];

describe('Testing useEllipsisTooltip', () => {
  it('useEllipsisTooltip', () => {
    const { result } = renderHook(() => useEllipsisTooltip());
    const transformEllipsisTooltipPipeline = result.current[0];
    const transformedColumns = transformEllipsisTooltipPipeline(columns as ColumnsType<unknown>);
    expect(transformedColumns[0].render).not.toBeUndefined();
    const renderNode = transformedColumns[0].render('列表文本最大字符字符字符的示例', undefined, 1);
    const { container } = render(renderNode as React.ReactElement);

    fireEvent.mouseEnter(container.getElementsByTagName('span')[0]);
  });
});
