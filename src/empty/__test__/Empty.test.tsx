import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DesignProvider } from '@gio-design/utils';
import { NoData, NoResult, Customize } from '../demos/Empty.stories';
import Empty from '../Empty';
import enUS from '../../locales/en-US';
import zhCN from '../../locales/zh-CN';

describe('Empty', () => {
  it('has default images', () => {
    expect(Empty.NO_DATA_IMAGE).toBeDefined();
    expect(Empty.NO_RESULT_IMAGE).toBeDefined();
  });

  it('renders with default props', () => {
    render(<NoData />);
    expect(screen.queryByTitle('No data image')).not.toBeNull();
    expect(screen.queryByText('暂无数据')).not.toBeNull();
  });

  it('can render no result image', () => {
    render(<NoResult />);
    expect(screen.queryByTitle('No result image')).toBeTruthy();
    expect(screen.queryByText('没有找到相关结果')).toBeTruthy();
  });

  it('can render with small size', () => {
    const { container } = render(<Empty size="small" />);
    expect(container.getElementsByClassName('gio-empty--small')).toBeTruthy();
  });

  it('can render the call to action', () => {
    const handleAction = jest.fn();
    render(<Customize {...Customize.args} cta={{ text: 'Create', onClick: handleAction }} />);
    expect(screen.queryByText('Dashboard image')).toBeTruthy();
    expect(screen.queryByText('Create')).toBeTruthy();

    fireEvent.click(screen.getByText('Create'));
    expect(handleAction).toHaveBeenCalled();
  });

  it('can render with customize locale', () => {
    render(<Empty locale={{ description: 'No result' }} />);
    expect(screen.queryByText('No result')).toBeTruthy();
  });

  it('renders with multi languages', () => {
    const { rerender } = render(
      <DesignProvider locale={enUS}>
        <Empty />
      </DesignProvider>
    );
    expect(screen.queryByText('No data')).toBeTruthy();

    rerender(
      <DesignProvider locale={zhCN}>
        <Empty />
      </DesignProvider>
    );
    expect(screen.queryAllByText('暂无数据')).toBeTruthy();
  });
});
