import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import Collapse from '..';
import { sleep } from '../../utils/test';

describe('Collapse', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Collapse>
        <div>content</div>
      </Collapse>
    );
    expect(screen.queryByTestId('collapse')).toBeInTheDocument();
    expect(screen.queryByText('content')).toBeInTheDocument();
    expect(container.querySelector('.gio-collapse')).toHaveClass('gio-collapse-bordered', { exact: false });
  });
  it('renders with Collapse.Panel', () => {
    const { container } = render(
      <Collapse activeKey={2}>
        <Collapse.Panel key={1} header="header1">
          content1
        </Collapse.Panel>
        <Collapse.Panel key={2} header="header2">
          content2
        </Collapse.Panel>
      </Collapse>
    );
    expect(container.querySelectorAll('.gio-collapse-item').length).toBe(2);
    expect(container.querySelector('.gio-collapse-item-active')).toHaveTextContent('header2');
  });
  it('renders Collapse with disabled', () => {
    const { container } = render(
      <Collapse activeKey={2} disabled>
        <Collapse.Panel key={1} header="header1">
          content1
        </Collapse.Panel>
        <Collapse.Panel key={2} header="header2">
          content2
        </Collapse.Panel>
      </Collapse>
    );
    expect(container.querySelectorAll('.gio-collapse-item-disabled').length).toBe(2);
  });
  it('renders with Collapse.Panel with extra', () => {
    const { container } = render(
      <Collapse>
        <Collapse.Panel key={1} header="header1" extra={<button type="button">extra</button>}>
          content1
        </Collapse.Panel>
      </Collapse>
    );
    expect(container.querySelector('.gio-collapse-extra')).toBeInTheDocument();
    expect(container.querySelector('.gio-collapse-extra').children[0]).toHaveTextContent('extra');
  });
  it('nested Collapse', () => {
    const { container } = render(
      <Collapse defaultActiveKey={1}>
        <Collapse.Panel key={1} header="header1">
          <Collapse>
            <Collapse.Panel key={1.1} header="header2">
              content1
            </Collapse.Panel>
          </Collapse>
        </Collapse.Panel>
      </Collapse>
    );
    expect(container.querySelectorAll('.gio-collapse-item').length).toBe(2);
    expect(container.querySelectorAll('.gio-collapse-item')[0]).toHaveClass('gio-collapse-item-active');
  });
  it('renders with expandIcon', () => {
    const { container } = render(
      <Collapse expandIcon={() => <span>expandIcon</span>}>
        <Collapse.Panel key={1} header="header1">
          content1
        </Collapse.Panel>
      </Collapse>
    );

    expect(container.querySelector('.collapse-arrow-bar').children[0]).toHaveTextContent('expandIcon');
  });
  it('renders with custom data-testid', () => {
    const { container } = render(
      <Collapse data-testid="custom-collapse">
        <Collapse.Panel key={1} header="header1">
          content1
        </Collapse.Panel>
      </Collapse>
    );
    expect(container.querySelector('.gio-collapse-contain')).toHaveAttribute('data-testid', 'custom-collapse');
  });
  it('renders with custom className and without bordered', () => {
    const { container } = render(
      <Collapse className="custom-collapse" bordered={false}>
        <Collapse.Panel key={1} header="header1" className="custom-panel" showArrow={false}>
          content1
        </Collapse.Panel>
      </Collapse>
    );
    screen.debug();
    expect(container.querySelector('.gio-collapse')).toHaveClass('custom-collapse');
    expect(container.querySelector('.gio-collapse')).not.toHaveClass('gio-collapse-bordered');
    expect(container.querySelector('.custom-panel')).toHaveClass('gio-collapse-no-arrow');
  });
  it('accordion Collapse', async () => {
    jest.useFakeTimers();
    const { container } = render(
      <Collapse accordion>
        <Collapse.Panel key={1} header="header1">
          content1
        </Collapse.Panel>
        <Collapse.Panel key={2} header="header2">
          content2
        </Collapse.Panel>
      </Collapse>
    );

    expect(container.querySelectorAll('.gio-collapse-item').length).toBe(2);
    fireEvent.click(screen.getByText('header1'));
    jest.runOnlyPendingTimers();
    expect(container.querySelectorAll('.gio-collapse-item')[0]).toHaveClass('gio-collapse-item-active');
    fireEvent.click(screen.getByText('header2'));
    jest.runOnlyPendingTimers();
    expect(container.querySelectorAll('.gio-collapse-item')[1]).toHaveClass('gio-collapse-item-active');
    expect(container.querySelectorAll('.gio-collapse-item')[0]).not.toHaveClass('gio-collapse-item-active');
    jest.useRealTimers();
  });
});
