import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tabs, { TabPane } from '../index';

describe('Testing Tabs', () => {
  const getTabs = (args?: unknown) => (
    <Tabs ref={React.createRef()} {...args}>
      <TabPane tab="我的" key="0">
        111
      </TabPane>
      <TabPane tab="全部" key="1">
        222
      </TabPane>
      <TabPane tab="共享" key="2">
        333
      </TabPane>
      <TabPane disabled tab="预置" key="3">
        444
      </TabPane>
    </Tabs>
  );

  it('should be stable', () => {
    render(getTabs());
    expect(screen.getAllByText(/[1-4]{3}/)).toHaveLength(4);
  });

  it('will be changed after click', () => {
    const { getByText, queryAllByTestId, container } = render(getTabs());
    expect(queryAllByTestId('tabnav-item').length).toBe(4);
    fireEvent.click(getByText('全部'));
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).toBe('全部');
    expect(container.getElementsByClassName('gio-tabs-tabpane-active')[0].textContent).toBe('222');
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const { rerender, unmount } = render(getTabs());
      rerender(getTabs({ type: 'line' }));
      rerender(getTabs({ size: 'small' }));
      unmount();
    }).not.toThrow();
  });

  test('props type', () => {
    const { container, rerender } = render(getTabs());
    expect(container.getElementsByClassName('gio-tabs-block').length).toBe(1);
    rerender(getTabs({ type: 'line' }));
    expect(container.getElementsByClassName('gio-tabs-line').length).toBe(1);
  });

  test('props size', () => {
    const { container, rerender } = render(getTabs());
    expect(container.getElementsByClassName('gio-tabs-lg').length).toBe(1);
    rerender(getTabs({ size: 'middle' }));
    expect(container.getElementsByClassName('gio-tabs-md').length).toBe(1);
    rerender(getTabs({ size: 'small' }));
    expect(container.getElementsByClassName('gio-tabs-sm').length).toBe(1);
  });

  test('prop defaultActiveKey', () => {
    const { container } = render(getTabs({ defaultActiveKey: '1' }));
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).toBe('全部');
  });

  test('prop activeKey', () => {
    const { rerender, container, getByText } = render(getTabs({ activeKey: '1' }));
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).toBe('全部');
    rerender(getTabs({ activeKey: '2' }));
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).toBe('共享');
    fireEvent.click(getByText('我的'));
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).toBe('共享');
  });

  test('prop onChange and onTabClick', () => {
    const onChange = jest.fn();
    const onTabClick = jest.fn();
    const { getByText } = render(getTabs({ onChange, onTabClick }));
    fireEvent.click(getByText('我的'));
    // not change
    expect(onChange).not.toHaveBeenCalled();
    expect(onTabClick).toHaveBeenCalled();
    fireEvent.click(getByText('全部'));
    expect(onChange).toHaveBeenCalled();
  });

  it('should be render content rightly', () => {
    const { container, getByText } = render(getTabs());
    expect(container.getElementsByClassName('gio-tabs-tabpane-active')[0].textContent).toBe('111');
    fireEvent.click(getByText('全部'));
    expect(container.getElementsByClassName('gio-tabs-tabpane-active')[0].textContent).toBe('222');
  });

  it('only render TabPane', () => {
    const { queryByText } = render(
      <Tabs defaultActiveKey="1">
        <TabPane tab="我的" key="0">
          111
        </TabPane>
        <TabPane tab="全部" key="1">
          222
        </TabPane>
        <TabPane tab="共享" key="2">
          333
        </TabPane>
        <TabPane disabled tab="预置" key="3">
          444
        </TabPane>
        <div>我不会被渲染</div>
      </Tabs>
    );
    expect(queryByText('我不会被渲染')).toBe(null);
  });

  it('will use map index if not set key to tabpane', () => {
    const { container } = render(
      <Tabs defaultActiveKey="1">
        <TabPane tab="我的">111</TabPane>
        <TabPane tab="全部">222</TabPane>
        <TabPane tab="共享">333</TabPane>
        <TabPane disabled tab="预置">
          444
        </TabPane>
      </Tabs>
    );
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).toBe('全部');
    expect(container.getElementsByClassName('gio-tabs-tabpane-active')[0].textContent).toBe('222');
  });
});
