/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Default, ChangeContent } from '../demos/Drawer.stories';
import Drawer, { DrawerProps } from '../index';
import Button from '../../../legacy/button';
import { ConfigContext } from '../../config-provider';

const ParentsDrawer: React.FC = (args: DrawerProps) => {
  const [parentVisible, setParentVisible] = React.useState(false);
  const [childVisible, setChildVisible] = React.useState(false);
  return (
    <>
      <div>
        <Button type="primary" onClick={() => setParentVisible(true)}>
          Open
        </Button>
      </div>
      <Drawer title="title" onClose={() => setParentVisible(false)} visible={parentVisible} {...args}>
        <Button type="primary" onClick={() => setChildVisible(true)}>
          Open child
        </Button>
        <Drawer onClose={() => setChildVisible(false)} visible={childVisible} {...args}>
          child content
        </Drawer>
      </Drawer>
    </>
  );
};

const BasicDrawer = (props: DrawerProps) => {
  const [visible, setVisible] = React.useState(false);

  const open = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <div>
      <Button onClick={open}>open</Button>
      <Drawer visible={visible} onClose={onClose} getContainer={false} {...props}>
        Here is content of Drawer
      </Drawer>
    </div>
  );
};

describe('Testing drawer', () => {
  it('default drawer', () => {
    render(<Default {...Default.args} />);
    fireEvent.click(screen.getByRole('button', { name: /open/i }));
    expect(screen.getAllByText('Some contents...')).toHaveLength(3);
  });

  it('change content drawer', () => {
    render(<ChangeContent {...ChangeContent.args} />);
    fireEvent.click(screen.getByRole('button', { name: /open/i }));
    expect(screen.getAllByRole('textbox')).toHaveLength(1);
  });

  it('parent drawer', () => {
    const args1: DrawerProps = {
      push: true,
    };
    const args2: DrawerProps = {
      visible: true,
    };
    const { rerender } = render(<ParentsDrawer {...args1} />);
    fireEvent.click(screen.getByRole('button', { name: /open/i }));
    fireEvent.click(screen.getByRole('button', { name: /open child/i }));
    rerender(<ParentsDrawer {...args2} />);
    expect(screen.getAllByText('child content')).toHaveLength(1);
  });

  it('render parent drawer is child in unmount', () => {
    const args: DrawerProps = {
      placement: 'top',
      mask: false,
    };
    render(<ParentsDrawer {...args} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[2]);
    fireEvent.click(screen.getAllByRole('button')[3]);
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  test('onPrev, onNext', () => {
    const onPrev = jest.fn();
    const onNext = jest.fn();
    const { container } = render(
      <div id="mount-point">
        <Drawer visible closable onPrev={onPrev} onNext={onNext} getContainer="#mount-point">
          Here is content of Drawer
        </Drawer>
      </div>
    );
    fireEvent.click(container.getElementsByClassName('gio-drawer-prev-next')[0].firstChild);
    expect(onPrev).toBeCalled();
    fireEvent.click(container.getElementsByClassName('gio-drawer-prev-next')[0].lastChild);
    expect(onNext).toBeCalled();
  });

  it('getContainer is undefined', () => {
    render(
      <ConfigContext.Provider
        value={{
          getPopupContainer: (trigger: any) => trigger,
          getPrefixCls: () => 'gio',
        }}
      >
        <Drawer visible>Here is content of Drawer</Drawer>
      </ConfigContext.Provider>
    );
    expect(screen.getByText('Here is content of Drawer')).toBeTruthy();
  });

  it('destroyOnClose is true', () => {
    render(
      <Drawer destroyOnClose visible={false} getContainer={false}>
        Here is content of Drawer
      </Drawer>
    );
    expect(screen.getAllByText('Here is content of Drawer')).toHaveLength(1);
  });

  it('dom should be removed after close when destroyOnClose is true', () => {
    const { rerender, container } = render(<BasicDrawer destroyOnClose />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(container.getElementsByClassName('gio-drawer-wrapper-body')).toBeTruthy();
    rerender(<BasicDrawer destroyOnClose visible={false} />);
    fireEvent.transitionEnd(container.getElementsByClassName('gio-drawer-wrapper-body')[0]);
    expect(container.getElementsByClassName('gio-drawer-wrapper-body')[0]).toBeFalsy();
  });

  it('dom should be existed after close when destroyOnClose is false', () => {
    const { rerender, container } = render(<BasicDrawer />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(container.getElementsByClassName('gio-drawer-wrapper-body')).toBeTruthy();
    rerender(<BasicDrawer visible={false} />);
    fireEvent.transitionEnd(container.getElementsByClassName('gio-drawer-wrapper-body')[0]);
    expect(container.getElementsByClassName('gio-drawer-wrapper-body')[0]).toBeTruthy();
  });

  it('empty header', () => {
    render(<BasicDrawer closable={false} title="" />);
    expect(screen.getAllByText('Here is content of Drawer')).toHaveLength(1);
  });

  it('parent drawer set visible = true', () => {
    const args: DrawerProps = {
      visible: true,
    };
    render(<ParentsDrawer {...args} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    fireEvent.click(screen.getAllByRole('button')[2]);
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });
});
