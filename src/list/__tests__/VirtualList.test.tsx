import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { Item, OptionProps, VirtualList } from '..';
import { VirtualListProps } from '../interface';

describe('testing List.VirtualList', () => {
  const listOptions: OptionProps[] = [...new Array(100)].map((_, index) => ({
    label: `List Item ${index}`,
    value: index,
    disabled: index > 6,
  }));
  const Render = (props: React.PropsWithChildren<Pick<VirtualListProps, 'height' | 'itemHeight' | 'fullHeight'>>) => <VirtualList {...props} prefixCls="gio" data={listOptions} itemKey="value" >
    {
      (opt) => <Item {...opt} />
    }
  </VirtualList>;
  it('render virtual-list default', () => {

    act(() => {
      render(<Render />);
      // expect()
    })

    expect(screen.queryAllByTestId('list-item-base').length).toBe(15);
  })
  it('render virtual-list ', async () => {

    act(() => {
      render(<Render itemHeight={40} height={200} fullHeight />);
      // expect()
    })
    // screen.debug()
    expect(screen.queryAllByTestId('list-item-base').length).toBe(7);

  })
})