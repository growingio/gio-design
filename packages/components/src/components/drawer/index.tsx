import * as React from 'react';
import RcDrawer from 'rc-drawer';
import { omit } from 'lodash';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import getScrollBarSize from 'rc-util/lib/getScrollBarSize';
import { Close } from '@gio-design/icons';
import classNames from 'classnames';

import { ConfigConsumerProps, withConfigConsumer, ConfigConsumer } from '../config-provider';
import { tuple } from '../../utils/type';

const DrawerContext = React.createContext<Drawer | null>(null);

type EventType = React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>;

type getContainerFunc = () => HTMLElement;

const PlacementTypes = tuple('top', 'right', 'bottom', 'left');
type placementType = typeof PlacementTypes[number];

export interface PushState {
  distance: string | number;
}
export interface DrawerProps {
  closable?: boolean;
  closeIcon?: React.ReactNode;
  destroyOnClose?: boolean;
  forceRender?: boolean;
  getContainer?: string | HTMLElement | getContainerFunc | false;
  maskClosable?: boolean;
  mask?: boolean;
  maskStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  /** wrapper dom node style of header and body */
  drawerStyle?: React.CSSProperties;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  title?: React.ReactNode;
  visible?: boolean;
  width?: number | string;
  height?: number | string;
  zIndex?: number;
  prefixCls?: string;
  push?: boolean | PushState;
  placement?: placementType;
  onClose?: (e: EventType) => void;
  afterVisibleChange?: (visible: boolean) => void;
  className?: string;
  handler?: React.ReactNode;
  keyboard?: boolean;
  footer?: React.ReactNode;
  footerStyle?: React.CSSProperties;
  direction?: string;
}

export interface IDrawerState {
  push?: boolean;
}

const defaultPushState: PushState = { distance: 180 };
class Drawer extends React.Component<DrawerProps & ConfigConsumerProps, IDrawerState> {
  public static defaultProps: any = {
    width: 480,
    height: 256,
    closable: true,
    placement: 'right' as placementType,
    maskClosable: true,
    mask: true,
    keyboard: true,
    push: defaultPushState,
    level: null,
  };

  private parentDrawer: Drawer | null;

  private destroyClose: boolean;

  public constructor(props: DrawerProps & ConfigConsumerProps) {
    super(props);
    this.state = {
      push: false,
    };
  }

  public componentDidMount() {
    // fix: delete drawer in child and re-render, no push started.
    // <Drawer>{show && <Drawer />}</Drawer>
    const { visible } = this.props;
    if (visible && this.parentDrawer) {
      this.parentDrawer.push();
    }
  }

  public componentDidUpdate(preProps: DrawerProps) {
    const { visible } = this.props;
    if (preProps.visible !== visible && this.parentDrawer) {
      if (visible) {
        this.parentDrawer.push();
      } else {
        this.parentDrawer.pull();
      }
    }
  }

  public componentWillUnmount() {
    // unmount drawer in child, clear push.
    if (this.parentDrawer) {
      this.parentDrawer.pull();
      this.parentDrawer = null;
    }
  }

  private onDestroyTransitionEnd = () => {
    const { visible } = this.props;
    const isDestroyOnClose = this.getDestroyOnClose();
    if (!isDestroyOnClose) {
      return;
    }
    if (!visible) {
      this.destroyClose = true;
      this.forceUpdate();
    }
  };

  private getDestroyOnClose = () => {
    const { destroyOnClose, visible } = this.props;
    return destroyOnClose && !visible;
  };

  private getPushDistance = () => {
    const { push } = this.props;
    let distance: number | string;
    if (typeof push === 'boolean') {
      distance = push ? defaultPushState.distance : 0;
    } else {
      distance = push!.distance;
    }
    return parseFloat(String(distance || 0));
  };

  // get drawer push width or height
  private getPushTransform = (placement?: placementType) => {
    const distance = this.getPushDistance();

    if (placement === 'left' || placement === 'right') {
      return `translateX(${placement === 'left' ? distance : -distance}px)`;
    }
    if (placement === 'top' || placement === 'bottom') {
      return `translateY(${placement === 'top' ? distance : -distance}px)`;
    }

    return undefined;
  };

  private getOffsetStyle() {
    const { placement, width, height, visible, mask } = this.props;
    if (!visible && !mask) {
      return {};
    }
    const offsetStyle: any = {};
    if (placement === 'left' || placement === 'right') {
      offsetStyle.width = width;
    } else {
      offsetStyle.height = height;
    }
    return offsetStyle;
  }

  private pull = () => {
    const { push } = this.props;
    if (push) {
      this.setState({ push: false });
    }
  };

  private push = () => {
    const { push } = this.props;
    if (push) {
      this.setState({ push: true });
    }
  };

  private getRcDrawerStyle = () => {
    const { zIndex, placement, mask, style } = this.props;
    const { push } = this.state;
    // 当无 mask 时，将 width 应用到外层容器上
    const offsetStyle = mask ? {} : this.getOffsetStyle();
    return {
      zIndex,
      transform: push ? this.getPushTransform(placement) : undefined,
      ...offsetStyle,
      ...style,
    };
  };

  private renderHeader() {
    const { title, prefixCls, closable, headerStyle } = this.props;
    if (!title && !closable) {
      return null;
    }

    const headerClassName = title ? `${prefixCls}-header` : `${prefixCls}-header-no-title`;
    return (
      <div className={headerClassName} style={headerStyle}>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        {closable && this.renderCloseIcon()}
      </div>
    );
  }

  private renderFooter() {
    const { footer, footerStyle, prefixCls } = this.props;
    if (!footer) {
      return null;
    }

    const footerClassName = `${prefixCls}-footer`;
    return (
      <div className={footerClassName} style={footerStyle}>
        {footer}
      </div>
    );
  }

  private renderCloseIcon() {
    const { closable, closeIcon = <Close />, prefixCls, onClose } = this.props;
    return (
      closable && (
        // eslint-disable-next-line react/button-has-type
        <button
          onClick={onClose}
          aria-label="Close"
          className={`${prefixCls}-close`}
          style={
            {
              '--scroll-bar': `${getScrollBarSize()}px`,
            } as any
          }
        >
          {closeIcon}
        </button>
      )
    );
  }

  // render drawer body dom
  private renderBody = () => {
    const { bodyStyle, drawerStyle, prefixCls, visible, children } = this.props;
    if (this.destroyClose && !visible) {
      return null;
    }
    this.destroyClose = false;

    const containerStyle: React.CSSProperties = {};

    const isDestroyOnClose = this.getDestroyOnClose();

    if (isDestroyOnClose) {
      // Increase the opacity transition, delete children after closing.
      containerStyle.opacity = 0;
      containerStyle.transition = 'opacity .3s';
    }

    return (
      <div
        className={`${prefixCls}-wrapper-body`}
        style={{
          ...containerStyle,
          ...drawerStyle,
        }}
        onTransitionEnd={this.onDestroyTransitionEnd}
      >
        {this.renderHeader()}
        <div className={`${prefixCls}-body`} style={bodyStyle}>
          {children}
        </div>
        {this.renderFooter()}
      </div>
    );
  };

  // render Provider for Multi-level drawer
  private renderProvider = (value: Drawer) => {
    this.parentDrawer = value;

    return (
      <ConfigConsumer>
        {({ getPopupContainer, rootPrefixCls, getPrefixCls }) => {
          const { prefixCls: customizePrefixCls, placement, className, mask, direction, visible, ...rest } = this.props;

          const prefixCls = getPrefixCls('drawer', customizePrefixCls ?? rootPrefixCls);
          const drawerClassName = classNames(className, {
            'no-mask': !mask,
            [`${prefixCls}-rtl`]: direction === 'rtl',
          });
          const offsetStyle = mask ? this.getOffsetStyle() : {};

          return (
            <DrawerContext.Provider value={this}>
              <RcDrawer
                handler={false}
                {...omit(rest as any, [
                  'zIndex',
                  'style',
                  'closable',
                  'closeIcon',
                  'destroyOnClose',
                  'drawerStyle',
                  'headerStyle',
                  'bodyStyle',
                  'footerStyle',
                  'footer',
                  'locale',
                  'title',
                  'push',
                  'visible',
                  'getPopupContainer',
                  'rootPrefixCls',
                  'getPrefixCls',
                  'renderEmpty',
                  'csp',
                  'pageHeader',
                  'autoInsertSpaceInButton',
                  'width',
                  'height',
                  'dropdownMatchSelectWidth',
                  'getTargetContainer',
                ])}
                getContainer={
                  // 有可能为 false，所以不能直接判断
                  rest.getContainer === undefined && getPopupContainer
                    ? () => getPopupContainer(document.body)
                    : rest.getContainer
                }
                {...offsetStyle}
                prefixCls={prefixCls}
                open={visible}
                showMask={mask}
                placement={placement}
                style={this.getRcDrawerStyle()}
                className={drawerClassName}
              >
                {this.renderBody()}
              </RcDrawer>
            </DrawerContext.Provider>
          );
        }}
      </ConfigConsumer>
    );
  };

  public render() {
    return <DrawerContext.Consumer>{this.renderProvider}</DrawerContext.Consumer>;
  }
}

export default withConfigConsumer<DrawerProps>({
  subPrefixCls: 'drawer',
})(Drawer);
