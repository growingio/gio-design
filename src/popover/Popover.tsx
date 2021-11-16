import React, { useState, useMemo, useCallback, useEffect, useRef, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { debounce, isUndefined } from 'lodash';
import { usePopper } from 'react-popper';
import ReactDOM from 'react-dom';
import { PopoverProps, placements } from './interface';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import { composeRef, supportRef } from '../utils/composeRef';

const Popover = (props: PopoverProps) => {
  const {
    placement = 'top',
    content,
    trigger = 'hover',
    prefixCls: customPrefixCls,
    visible: enterVisible,
    onVisibleChange,
    defaultVisible,
    allowArrow = false,
    enterable = true,
    overlayClassName,
    overlayInnerStyle,
    overlayInnerClassName,
    overlayStyle,
    children,
    strategy = 'absolute',
    getContainer,
  } = props;

  const prefixCls = usePrefixCls('popover-new', customPrefixCls);
  const [visible, setVisible] = useState(defaultVisible);
  const overContentRef = useRef<boolean>(false);
  const referenceElement = useRef<HTMLDivElement | null>(null);
  const popperElement = useRef<HTMLDivElement | null>(null);
  const arrowElement = useRef<HTMLDivElement | null>(null);

  const contentCls = useMemo(
    () =>
      classNames(
        `${prefixCls}__content`,
        {
          [`${prefixCls}__content-display`]: visible,
          [`${prefixCls}__content-arrow-allowed`]: allowArrow,
          [`${prefixCls}__content-arrow-rejected`]: !allowArrow,
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

  const { styles, attributes } = usePopper(referenceElement.current, popperElement.current, {
    placement: placements[placement],
    modifiers: [{ name: 'arrow', options: { element: arrowElement.current } }],
    strategy,
  });

  const updateVisible = useCallback(
    (resetVisible: boolean) => {
      const realVisible = isUndefined(enterVisible) ? resetVisible : enterVisible;
      if (!(overContentRef.current && enterable)) {
        setVisible(realVisible);
        onVisibleChange?.(resetVisible);
      }
    },
    [onVisibleChange, enterVisible, enterable]
  );
  const onDocumentClick = useCallback(
    (event: MouseEvent) => {
      const { target } = event;
      if (!referenceElement.current?.contains(target as Node) && !popperElement.current?.contains(target as Node)) {
        updateVisible(false);
      }
    },
    [updateVisible]
  );

  useEffect(() => {
    if (!isUndefined(enterVisible)) {
      setVisible(enterVisible);
    }
  }, [enterVisible]);

  useLayoutEffect(() => {
    document.addEventListener('mousedown', onDocumentClick);
    return () => {
      document.removeEventListener('mousedown', onDocumentClick);
    };
  }, [onDocumentClick]);

  const isClickToShow = useMemo(() => trigger.indexOf('click') !== -1, [trigger]);

  const isHoverToShow = useMemo(() => trigger.indexOf('hover') !== -1, [trigger]);

  const isFocusToShow = useMemo(() => trigger.indexOf('focus') !== -1, [trigger]);

  const onMouseEnter = useMemo(
    () =>
      debounce((e: Event) => {
        triggerChildEvent('onMouseEnter', e);
        isHoverToShow && updateVisible(true);
      }, 100),
    [triggerChildEvent, isHoverToShow, updateVisible]
  );
  const onMouseLeave = useMemo(
    () =>
      debounce((e: Event) => {
        triggerChildEvent('onMouseLeave', e);
        isHoverToShow && updateVisible(false);
      }, 100),
    [triggerChildEvent, isHoverToShow, updateVisible]
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

  const onContentMouseEnter = useCallback(() => {
    overContentRef.current = true;
  }, []);

  const onContentMouseLeave = useMemo(
    () =>
      debounce(() => {
        overContentRef.current = false;
        if (trigger === 'hover') {
          updateVisible(false);
        }
      }, 100),
    [trigger, updateVisible]
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
      ref={popperElement}
      style={{ ...(overlayStyle || {}), ...styles.popper }}
      onMouseEnter={onContentMouseEnter}
      onMouseLeave={onContentMouseLeave}
    >
      {allowArrow && <div className={`${prefixCls}__arrow`} ref={arrowElement} style={{ ...styles.arrow }} />}
      <div className={contentInnerCls} style={overlayInnerStyle}>
        {content}
      </div>
    </div>
  );

  // =============== refs =====================
  let triggerNode = (
    <div className={`${prefixCls}__popcorn`} ref={referenceElement} {...divRoles}>
      {children}
    </div>
  );

  if (supportRef(children)) {
    const cloneProps = {
      ...divRoles,
      className: classNames((children as React.ReactElement)?.props?.className, overlayClassName),
      style: { ...(children as React.ReactElement)?.props?.style, ...overlayInnerStyle },
    };

    const child = React.Children.only(children);
    cloneProps.ref = composeRef(referenceElement, (child as any).ref);
    triggerNode = React.cloneElement(child as React.ReactElement, cloneProps);
  }

  return (
    <>
      {triggerNode}
      {typeof getContainer === 'function'
        ? ReactDOM.createPortal(contentRender, getContainer(referenceElement.current as HTMLDivElement))
        : contentRender}
    </>
  );
};

export default Popover;
