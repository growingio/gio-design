import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PageSteps, SmallModalSteps, MiddleModalSteps, DrawerSteps } from '../Steps.stories';
import Steps, { Step } from '../index';

describe('Testing steps', () => {
  it('basic steps', () => {
    render(<PageSteps {...PageSteps.args} />);
    fireEvent.click(screen.getByRole('button', { name: '下一步' }));
    expect(screen.getByText('Content 2')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '下一步' }));
    expect(screen.getByText('Content 3')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '完 成' }));
    expect(screen.getByText(/操作成功/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '上一步' }));
    expect(screen.getByText('Content 2')).toBeTruthy();
  });

  it('small modal steps', () => {
    render(<SmallModalSteps {...SmallModalSteps} />);
    fireEvent.click(screen.getByRole('button', { name: /open small modal/i }));
    expect(screen.getByText('Content 1')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '下一步' }));
    expect(screen.getByText('Content 2')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '完 成' }));
    expect(screen.getAllByText('操作成功！')).not.toBeNull();
  });

  it('middle modal steps', () => {
    render(<MiddleModalSteps {...MiddleModalSteps.args} />);
    fireEvent.click(screen.getByRole('button', { name: /open middle modal/i }));
    expect(screen.getByText('Content 1')).toBeTruthy();
  });

  it('drawer steps', () => {
    render(<DrawerSteps {...DrawerSteps.args} />);
    fireEvent.click(screen.getByRole('button', { name: /open drawer/i }));
    expect(screen.getByText('Content 1')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: '下一步' }));
    expect(screen.getByText('Content 2')).toBeTruthy();
  });

  it('click steps', () => {
    const clickMock = jest.fn();
    render(
      <Steps onClick={clickMock}>
        <Step key="1" title="title1" description="description1" stepNumber={1} />
        <Step key="2" title="title2" description="description2" />
        <Step key="3" title="title3" description="description3" />
      </Steps>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(clickMock).toBeCalledTimes(1);
  });

  it('not exist size', () => {
    render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <Steps type="modal" size="not-exist" current={2}>
        <Step key="1" title="title1" description="description1" />
        <Step key="2" title="title2" description="description2" />
        <Step key="3" title="title3" description="description3" />
      </Steps>
    );
    expect(screen.getAllByText(/description[1-3]{1}/i)).toHaveLength(2);
  });

  it('empty steps', () => {
    // eslint-disable-next-line react/no-children-prop
    const { container } = render(<Steps children={null} />);
    expect(container.getElementsByClassName('gio-steps')).toHaveLength(0);
  });
});
