import React, { useState, useMemo, useCallback, useEffect, useRef, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { debounce, isUndefined, isFunction } from 'lodash';
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
    disabled,
    enterable = true,
    overlayClassName,
    overlayInnerStyle,
    overlayInnerClassName,
    overlayStyle,
    children,
    strategy = 'absolute',
    triggerClassName,
    triggerStyle,
    getContainer = () => document.body,
    distoryOnHide = true,
  } = props;

  const prefixCls = usePrefixCls('popover', customPrefixCls);
  const [visible, setVisible] = useState(defaultVisible);
  const overContentRef = useRef<boolean>(false);
  const [referenceElement, setReferenceELement] = useState<null | HTMLElement>(null);
  const [popperElement, setPopperElement] = useState<null | HTMLElement>(null);
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
        const fireEvent = children?.props?.[name];
        fireEvent?.(e);
      }
    },
    [children]
  );

  const contentInnerCls = useMemo(
    () => classNames(overlayInnerClassName, `${prefixCls}__content-inner`),
    [prefixCls, overlayInnerClassName]
  );

  const { styles, attributes, ...popperProps } = usePopper(referenceElement, popperElement, {
    placement: placements[placement],
    modifiers: [{ name: 'arrow', options: { element: arrowElement.current } }],
    strategy,
  });
  const { update } = popperProps;
  const updateVisible = useCallback(
    (resetVisible: boolean) => {
      let realVisible = isUndefined(enterVisible) ? resetVisible : enterVisible;
      realVisible = disabled === true ? false : realVisible;
      if (!(overContentRef.current && enterable)) {
        setVisible(realVisible);
        onVisibleChange?.(resetVisible);
      }
      if (realVisible) {
        update?.();
      }
    },
    [onVisibleChange, enterVisible, enterable, update, disabled]
  );
  const onDocumentClick = useCallback(
    (event: MouseEvent) => {
      const { target } = event;
      if (isFunction(referenceElement?.contains) && isFunction(popperElement?.contains)) {
        if (!referenceElement?.contains(target as Node) && !popperElement?.contains(target as Node)) {
          updateVisible(false);
        }
      }
    },
    [popperElement, referenceElement, updateVisible]
  );
  useEffect(() => {
    if (!isUndefined(enterVisible)) {
      setVisible(enterVisible);
    }
    if (disabled === true) {
      setVisible(false);
    }
  }, [enterVisible, disabled]);

  useLayoutEffect(() => {
    document.addEventListener('mousedown', onDocumentClick);
    return () => {
      document.removeEventListener('mousedown', onDocumentClick);
    };
  }, [onDocumentClick]);

  const isClickToShow = useMemo(() => trigger.indexOf('click') !== -1, [trigger]);

  const isHoverToShow = useMemo(() => trigger.indexOf('hover') !== -1, [trigger]);

  const isFocusToShow = useMemo(() => trigger.indexOf('focus') !== -1, [trigger]);

  const onMouseEnter = useCallback(
    (e: Event) => {
      triggerChildEvent('onMouseEnter', e);
      isHoverToShow && updateVisible(true);
    },
    [isHoverToShow, triggerChildEvent, updateVisible]
  );

  const onMouseLeave = useCallback(
    (e: Event) => {
      triggerChildEvent('onMouseLeave', e);
      isHoverToShow && updateVisible(false);
    },
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

  const contentRender = content && (
    <div
      {...attributes.popper}
      className={contentCls}
      ref={(instance) => setPopperElement(instance)}
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

  const triggerNode = useMemo(() => {
    const child = React.Children.only(children);

    const { props: childProps } = child;

    const handleEvents: {
      onClick?: typeof onClick;
      onFocus?: typeof onFocus;
      onBlur?: typeof onBlur;
      onMouseEnter?: typeof onMouseEnter;
      onMouseLeave?: typeof onMouseLeave;
    } = {};

    if (isClickToShow) {
      handleEvents.onClick = (event) => {
        onClick(event);
        childProps.onClick?.(event);
      };
    }
    if (isFocusToShow) {
      handleEvents.onFocus = (event) => {
        onFocus(event);
        childProps.onFocus?.(event);
      };
      handleEvents.onBlur = (event) => {
        onBlur(event);
        childProps.onBlur?.(event);
      };
    }
    if (isHoverToShow) {
      handleEvents.onMouseEnter = (event) => {
        onMouseEnter(event);
        childProps.onMouseEnter?.(event);
      };
      handleEvents.onMouseLeave = (event) => {
        onMouseLeave(event);
        childProps.onMouseLeave?.(event);
      };
    }

    const cloneProps: Partial<any> & React.Attributes = {
      ...handleEvents,
      className: classNames(childProps.className, triggerClassName, `${prefixCls}__popcorn`),
      style: { ...childProps.style, ...triggerStyle },
    };

    if (supportRef(child)) {
      cloneProps.ref = composeRef(setReferenceELement, (child as any).ref);
      return React.cloneElement(child, cloneProps);
    }

    const referenceNode = document.getElementsByClassName(`${prefixCls}__popcorn`)?.[0] as HTMLElement;
    setReferenceELement(referenceNode);

    return React.cloneElement(child, cloneProps);
  }, [
    children,
    isClickToShow,
    isFocusToShow,
    isHoverToShow,
    onBlur,
    onClick,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    prefixCls,
    triggerClassName,
    triggerStyle,
  ]);

  const renderContent = (
    <>
      {typeof getContainer === 'function'
        ? ReactDOM.createPortal(contentRender, getContainer(referenceElement as HTMLDivElement))
        : contentRender}
    </>
  );

  return (
    <>
      {triggerNode}
      {distoryOnHide ? visible && renderContent : renderContent}
    </>
  );
};

export default Popover;
