import React, { useRef, createContext, useEffect, useContext, useState } from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '@gio-design/utils';
import { LayoutProps, LayoutState, ContentState, LayoutContextType } from './interfaces';
import Header from './Header';
import Content from './Content';
import Sider from './Sider';
import useSiders from './useSiders';

const initLayoutState = { fixed: false };
const initContentState = { maxWidth: 0, margin: 0 };

export const LayoutContext = createContext<LayoutContextType>({
  layoutState: initLayoutState,
  contentState: initContentState,
} as LayoutContextType);

const Layout = ({ prefixCls: customizePrefixCls, fixed, className, style, children }: LayoutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefixCls = usePrefixCls('layout', customizePrefixCls);
  const [localLayoutState, setLayoutState] = useState<LayoutState>(initLayoutState);
  const [localContentState, setContentState] = useState<ContentState>(initContentState);
  const [siders, removeSider, updateSiders, margin] = useSiders();
  const { layoutState: parentLayoutState } = useContext(LayoutContext);

  useEffect(() => {
    setLayoutState({ fixed } as any);
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
        setLayoutState: setLayoutState as any,
        setContentState: setContentState as any,
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
