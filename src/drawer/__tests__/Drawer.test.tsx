import { fireEvent, render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { act } from 'react-test-renderer';
import Drawer from '..';

describe('Drawer', () => {
  it('renders correctly', () => {
    render(<Drawer visible>content</Drawer>);
    expect(screen.getByTestId('drawer')).toHaveClass('gio-drawer-root');
  });

  it('support custom prop fixed=false', () => {
    render(
      <Drawer visible fixed={false}>
        content
      </Drawer>
    );
    expect(screen.getByTestId('drawer').querySelector('.gio-drawer')).toHaveClass('gio-drawer-normal');
  });
  it('should ignore prop width when fixed=false', () => {
    render(
      <Drawer visible fixed={false}>
        content
      </Drawer>
    );
    expect(screen.getByTestId('drawer').querySelector('.gio-drawer')).toHaveClass('gio-drawer-normal');
    expect(screen.getByTestId('drawer').querySelector('.gio-drawer')).not.toHaveStyle('width:500px');
  });
  it('support custom prop width', () => {
    render(
      <Drawer visible width={600}>
        content
      </Drawer>
    );
    expect(screen.getByTestId('drawer').querySelector('.gio-drawer')).toHaveStyle('width:600px');
  });
  it('support custom prop transitionName', () => {
    render(
      <Drawer visible transitionName="my-trans">
        content
      </Drawer>
    );
  });
  it('support custom prop maskTransitionName', () => {
    render(
      <Drawer visible maskTransitionName="my-trans">
        content
      </Drawer>
    );
  });
  it('can close when click close button', () => {
    const Demo = () => {
      const [visible, setVisible] = useState(false);
      return (
        <>
          <button
            type="button"
            onClick={() => {
              setVisible(true);
            }}
          >
            open
          </button>
          <Drawer
            maskClosable={false}
            visible={visible}
            onClose={() => {
              setVisible(false);
            }}
          >
            content
          </Drawer>
        </>
      );
    };
    render(<Demo />);
    fireEvent.click(screen.getByText('open'));
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByLabelText('Close'));
    });
    expect(screen.getByTestId('drawer').querySelector('.gio-drawer-wrap')).toHaveStyle('display: none');
  });
  it('fire onClose event when click close button', () => {
    const onDrawerClose = jest.fn();
    const Demo = () => {
      const [visible, setVisible] = useState(false);
      return (
        <>
          <button
            type="button"
            onClick={() => {
              setVisible(true);
            }}
          >
            open
          </button>
          <Drawer
            visible={visible}
            onClose={() => {
              setVisible(false);
              onDrawerClose();
            }}
          >
            content
          </Drawer>
        </>
      );
    };
    render(<Demo />);
    fireEvent.click(screen.getByText('open'));
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByLabelText('Close'));
    });
    expect(onDrawerClose).toHaveBeenCalled();
  });
});
