import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Tabs from '..';
import TabButton from '../TabButton';

describe('Testing Tabs', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Tabs>
        <Tabs.Tab label="tab1">
          <div>content1</div>
        </Tabs.Tab>
        <Tabs.Tab label="tab2">
          <div>content2</div>
        </Tabs.Tab>
      </Tabs>
    );
    expect(container.querySelector('.gio-tabs')).toBeInTheDocument();
    expect(container.querySelectorAll('.gio-tabs-tablist-button').length).toBe(2);
    expect(container.querySelector('.gio-tabs-tablist-button-active').textContent).toBe('tab1');
    const tab = screen.getByText('tab2');
    fireEvent.click(tab);
    expect(container.querySelector('.gio-tabs-tablist-button-active').textContent).toBe('tab2');
  });
  it('render with prop size small', () => {
    const { container } = render(
      <Tabs size="small">
        <Tabs.Tab key={1} label="tab1" value={1}>
          <div>content1</div>
        </Tabs.Tab>
        <Tabs.Tab key={2} label="tab2" value={2}>
          <div>content2</div>
        </Tabs.Tab>
      </Tabs>
    );
    expect(container.querySelector('.gio-tabs-tablist-button')).toHaveClass('gio-tabs-tablist-button-small');
  });
  it('fire change event when click tab', () => {
    const onChange = jest.fn();
    render(
      <Tabs defaultValue={1} onChange={onChange}>
        <Tabs.Tab key={1} label="tab1" value={1}>
          <div>content1</div>
        </Tabs.Tab>
        <Tabs.Tab key={2} label="tab2" value={2}>
          <div>content2</div>
        </Tabs.Tab>
      </Tabs>
    );
    const tab = screen.getByText('tab2');
    fireEvent.click(tab);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith(2);
  });
  it('controlled active tab', () => {
    const Demo = () => {
      const [active, setActive] = React.useState<string | number>(1);
      return (
        <Tabs value={active} onChange={setActive}>
          <Tabs.Tab key={1} label="tab1" value={1}>
            <div>content1</div>
          </Tabs.Tab>
          <Tabs.Tab key={2} label="tab2" value={2}>
            <div>content2</div>
          </Tabs.Tab>
        </Tabs>
      );
    };
    const { container } = render(<Demo />);
    expect(container.querySelector('.gio-tabs-tablist-button-active')).toBeInTheDocument();
    expect(container.querySelector('.gio-tabs-tablist-button-active').textContent).toBe('tab1');
    const tab = screen.getByText('tab2');
    fireEvent.click(tab);
    expect(container.querySelector('.gio-tabs-tablist-button-active').textContent).toBe('tab2');
  });

  it('render with tabListStyle ', () => {
    const { container } = render(
      <Tabs tabListStyle={{ backgroundColor: 'red' }}>
        <Tabs.Tab key={1} label="tab1" value={1}>
          <div>content1</div>
        </Tabs.Tab>
        <Tabs.Tab key={2} label="tab2" value={2}>
          <div>content2</div>
        </Tabs.Tab>
      </Tabs>
    );
    expect(container.querySelector('.gio-tabs-tablist')).toHaveStyle('background-color: red');
  });
  it('render Tabs.tab without children', () => {
    const { container } = render(
      <Tabs>
        <Tabs.Tab key={1} label="tab1" value={1} />
        <Tabs.Tab key={2} label="tab2" value={2} />
      </Tabs>
    );
    expect(container.querySelector('.gio-tabs-tablist-button')).toBeInTheDocument();
    expect(container.querySelector('.gio-tabs-tabpanel')).not.toBeInTheDocument();
  });
  it('render TabButton', () => {
    const { container } = render(
      <TabButton key={1} label="tab1" value={1} prefix={<span>prefix</span>}>
        TabButton
      </TabButton>
    );
    expect(container.querySelector('.gio-tabs-tablist-button')).toBeInTheDocument();
    expect(container.querySelector('.gio-tabs-tablist-button-prefix').firstChild).toHaveTextContent('prefix');
  });
});
