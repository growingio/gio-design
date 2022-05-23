import { fireEvent, render, screen, act } from "@testing-library/react"
import { renderHook } from '@testing-library/react-hooks'
import React from "react"
import Layout from ".."
import Button from "../../button"
import { sleep } from "../../utils/test"
import Content from "../Content"
import Header from "../Header"
import Sider from "../Sider"
import useSiders from "../useSiders"

describe('Testing Layout', () => {
  it('render layout', () => {
    const { container } = render(<Layout>
      <Header>Header</Header>
      <Sider>Sider</Sider>
      <Content>Content</Content>
    </Layout>);
    expect(container.querySelector('section[class~="gio-layout"]')).toBeTruthy();
    expect(container.querySelector('header[class~="gio-layout-header"]')).toBeTruthy();
    expect(container.querySelector('aside[class~="gio-layout-sider"]')).toBeTruthy();
    expect(container.querySelector('main[class~="gio-layout-content"]')).toBeTruthy();
    expect(container.querySelector('.gio-layout-content-main')).toHaveStyle({ 'max-width': '1320px' });
  });

  it('render layout fixed', () => {
    const { container } = render(<Layout fixed>
      <Header>Header</Header>
      <Layout className="custom-cls">
        <Content maxWidth={1440}>Content</Content>
      </Layout>
    </Layout>);
    expect(container.querySelector('section[class~="custom-cls"]')).toHaveStyle('height: calc(100% - 60px)');
    expect(container.querySelector('section[class~="gio-layout-fixed"]')).toBeTruthy();
    expect(container.querySelector('.gio-layout-content-main')).toHaveStyle('max-width:1440px');
  });

  it('render layout content autoWidth', () => {
    const { container } = render(<Layout>
      <Content maxWidth="auto">Content</Content>
    </Layout>);
    expect(container.querySelector('.gio-layout-content-main')).toHaveStyle('max-width: 100%');
  });
  it('render layout without children', () => {
    const { container } = render(<Layout />);
    expect(container.querySelector('section[class~="gio-layout"]')).toBeTruthy();

  });

  it('detect the sider inside the children', async () => {
    const { container } = render(
      <Layout>
        <div>
          <Sider>Sider</Sider>
        </div>
        <Content>Content</Content>
      </Layout>,
    );
    expect(container.querySelector('.gio-layout').classList.contains('gio-layout-has-sider')).toBe(true);
  });

  it('render header', () => {
    const { container } = render(<Layout>
      <Header className="header" style={{ backgroundColor: '#ffffff' }} justify="flex-start">
        <h3>title</h3>
        <Header.HeaderDivider className="divide" />
        <Header.HeaderSection className="header-section1" justify="flex-start">section 1</Header.HeaderSection>
        <Header.HeaderDivider className="divide" />
        <Header.HeaderSection>section 2</Header.HeaderSection>
        <Header.HeaderDivider className="divide" />
      </Header>
      <Content maxWidth="1440px">Content</Content>
    </Layout>);
    // screen.debug()
    expect(container.querySelector('.header')).toHaveStyle('--layout-header-justify: flex-start; background-color: rgb(255, 255, 255);');
    expect(container.querySelector('section[class~="gio-layout-header-section"]')).toBeTruthy();
    expect(container.querySelector('.header-section1')).toHaveStyle('--layout-header-section-justify: flex-start');
  });

  it('sider collapse', () => {
    const { container } = render(<Layout>
      <Sider trigger="bottom">Sider</Sider>
      <Content>Content</Content>
    </Layout>);
    const sider = container.querySelector('.gio-layout-sider');
    expect(sider).toHaveClass('gio-layout-sider-collapsed');
    expect(sider.getAttribute('style')).toBe('--layout-sider-width: 200px; --layout-sider-collapsedWidth: 80px; --layout-sider-collapsedWidth-negative: -80px;');
    expect(screen.queryByTestId('right-icon')).toBeTruthy();
    expect(screen.queryByTestId('left-icon')).toBeFalsy();
    fireEvent.click(sider.querySelector('.gio-layout-sider-bottom-trigger'));
    expect(sider).not.toHaveClass('gio-layout-sider-collapsed');
    expect(screen.queryByTestId('left-icon')).toBeTruthy();
  });
  it('sider trigger prop should be "bottom" string', () => {
    const { container } = render(<Layout>
      <Sider trigger="other">Sider</Sider>
      <Content>Content</Content>
    </Layout>);
    const sider = container.querySelector('.gio-layout-sider');
    expect(sider.querySelector('.gio-layout-sider-bottom-trigger')).toBeFalsy();
  })
  it('sider collapsedWidth', () => {
    const { container } = render(<Layout>
      <Sider width={240} collapsedWidth={100}>Sider</Sider>
      <Content>Content</Content>
    </Layout>);
    const sider = container.querySelector('.gio-layout-sider');
    expect(sider.getAttribute('style')).toBe('--layout-sider-width: 240px; --layout-sider-collapsedWidth: 100px; --layout-sider-collapsedWidth-negative: -100px;');
  });
  it('sider onCollapse', () => {
    const onCollapse = jest.fn();
    const mockGetBoundingClientRect = jest.spyOn(window.HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
      x: 851.671875,
      y: 200.046875,
      width: 200,
      height: 17,
      top: 967.046875,
      right: 860.015625,
      bottom: 984.046875,
      left: 851.671875,
      toJSON: () => ''
    }))
    const { container } = render(<Layout>
      <Sider onCollapse={onCollapse} defaultCollapsed trigger="bottom">Sider</Sider>
      <Content>Content</Content>
    </Layout>);
    const sider = container.querySelector('.gio-layout-sider');
    sider.getBoundingClientRect()
    fireEvent.click(sider.querySelector('.gio-layout-sider-bottom-trigger'));
    expect(onCollapse).toHaveBeenCalled();
    mockGetBoundingClientRect.mockReset();
    mockGetBoundingClientRect.mockRestore();
  })
  it('sider controlled collapse', () => {
    const Demo = () => {
      const [collapsed, setCollapsed] = React.useState(false);
      return <Layout>
        <Sider collapsed={collapsed} trigger={<Button className="trigger-btn" onClick={() => setCollapsed(true)}>{collapsed ? 'expand' : 'collapse'}</Button>}>Sider</Sider>
        <Content>Content</Content>
      </Layout>
    }
    const { container } = render(<Demo />);
    const sider = container.querySelector('.gio-layout-sider')
    expect(sider).not.toHaveClass('gio-layout-sider-collapsed');
    act(() => {
      fireEvent.click(sider.querySelector('.trigger-btn'));

    });
    // screen.debug()
    expect(sider).toHaveClass('gio-layout-sider-collapsed');

  });

  it('sider suspend', () => {
    const onCollapse = jest.fn();

    const { container } = render(<Layout>
      <Sider suspendedPosition="left" onCollapse={onCollapse} defaultCollapsed={false} trigger="bottom">Sider</Sider>
      <Content>Content</Content>
    </Layout>);
    const sider = container.querySelector('.gio-layout-sider');
    expect(sider).toHaveClass('gio-layout-sider-suspend gio-layout-sider-suspend-left')

  })
})

describe('useSiders', () => {
  it('render hook', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useSiders());

    act(() => {
      const updateSiders = result.current[2];
      updateSiders({
        id: '1',
        width: 200,
        collapsedWidth: 80,
        suspendedPosition: 'right',
      });
      updateSiders({
        id: '2',
        width: 210,
        collapsedWidth: 80,
        suspendedPosition: 'left',
      })
    })
    await sleep(20)
    jest.runAllTimers()
    expect(result.current[0].length).toBe(2);
    act(() => {
      const removeSider = result.current[1];
      removeSider('2');
    })
    expect(result.current[0].length).toBe(1);
    // removeSider('')
  })
})