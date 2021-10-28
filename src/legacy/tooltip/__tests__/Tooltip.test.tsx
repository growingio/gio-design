import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default, Link, MultiLine } from '../demos/Tooltip.stories';
import Tooltip from '../index';
import getPlacements, { getOverflowOptions } from '../placements';

describe('Testing tooltip', () => {
  it('basic tooltip', () => {
    render(<Default {...Default.args} />);
    fireEvent.mouseEnter(screen.getByText('Top'));
    expect(screen.getByText('这是提示文案。')).toBeTruthy();
  });

  it('no title', () => {
    const props = {
      title: null,
    } as any;
    render(<Default {...props} />);
    fireEvent.mouseEnter(screen.getByText('Top'));
  });

  it('link tooltip', () => {
    const props = {
      trigger: 'click',
      title: '这里是提示文案。',
      tooltipLink: { link: 'www.growingio.com' },
      placement: 'right',
    };
    render(<Link {...props} />);
    fireEvent.mouseEnter(screen.getByText('Right'));
  });

  it('multiple line tooltip', () => {
    render(<MultiLine {...MultiLine.args} />);
    fireEvent.mouseEnter(screen.getByText('多行'));
    expect(screen.getByText('这是一个很长的描述', { exact: false })).toBeTruthy();
  });

  it('click trigger', () => {
    render(
      <Tooltip
        trigger={['click', 'hover']}
        overlay={() => console.log('overlay')}
        title={() => {
          console.log('title');
        }}
      >
        <span className="tooltipSpan">Right</span>
      </Tooltip>
    );
  });

  it('click trigger', () => {
    const onVisibleChange = jest.fn();
    render(
      <Tooltip
        trigger="click"
        title="这里是提示文案。"
        subPrefixCls="tooltip"
        autoAdjustOverflow
        onVisibleChange={onVisibleChange}
      >
        <span className="tooltipSpan">Right</span>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByText('Right'));
    expect(screen.queryByText('这里是提示文案。')).toBeNull();
    fireEvent.click(screen.getByText('Right'));
    expect(screen.getByText('这里是提示文案。')).toBeTruthy();
  });

  it('getOverflowOptions function', () => {
    const result1 = getOverflowOptions({ adjustX: 1 });
    expect(result1.adjustX).toBe(1);
    expect(result1.adjustY).toBe(0);
    const result2 = getOverflowOptions(true);
    expect(result2.adjustX).toBe(1);
    expect(result2.adjustY).toBe(1);
    const result3 = getOverflowOptions(false);
    expect(result3.adjustX).toBe(0);
    expect(result3.adjustY).toBe(0);
  });

  it('getPlacements function', () => {
    const placements = getPlacements({ arrowPointAtCenter: true });
    expect(placements.top.points).not.toBeUndefined();
    expect(placements.top.offset).not.toBeUndefined();
    expect(placements.top.overflow).not.toBeUndefined();
    expect(placements.top.targetOffset).not.toBeUndefined();
    expect(
      getPlacements({ arrowWidth: 8, horizontalArrowShift: 10, verticalArrowShift: 10, arrowPointAtCenter: false })
        .topLeft.offset
    ).not.toEqual(placements.topLeft.offset);
  });

  it('disabled tooltip', () => {
    render(
      <Tooltip disabled title="disabled">
        <span className="tooltipSpan">Right</span>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByText('Right'));
    expect(screen.queryByText('disabled')).toBeNull();
  });
});
