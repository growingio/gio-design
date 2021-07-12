import React from 'react';
import _ from 'lodash';
import { render, screen, fireEvent } from '@testing-library/react';
import { Base, Alert, Closeable } from '../Banner.stories';

describe('Testing Banner', () => {
  it('basic', () => {
    render(<Base {...Base.args} />);
    expect(screen.queryByText('欧治云商运营负责人复盘B2B增长实践', { exact: false })).not.toBeNull();
  });

  it('alert banner', () => {
    render(<Alert {..._.set(Alert.args, 'button', '123')} />);
    expect(screen.queryByText('客户您好，工单系统将于2月2日～2月10日暂停服务', { exact: false })).not.toBeNull();
  });

  it('closeable', () => {
    const mockClose = jest.fn();
    render(<Closeable {..._.set(Closeable.args, 'onClose', mockClose)} />);
    fireEvent.click(screen.getByLabelText('close-outlined'));
    expect(mockClose).toBeCalledTimes(1);
  });
});
