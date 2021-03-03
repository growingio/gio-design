import React, { useContext } from 'react';
import { render, mount } from 'enzyme';
import Drawer from '..';
import Button from '../../button';
import { ConfigContext } from '../../config-provider';

describe('Drawer Base', () => {
  it('render top drawer', () => {
    const wrapper = render(
      <Drawer visible height={400} placement="top" getContainer={false}>
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('have a title', () => {
    const wrapper = render(
      <Drawer visible title="Test Title" getContainer={false}>
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('getContainer is undefined', () => {
    const Wrapper = () => {
      const context = useContext(ConfigContext);
      return (
        <ConfigContext.Provider
          value={{
            ...context,
            getPopupContainer: (trigger) => trigger,
          }}
        >
          <Drawer visible>Here is content of Drawer</Drawer>
        </ConfigContext.Provider>
      );
    };
    const wrapper = mount(<Wrapper />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('closable is false', () => {
    const wrapper = render(
      <Drawer visible closable={false} getContainer={false}>
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('destroyOnClose is true', () => {
    const wrapper = render(
      <Drawer destroyOnClose visible={false} getContainer={false}>
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('have a footer', () => {
    const wrapper = render(
      <Drawer visible footer="Test Footer" getContainer={false}>
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('support closeIcon', () => {
    const wrapper = render(
      <Drawer visible closable closeIcon={<span>close</span>} width={400} getContainer={false}>
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper).toMatchSnapshot();
  });
});

class MultiDrawer extends React.Component {
  state = { visible: false, childrenDrawer: false, hasChildren: true };

  static contextType = ConfigContext;

  showDrawer = () => {
    this.setState({
      visible: true,
      hasChildren: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  showChildrenDrawer = () => {
    this.setState({
      childrenDrawer: true,
      hasChildren: true,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false,
    });
  };

  onRemoveChildDrawer = () => {
    this.setState({
      hasChildren: false,
    });
  };

  render() {
    const { childrenDrawer, visible, hasChildren } = this.state;
    const { placement, push, mask } = this.props;
    return (
      <div>
        <Button type="primary" id="open_drawer" onClick={this.showDrawer}>
          Open drawer
        </Button>
        <Button type="primary" id="remove_drawer" onClick={this.onRemoveChildDrawer}>
          rm child drawer
        </Button>
        <ConfigContext.Provider
          value={{
            ...this.context,
            getPopupContainer: (triggerNode) => triggerNode,
          }}
        >
          <Drawer
            title="Multi-level drawer"
            className="test_drawer"
            width={520}
            onClose={this.onClose}
            getContainer={false}
            placement={placement}
            visible={visible}
            push={push}
            mask={mask}
          >
            <Button type="primary" id="open_two_drawer" onClick={this.showChildrenDrawer}>
              Two-level drawer
            </Button>
            {hasChildren && (
              <Drawer
                title="Two-level Drawer"
                width={320}
                className="Two-level"
                getContainer={false}
                placement={placement}
                onClose={this.onChildrenDrawerClose}
                visible={childrenDrawer}
                mask={mask}
              >
                <div id="two_drawer_text">This is two-level drawer</div>
              </Drawer>
            )}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e8e8e8',
                padding: '10px 16px',
                textAlign: 'right',
                left: 0,
                background: '#fff',
                borderRadius: '0 0 4px 4px',
              }}
            >
              <Button
                style={{
                  marginRight: 8,
                }}
                onClick={this.onClose}
              >
                Cancel
              </Button>
              <Button onClick={this.onClose} type="primary">
                Submit
              </Button>
            </div>
          </Drawer>
        </ConfigContext.Provider>
      </div>
    );
  }
}

describe('Multi Drawer', () => {
  it('render right MultiDrawer', () => {
    const wrapper = mount(<MultiDrawer placement="right" />);
    wrapper.find('button#open_drawer').simulate('click');
    wrapper.find('button#open_two_drawer').simulate('click');
    const translateX = wrapper.find('.gio-drawer.test_drawer').get(0).props.style.transform;
    expect(translateX).toEqual('translateX(-180px)');
    expect(wrapper.find('#two_drawer_text').exists()).toBe(true);
  });

  it('render left MultiDrawer', () => {
    const wrapper = mount(<MultiDrawer placement="left" />);
    wrapper.find('button#open_drawer').simulate('click');
    wrapper.find('button#open_two_drawer').simulate('click');
    const translateX = wrapper.find('.gio-drawer.test_drawer').get(0).props.style.transform;
    expect(translateX).toEqual('translateX(180px)');
    expect(wrapper.find('#two_drawer_text').exists()).toBe(true);
    wrapper.find('.Two-level .gio-drawer-close').simulate('click');
    expect(wrapper.state().childrenDrawer).toBe(false);
  });

  it('render top MultiDrawer', () => {
    const wrapper = mount(<MultiDrawer placement="top" />);
    wrapper.find('button#open_drawer').simulate('click');
    wrapper.find('button#open_two_drawer').simulate('click');
    const translateX = wrapper.find('.gio-drawer.test_drawer').get(0).props.style.transform;
    expect(translateX).toEqual('translateY(180px)');
    expect(wrapper.find('#two_drawer_text').exists()).toBe(true);
  });

  it('render bottom MultiDrawer', () => {
    const wrapper = mount(<MultiDrawer placement="bottom" />);
    wrapper.find('button#open_drawer').simulate('click');
    wrapper.find('button#open_two_drawer').simulate('click');
    const translateX = wrapper.find('.gio-drawer.test_drawer').get(0).props.style.transform;
    expect(translateX).toEqual('translateY(-180px)');
    expect(wrapper.find('#two_drawer_text').exists()).toBe(true);
  });

  it('render MultiDrawer is child in unmount', () => {
    const wrapper = mount(<MultiDrawer placement="top" mask={false} />);
    wrapper.find('button#open_drawer').simulate('click');
    wrapper.find('button#open_two_drawer').simulate('click');
    wrapper.find('button#remove_drawer').simulate('click');
    let translateX = wrapper.find('.gio-drawer.test_drawer').get(0).props.style.transform;
    expect(translateX).toEqual(undefined);
    wrapper.find('button#open_two_drawer').simulate('click');
    translateX = wrapper.find('.gio-drawer.test_drawer').get(0).props.style.transform;
    expect(translateX).toEqual('translateY(180px)');
    expect(wrapper.find('#two_drawer_text').exists()).toBe(true);
  });

  it('custom MultiDrawer push distance', () => {
    const wrapper = mount(<MultiDrawer push={{ distance: 256 }} />);
    wrapper.find('button#open_drawer').simulate('click');
    wrapper.find('button#open_two_drawer').simulate('click');
    const translateX = wrapper.find('.gio-drawer.test_drawer').get(0).props.style.transform;
    expect(translateX).toEqual('translateX(-256px)');
  });

  it('custom MultiDrawer push with true', () => {
    const wrapper = mount(<MultiDrawer push />);
    wrapper.find('button#open_drawer').simulate('click');
    wrapper.find('button#open_two_drawer').simulate('click');
    const translateX = wrapper.find('.gio-drawer.test_drawer').get(0).props.style.transform;
    expect(translateX).toEqual('translateX(-180px)');
  });

  it('custom MultiDrawer push with false', () => {
    const wrapper = mount(<MultiDrawer push={false} />);
    wrapper.find('button#open_drawer').simulate('click');
    wrapper.find('button#open_two_drawer').simulate('click');
    const translateX = wrapper.find('.gio-drawer.test_drawer').get(0).props.style.transform;
    expect(translateX).toBeUndefined();
  });
});

class DrawerEventTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }

  componentDidMount() {
    this.setState({ visible: true }); // eslint-disable-line react/no-did-mount-set-state
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  open = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.open}>open</Button>
        <Drawer visible={visible} onClose={this.onClose} getContainer={false} {...this.props}>
          Here is content of Drawer
        </Drawer>
      </div>
    );
  }
}

describe('Drawer Events', () => {
  it('render correctly', () => {
    const wrapper = mount(<DrawerEventTester />);
    const body = wrapper.find('.gio-drawer-body').exists();

    expect(body).toBe(true);
    wrapper.find('button.gio-btn').simulate('click');

    const content = wrapper.find('.gio-drawer-body').getDOMNode().innerHTML;
    expect(content).toBe('Here is content of Drawer');

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('mask trigger onClose', () => {
    const wrapper = mount(<DrawerEventTester />);

    wrapper.find('button.gio-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.gio-drawer-mask').simulate('click');
    expect(wrapper.instance().state.visible).toBe(false);
  });

  it('close button trigger onClose', () => {
    const wrapper = mount(<DrawerEventTester />);

    wrapper.find('button.gio-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.gio-drawer-close').simulate('click');
    expect(wrapper.instance().state.visible).toBe(false);
  });

  it('maskClosable no trigger onClose', () => {
    const wrapper = mount(<DrawerEventTester maskClosable={false} />);

    wrapper.find('button.gio-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.gio-drawer-mask').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);
  });

  it('dom should be removed after close when destroyOnClose is true', () => {
    const wrapper = mount(<DrawerEventTester destroyOnClose />);
    wrapper.find('button.gio-btn').simulate('click');
    expect(wrapper.find('.gio-drawer-wrapper-body').exists()).toBe(true);

    wrapper.setState({
      visible: false,
    });
    wrapper.find('.gio-drawer-wrapper-body').simulate('transitionend');
    expect(wrapper.find('.gio-drawer-wrapper-body').exists()).toBe(false);
  });

  it('dom should be existed after close when destroyOnClose is false', () => {
    const wrapper = mount(<DrawerEventTester />);
    wrapper.find('button.gio-btn').simulate('click');
    expect(wrapper.find('.gio-drawer-wrapper-body').exists()).toBe(true);

    wrapper.setState({
      visible: false,
    });
    wrapper.find('.gio-drawer-wrapper-body').simulate('transitionend');
    expect(wrapper.find('.gio-drawer-wrapper-body').exists()).toBe(true);
  });

  it('no mask and no closable', () => {
    const wrapper = mount(<DrawerEventTester destroyOnClose />);

    wrapper.find('button.gio-btn').simulate('click');
    expect(wrapper.instance().state.visible).toBe(true);

    wrapper.find('.gio-drawer-close').simulate('click');
    expect(wrapper.instance().state.visible).toBe(false);
  });
});
