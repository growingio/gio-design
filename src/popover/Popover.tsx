import React, { useState, useMemo, useCallback, useRef, useLayoutEffect, useContext } from 'react';
import classNames from 'classnames';
import { debounce, isFunction, isNil, omit } from 'lodash';
import ReactDOM from 'react-dom';
import ResizeObserver from 'rc-resize-observer';
import { usePrefixCls } from '@gio-design/utils';
import { PopoverProps } from './interface';
import { composeRef, supportRef } from '../utils/composeRef';
import useControlledState from '../utils/hooks/useControlledState';
import usePop from './usePop';
import TriggerContext from './context';

const Popover = (props: PopoverProps) => {
  const {
    placement = 'top',
    content,
    trigger = 'hover',
    prefixCls: customPrefixCls,
    visible: enterVisible,
    onVisibleChange,
    defaultVisible = false,
    allowArrow = false,
    disabled,
    enterable = true,
    overlayClassName,
    overlayInnerStyle,
    overlayInnerClassName,
    overlayStyle,
    children,
    strategy = 'fixed',
    offset = allowArrow ? [0, -2] : [0, 4],
    triggerClassName,
    triggerStyle,
    getContainer,
    distoryOnHide = true,
    onContentClick,
    delay = 100,
    hideDelay = delay,
    ...rest
  } = props;

  const prefixCls = usePrefixCls('popover', customPrefixCls);
  const [visible, setVisible] = useControlledState(enterVisible, defaultVisible);
  const [referenceElement, setReferenceELement] = useState<null | HTMLElement>(null);
  const [popperElement, setPopperElement] = useState<null | HTMLElement>(null);
  const arrowElement = useRef<HTMLDivElement | null>(null);
  const context = useContext(TriggerContext);
  const hasPopupMouseDown = useRef<boolean>(false);
  const mouseDownTimeout = useRef<any>(undefined);
  const mouseLeaveTimeout = useRef<any>(undefined);
  const mouseIsNotLeave = useRef<any>(false);

  const contentCls = useMemo(
    () =>
      classNames(
        `${prefixCls}__content`,
        {
          [`${prefixCls}__content-display`]: visible,
          [`${prefixCls}__content-arrow-allowed`]: allowArrow,
        },
        overlayClassName
      ),
    [prefixCls, overlayClassName, visible, allowArrow]
  );

  const triggerChildEvent = useCallback(
    (name: string, e: any) => {
      if (supportRef(children)) {
        const fireEvent = (children as React.ReactElement)?.props?.[name];
        fireEvent?.(e);
      }
    },
    [children]
  );

  const contentInnerCls = useMemo(
    () => classNames(overlayInnerClassName, `${prefixCls}__content-inner`),
    [prefixCls, overlayInnerClassName]
  );

  const defaultModifiers = React.useMemo(
    () => [
      { name: 'arrow', options: { element: arrowElement.current } },
      { name: 'offset', options: { offset } },
      {
        name: 'flip',
        options: {
          allowedAutoPlacements: ['left-end', 'left-start', 'left'],
          flipVariations: false,
        },
      },
      {
        name: 'preventOverflow',
        options: {
          boundary: 'window',
        },
      },
    ],
    [offset]
  );

  const { styles, attributes, ...popperProps } = usePop({
    referenceElement,
    popperElement,
    placement,
    modifiers: defaultModifiers,
    strategy,
  });
  const { update } = popperProps;
  const updateVisible = useCallback(
    (resetVisible: boolean) => {
      const realVisible = disabled ? false : resetVisible;
      if (enterable) {
        setVisible(realVisible);
        onVisibleChange?.(realVisible);
        if (realVisible) {
          setTimeout(() => {
            update?.();
          }, 0);
        }
      }
    },
    [disabled, enterable, setVisible, onVisibleChange, update]
  );

  // ============ nest popover on Document click close ============
  const onPopupMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    hasPopupMouseDown.current = true;

    clearTimeout(mouseDownTimeout.current);
    mouseDownTimeout.current = window.setTimeout(() => {
      hasPopupMouseDown.current = false;
    }, 0);

    if (context) {
      context?.onPopupMouseDown(event);
    }
  };

  const triggerContextValue = { onPopupMouseDown };

  const onDocumentClick = useCallback(
    (event: MouseEvent) => {
      const { target } = event;
      if (isFunction(referenceElement?.contains) && isFunction(popperElement?.contains)) {
        if (
          !referenceElement?.contains(target as Node) &&
          !popperElement?.contains(target as Node) &&
          !hasPopupMouseDown.current
        ) {
          updateVisible(false);
        }
      }
    },
    [popperElement, referenceElement, updateVisible]
  );

  useLayoutEffect(() => {
    document.addEventListener('mousedown', onDocumentClick);
    return () => {
      document.removeEventListener('mousedown', onDocumentClick);
    };
  }, [onDocumentClick]);

  // ============ end ============
  const isClickToShow = useMemo(() => trigger.indexOf('click') !== -1, [trigger]);

  const isHoverToShow = useMemo(() => trigger.indexOf('hover') !== -1, [trigger]);

  const isFocusToShow = useMemo(() => trigger.indexOf('focus') !== -1, [trigger]);

  const onMouseEnter = useMemo(
    () => (e: Event) => {
      mouseIsNotLeave.current = true;
      clearTimeout(mouseLeaveTimeout.current);
      debounce(() => {
        if (mouseIsNotLeave.current) {
          triggerChildEvent('onMouseEnter', e);
          isHoverToShow && updateVisible(true);
        }
      }, delay)();
    },
    [delay, triggerChildEvent, isHoverToShow, updateVisible]
  );
  const onMouseLeave = useMemo(
    () => (e: Event) => {
      triggerChildEvent('onMouseLeave', e);
      clearTimeout(mouseLeaveTimeout.current);
      mouseLeaveTimeout.current = setTimeout(() => {
        mouseIsNotLeave.current = false;
        isHoverToShow && updateVisible(false);
      }, hideDelay);
    },
    [triggerChildEvent, isHoverToShow, updateVisible, hideDelay]
  );

  const onClick = useCallback(
    (e: Event) => {
      triggerChildEvent('onClick', e);
      if (!isHoverToShow && !isFocusToShow) {
        isClickToShow && updateVisible(!visible);
      }
    },
    [triggerChildEvent, isHoverToShow, isFocusToShow, isClickToShow, updateVisible, visible]
  );
  const onFocus = useCallback(
    (e: Event) => {
      triggerChildEvent('onFocus', e);
      isFocusToShow && updateVisible(true);
    },
    [triggerChildEvent, isFocusToShow, updateVisible]
  );
  const onBlur = useCallback(
    (e: Event) => {
      triggerChildEvent('onBlur', e);
      isFocusToShow && updateVisible(false);
    },
    [triggerChildEvent, isFocusToShow, updateVisible]
  );
  const onContentMouseEnter = () => clearTimeout(mouseLeaveTimeout.current);

  const onContentMouseLeave = useMemo(
    () =>
      debounce(() => {
        if (trigger === 'hover') {
          updateVisible(false);
        }
      }, hideDelay),
    [hideDelay, trigger, updateVisible]
  );

  const divRoles = useMemo(() => {
    const roles: any = {};
    if (isClickToShow) {
      roles.onClick = onClick;
    }
    if (isFocusToShow) {
      roles.onFocus = onFocus;
      roles.onBlur = onBlur;
    }
    if (isHoverToShow) {
      roles.onMouseEnter = onMouseEnter;
      roles.onMouseLeave = onMouseLeave;
    }
    return roles;
  }, [isClickToShow, isFocusToShow, isHoverToShow, onClick, onFocus, onBlur, onMouseEnter, onMouseLeave]);
  const contentRender = content && (
    <div
      {...attributes.popper}
      className={contentCls}
      ref={(instance) => setPopperElement(instance)}
      style={{ ...(overlayStyle || {}), ...styles.popper }}
      onMouseEnter={onContentMouseEnter}
      onMouseLeave={onContentMouseLeave}
      onMouseDownCapture={(e) => onPopupMouseDown(e)}
      onClick={onContentClick}
      role="none"
      {...omit(rest, 'arrowPointAtCenter')}
    >
      {allowArrow && <div className={`${prefixCls}__arrow`} ref={arrowElement} style={{ ...styles.arrow }} />}
      <div className={contentInnerCls} style={overlayInnerStyle}>
        {content}
      </div>
    </div>
  );

  // =============== refs =====================
  let triggerNode = (
    <div
      className={classNames(`${prefixCls}__popcorn`, triggerClassName)}
      style={triggerStyle}
      ref={(instance) => setReferenceELement(instance)}
      {...divRoles}
    >
      {children}
    </div>
  );
  if (supportRef(children)) {
    const cloneProps = {
      ...divRoles,
      className: classNames((children as React.ReactElement)?.props?.className, triggerClassName),
      style: { ...(children as React.ReactElement)?.props?.style, ...triggerStyle },
    };

    const child = React.Children.only(children);
    cloneProps.ref = composeRef(setReferenceELement, (child as any).ref);
    triggerNode = React.cloneElement(child as React.ReactElement, cloneProps);
  }

  const container = useMemo(() => {
    if (isFunction(getContainer) && !isNil(referenceElement)) {
      return getContainer(referenceElement);
    }
    return document.body;
  }, [referenceElement, getContainer]);
  const renderContent = (
    <>
      <ResizeObserver
        disabled={!visible}
        onResize={() => {
          update?.();
        }}
      >
        {ReactDOM.createPortal(contentRender, container)}
      </ResizeObserver>
    </>
  );
  return (
    <>
      <TriggerContext.Provider value={triggerContextValue}>
        {triggerNode}
        {distoryOnHide ? visible && renderContent : renderContent}
      </TriggerContext.Provider>
    </>
  );
};

export default Popover;
