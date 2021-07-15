import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MoreOutlined } from '@gio-design/icons';
import { Default, Multiple } from '../TreeSelect.stories';
import TreeSelect from '../index';

describe('Testing tree-select', () => {
  it('basic tree-select', () => {
    render(<Default {...Default.args} />);
    expect(screen.getAllByRole('combobox')).toHaveLength(1);
  });

  it('multiple tre-select', () => {
    render(<Multiple {...Multiple.args} />);
    expect(screen.getAllByRole('combobox')).toHaveLength(1);
  });

  it('should treeIcon work', () => {
    const treeData2 = [
      {
        title: 'parent 1',
        value: 'partent 1',
        icon: <span>Bamboo</span>,
      },
    ];
    render(
      <TreeSelect
        treeIcon
        open
        treeData={treeData2}
        suffixIcon={<MoreOutlined />}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        menuItemSelectedIcon={<MoreOutlined />}
        removeIcon={<span>remove</span>}
        notFoundContent="not found"
      />
    );
    expect(screen.getByText('parent 1')).toBeTruthy();
  });

  it('set ref to test focus and blur', () => {
    const focusMock = jest.fn();
    const blurMock = jest.fn();
    const { rerender, container } = render(<TreeSelect treeIcon open treeData={[]} suffixIcon={<MoreOutlined />} />);
    const refs = React.createRef<any>();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    rerender(<TreeSelect ref={refs} onFocus={focusMock} onBlur={blurMock} />);
    refs.current.focus();
    fireEvent.focus(container.getElementsByClassName('gio-select')[0]);
    expect(focusMock).toBeCalled();

    refs.current.blur();
    fireEvent.blur(container.getElementsByClassName('gio-select')[0]);
    expect(blurMock).toBeCalled();
  });
});
