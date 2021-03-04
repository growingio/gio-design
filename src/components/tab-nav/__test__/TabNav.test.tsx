/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TabNav from '../index';

describe('Testing TabNav', () => {
  const getTabNav = (args?: unknown) => (
    <TabNav {...args}>
      <TabNav.Item key='1'>111</TabNav.Item>
      <TabNav.Item key='2'>222</TabNav.Item>
      <TabNav.Item key='3'>333</TabNav.Item>
      <TabNav.Item key='4' disabled>444</TabNav.Item>
    </TabNav>
  );
    
  it('should be stable', () => {
    const { asFragment } = render(getTabNav());
    expect(asFragment()).toMatchSnapshot();
  });

  it('will be changed after click', () => {
    const { getByText, container } = render(getTabNav());
    fireEvent.click(getByText('222'));
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).toBe('222');
    fireEvent.click(getByText('444'));
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).not.toBe('444');
    expect(container.getElementsByClassName('gio-tabnav-item-disabled')[0].textContent).toBe('444');
  });

  it('should be mount, setProps, unmount with no error', () => {
    expect(() => {
      const { rerender, unmount } = render(getTabNav());
      rerender(getTabNav({ type: 'line' }));
      rerender(getTabNav({ size: 'small' }));
      unmount()
    }).not.toThrow();
  });

  test('props type', () => {
    const { container, rerender } = render(getTabNav());
    expect(container.getElementsByClassName('gio-tabnav-block').length).toBe(1);
    rerender(getTabNav({ type: 'line' }));
    expect(container.getElementsByClassName('gio-tabnav-line').length).toBe(1);
  });

  test('props size', () => {
    const { container, rerender } = render(getTabNav());
    expect(container.getElementsByClassName('gio-tabnav-lg').length).toBe(1);
    rerender(getTabNav({ size: 'middle' }));
    expect(container.getElementsByClassName('gio-tabnav-md').length).toBe(1);
    rerender(getTabNav({ size: 'small' }));
    expect(container.getElementsByClassName('gio-tabnav-sm').length).toBe(1);
  });

  test('prop defaultActiveKey', () => {
    const { container } = render(getTabNav({ defaultActiveKey: '2'}));
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).toBe('222');
  });

  test('prop activeKey', () => {
    const { container, getByText, rerender } = render(getTabNav({ activeKey: '1' }));
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).toBe('111');
    rerender(getTabNav({ activeKey: '2' }));
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).toBe('222');
    // be controlled, not work
    fireEvent.click(getByText('111'))
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).toBe('222');
  });

  test('prop onChange and onTabClick', () => {
    const onChange = jest.fn();
    const onTabClick = jest.fn();
    const onClick = jest.fn();
    const { getByText } = render(
      <TabNav onChange={onChange} onTabClick={onTabClick}>
        <TabNav.Item onClick={onClick} key='1'>111</TabNav.Item>
        <TabNav.Item key='2'>222</TabNav.Item>
        <TabNav.Item key='3'>333</TabNav.Item>
        <TabNav.Item key='4' disabled>444</TabNav.Item>
      </TabNav>
    );
    fireEvent.click(getByText('111'));
    // not change
    expect(onChange).not.toHaveBeenCalled();
    expect(onTabClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalled();
    fireEvent.click(getByText('222'));
    expect(onChange).toHaveBeenCalled();
  });

  it('will be not called, when disabled is given', () => {
    const onChange = jest.fn();
    const onTabClick = jest.fn();
    const onClick = jest.fn();
    const { getByText } = render(
      <TabNav onChange={onChange} onTabClick={onTabClick} defaultActiveKey='2'>
        <TabNav.Item onClick={onClick} disabled key='1'>111</TabNav.Item>
        <TabNav.Item key='2'>222</TabNav.Item>
        <TabNav.Item key='3'>333</TabNav.Item>
        <TabNav.Item key='4' disabled>444</TabNav.Item>
      </TabNav>
    );
    fireEvent.click(getByText('111'));
    // not called
    expect(onChange).not.toHaveBeenCalled();
    expect(onTabClick).not.toHaveBeenCalled();
    expect(onClick).not.toHaveBeenCalled();
  })


  it('should be render rightly', () => {
    const { container } = render(getTabNav());
    expect(container.getElementsByClassName('gio-tabnav-item')).toHaveLength(4);
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).toBe('111');
    expect(container.getElementsByClassName('gio-tabnav-item-disabled')[0].textContent).toBe('444');
  });

  it('should be render content rightly', () => {
    const { container, getByText } = render(getTabNav());
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).toBe('111');
    fireEvent.click(getByText('222'));
    expect(container.getElementsByClassName('gio-tabnav-item-active')[0].textContent).toBe('222');
  });

  it('only render TabNav.Item', () => {
    const { queryByText } = render(
      <TabNav defaultActiveKey="1">
        <TabNav.Item>111</TabNav.Item>
        <TabNav.Item>222</TabNav.Item>
        <TabNav.Item>333</TabNav.Item>
        <TabNav.Item disabled>444</TabNav.Item>
        <div>我不会被渲染</div>
      </TabNav>
    );
    expect(queryByText('我不会被渲染')).toBe(null);
  });

  test('Whether or not activekey is given, the ink-bar element have left and width style', () => {
    const { container, rerender } = render(getTabNav());
    const style = container.getElementsByClassName('gio-tabnav-ink-bar')[0].getAttribute('style');
    expect(style).not.toBe(null);
    expect(style!.includes('left') && style!.includes('width')).toBe(true);

    rerender(getTabNav({ activeKey: '1' }));
    const styleFromGivenActivekey = container.getElementsByClassName('gio-tabnav-ink-bar')[0].getAttribute('style');
    expect(styleFromGivenActivekey).not.toBe(null);
    expect(styleFromGivenActivekey!.includes('left') && styleFromGivenActivekey!.includes('width')).toBe(true);
  });
});
