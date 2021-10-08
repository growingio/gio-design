import React, { useLayoutEffect, useRef, createContext, useEffect, useContext } from 'react';
import classNames from 'classnames';
import { useWindowSize, useSetState } from 'react-use';
import { usePrefixCls } from '@gio-design/utils';
import { LayoutProps, LayoutState, ContentState, LayoutContextType } from './interfaces';
import Header from './header';
import Content from './content';
import Sider from './sider';
import useSiders from './useSiders';

const initLayoutState = { wide: false, fixed: false };
const initContentState = { maxWidth: 0, margin: 0 };

export const LayoutContext = createContext<LayoutContextType>({
  layoutState: initLayoutState,
  contentState: initContentState,
} as LayoutContextType);

const Layout = ({ prefixCls: customizePrefixCls, fixed, className, style, children }: LayoutProps) => {
  const { width } = useWindowSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const prefixCls = usePrefixCls('layout', customizePrefixCls);
  const [localLayoutState, setLayoutState] = useSetState<LayoutState>(initLayoutState);
  const [localContentState, setContentState] = useSetState<ContentState>(initContentState);
  const [siders, sidersWidth, removeSider, updateSiders, margin] = useSiders();
  const { layoutState: parentLayoutState } = useContext(LayoutContext);

  useLayoutEffect(() => {
    const layoutWidth = containerRef.current?.getBoundingClientRect().width ?? 0;
    setLayoutState(() => ({
      wide:
        localContentState.maxWidth !== 0 &&
        layoutWidth > localContentState.maxWidth + 2 * localContentState.margin + sidersWidth,
    }));
  }, [width, setLayoutState, localContentState, siders, sidersWidth]);

  useEffect(() => {
    setLayoutState({ fixed });
  }, [fixed, setLayoutState]);

  const mergedStyle = {
    ...{ marginLeft: margin[0], marginRight: margin[1] },
    ...(parentLayoutState.fixed ? { height: 'calc(100% - 60px)' } : {}),
    ...style,
  };

  return (
    <LayoutContext.Provider
      value={{
        contentState: localContentState,
        layoutState: localLayoutState,
        setLayoutState,
        setContentState,
        removeSider,
        updateSiders,
      }}
    >
      <section
        ref={containerRef}
        className={classNames(prefixCls, className, {
          [`${prefixCls}-has-sider`]: siders.length > 0,
          [`${prefixCls}-fixed`]: fixed,
        })}
        style={mergedStyle}
      >
        {children}
      </section>
    </LayoutContext.Provider>
  );
};

Layout.Header = Header;
Layout.Content = Content;
Layout.Sider = Sider;

export default Layout;
