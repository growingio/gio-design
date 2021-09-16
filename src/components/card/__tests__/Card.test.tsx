import React from 'react';
import _ from 'lodash';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default, Demo, Disabled, Multiple, Footer } from '../Card.stories';
import Card from '../index';

describe('Testing Card', () => {
  it('default', () => {
    render(<Default {...Default.args} />);
    expect(screen.getAllByText(/卡片.?标题/, { exact: false })).toHaveLength(2);
  });

  it('demo card', () => {
    render(<Demo {...Demo.args} />);
    expect(screen.getAllByText('卡片标题')).toHaveLength(23);
  });

  it('disabled card', () => {
    render(<Disabled {...Disabled.args} />);
    expect(screen.getAllByText('卡片标题')).toHaveLength(1);
  });

  it('multiple card', () => {
    render(<Multiple {...Multiple.args} />);
    expect(screen.getAllByText('A')).toHaveLength(1);
  });

  it('footer card', () => {
    const mockClick = jest.fn();
    _.set(Footer.args, 'clickable', true);
    render(<Footer {..._.set(Footer.args, 'onClick', mockClick)} />);
    fireEvent.click(screen.getByRole('button', { hidden: true, name: '按 钮' }));
    expect(mockClick).toBeCalledTimes(1);
  });

  it('card meta test', () => {
    _.set(
      Default.args,
      'children',
      <>
        <Card.Meta image="../../../assets/images/Avatar.png" title="卡片标题" description="卡片副标题" />
        <Card.Meta image="" />
      </>
    );
    render(<Default {...Default.args} />);
    expect(screen.getAllByText('卡片标题')).toHaveLength(1);
  });
});
