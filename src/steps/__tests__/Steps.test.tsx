import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Steps from '..';

describe('Test Steps', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Steps>
        <Steps.Step title="Step 1" />
        <Steps.Step title="Step 2" />
      </Steps>
    );
    expect(container.querySelector('.gio-steps')).toBeInTheDocument();
  });
  it('should render correctly with current below zaro ', () => {
    const { container } = render(
      <Steps current={-1}>
        <Steps.Step title="Step 1" />
        <Steps.Step title="Step 2" />
      </Steps>
    );
    expect(container.querySelector('.gio-steps-item-pending')).toHaveTextContent('Step 1');
  });
  it('renders with prop size', () => {
    const { container } = render(
      <Steps size="small">
        <Steps.Step title="Step 1" />
        <Steps.Step title="Step 2" />
      </Steps>
    );
    expect(container.querySelector('.gio-steps-small')).toBeInTheDocument();
  });
  it('can click step', () => {
    const stepClick = jest.fn();
    const { container } = render(
      <Steps defaultCurrent={2}>
        <Steps.Step title="Step 1" onClick={stepClick} />
        <Steps.Step title="Step 2" />
      </Steps>
    );
    fireEvent.click(screen.getByText('Step 1'));
    expect(container.querySelector('.gio-steps-item-active')).toHaveTextContent('Step 1');
    expect(stepClick).toHaveBeenCalledTimes(1);
  });
  it('should change current', () => {
    const change = jest.fn();
    const { container } = render(
      <Steps defaultCurrent={2} onChange={change}>
        <Steps.Step title="Step 1" />
        <Steps.Step title="Step 2" />
      </Steps>
    );
    expect(container.querySelector('.gio-steps-item-active')).toHaveTextContent('Step 2');
    fireEvent.click(screen.getByText('Step 1'));
    expect(change).toHaveBeenCalledWith(1);
    expect(change).toHaveBeenCalledTimes(1);
    expect(container.querySelector('.gio-steps-item-active')).toHaveTextContent('Step 1');
  });

  it('render disabled Step', () => {
    const { container } = render(
      <Steps>
        <Steps.Step title="Step 1" disabled />
        <Steps.Step title="Step 2" />
      </Steps>
    );
    expect(container.querySelector('.gio-steps-item-disabled')).toBeInTheDocument();
    expect(container.querySelector('.gio-steps-item-disabled')).not.toHaveAttribute('tabIndex');
  });

  it('render Step with icon', () => {
    const { container } = render(<Steps.Step title="Step 1" prefix={<span>1</span>} />);
    expect(container.querySelector('.gio-steps-item-prefix').firstChild).toHaveTextContent('1');
    fireEvent.click(screen.getByText('Step 1'));
  });
});
