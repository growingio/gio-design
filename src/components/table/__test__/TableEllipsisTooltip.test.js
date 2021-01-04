import { renderHook } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import useEllipsisTooltip from '../hook/useEllipsisTooltip';

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
  test('useEllipsisTooltip', () => {
    const { result } = renderHook(() => useEllipsisTooltip());
    const transformEllipsisTooltipPipeline = result.current[0];
    const transformedColumns = transformEllipsisTooltipPipeline(columns);
    expect(transformedColumns[0].render).not.toBeUndefined();
    const renderNode = transformedColumns[0].render('列表文本最大字符字符字符的示例', undefined, 1);
    const renderNodeWrapper = mount(renderNode);
    // act(() => {
    renderNodeWrapper.find('span').at(0).simulate('mouseenter');
    // });

    // waitForComponentToPaint(renderNodeWrapper).then(() => {
    //   console.log(renderNodeWrapper.html());
    //   expect(renderNodeWrapper.exists('.gio-tooltip')).toBe(true);
    //   done();
    // });
  });
});
