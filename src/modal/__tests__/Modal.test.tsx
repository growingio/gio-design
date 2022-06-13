import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Modal from '..';

describe('Test Modal', () => {
  it('renders corrrectly', () => {
    render(
      <Modal visible>
        <div>
          <h1>Modal</h1>
        </div>
      </Modal>
    );
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });
  it('controlls visible', () => {
    const Demo = () => {
      const [visible, setVisible] = React.useState(false);
      return (
        <div>
          <button type="button" onClick={() => setVisible(true)}>
            open
          </button>
          <Modal
            visible={visible}
            onOk={() => {
              setVisible(false);
            }}
            okText="ok"
            cancelText="取消"
            destroyOnClose
            onClose={() => setVisible(false)}
          >
            <div>
              <h1>Modal Content</h1>
            </div>
          </Modal>
        </div>
      );
    };
    render(<Demo />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('open'));
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    fireEvent.click(screen.getByText('取消'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('open'));
    fireEvent.click(screen.getByText('ok'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('open'));
    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
