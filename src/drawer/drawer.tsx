/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import RcDrawer from 'rc-drawer';
import { isUndefined, omit } from 'lodash';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import getScrollBarSize from 'rc-util/lib/getScrollBarSize';
import { CloseOutlined, LeftOutlined, RightOutlined } from '@gio-design/icons';
import classNames from 'classnames';
import { IconButton } from '../button';
import Skeleton from '../skeleton';
import { ConfigConsumerProps, withConfigConsumer, ConfigConsumer } from '../components/config-provider';
import { PushState, IDrawerState, DrawerProps, placementType } from './interfaces';

const DrawerContext = React.createContext<Drawer | null>(null);

const defaultPushState: PushState = { distance: 180 };
class Drawer extends React.Component<DrawerProps & ConfigConsumerProps, IDrawerState> {
  public static defaultProps: any = {
    height: 256,
    closable: true,
    placement: 'right' as placementType,
    maskClosable: true,
    mask: true,
    keyboard: true,
    push: defaultPushState,
    level: null,
    loading: false,
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
    // placement === 'top' || placement === 'bottom' || other
    return `translateY(${placement === 'top' ? distance : -distance}px)`;
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
    } as React.CSSProperties;
  };

  private renderHeader() {
    const { title, prefixCls, closable, headerStyle, onPrev, onNext } = this.props;
    if (!title && !closable) {
      return null;
    }

    const headerClassName = title ? `${prefixCls}-header` : `${prefixCls}-header-no-title`;
    return (
      <div className={headerClassName} style={headerStyle}>
        {title && <div className={`${prefixCls}-title`}>{title}</div>}
        {(!(isUndefined(onPrev) && isUndefined(onNext)) || closable) && (
          <div className={`${prefixCls}-header-btns`}>
            {!(isUndefined(onPrev) && isUndefined(onNext)) && this.renderPrevNext()}
            {closable && this.renderCloseIcon()}
          </div>
        )}
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

  private renderPrevNext() {
    const { onPrev, onNext, prefixCls, prevDisabled, nextDisabled } = this.props;
    return (
      <div className={`${prefixCls}-prev-next`}>
        {onPrev && (
          <IconButton type="secondary" size="small" onClick={onPrev} disabled={prevDisabled}>
            <LeftOutlined />
          </IconButton>
        )}
        {onNext && (
          <IconButton type="secondary" size="small" onClick={onNext} disabled={nextDisabled}>
            <RightOutlined />
          </IconButton>
        )}
      </div>
    );
  }

  private renderCloseIcon() {
    const { closable, closeIcon = <CloseOutlined />, prefixCls, onClose } = this.props;
    return (
      closable && (
        // eslint-disable-next-line react/button-has-type
        <IconButton
          onClick={onClose}
          aria-label="Close"
          className={`${prefixCls}-close`}
          type="text"
          style={
            {
              '--scroll-bar': `${getScrollBarSize()}px`,
            } as any
          }
        >
          {closeIcon}
        </IconButton>
      )
    );
  }

  // render drawer body dom
  private renderBody = () => {
    const { children, bodyStyle, drawerStyle, prefixCls, visible, loading } = this.props;
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
      <Skeleton loading={loading} style={{ padding: 24 }}>
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
      </Skeleton>
    );
  };

  // render Provider for Multi-level drawer
  private renderProvider = (value: Drawer) => {
    this.parentDrawer = value;

    return (
      <ConfigConsumer>
        {({ getPopupContainer }) => {
          const { prefixCls, placement, className, mask, direction, visible, ...rest } = this.props;

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

export const WCC = withConfigConsumer<DrawerProps>({
  subPrefixCls: 'drawer',
})(Drawer);

export default WCC;
