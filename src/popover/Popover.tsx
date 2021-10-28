import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { debounce, isUndefined } from 'lodash';
import { usePopper } from 'react-popper';
import { PopoverProps, placements } from './interface';
import usePrefixCls from '../utils/hooks/use-prefix-cls';

import './style';

const Popover = (props: PopoverProps) => {
  const {
    placement = 'top',
    content,
    trigger = 'hover',
    prefixCls: customPrefixCls,
    visible: enterVisible,
    onVisibleChange,
    defaultVisible,
    allowArrow = true,
    enterable = true,
    children,
  } = props;

  const prefixCls = usePrefixCls('popover-new', customPrefixCls);
  const [visible, setVisible] = useState(defaultVisible);
  const overContentRef = useRef<boolean>(false);

  const referenceElement = useRef<HTMLDivElement | null>(null);
  const popperElement = useRef<HTMLDivElement | null>(null);
  const arrowElement = useRef<HTMLDivElement | null>(null);

  const contentCls = useMemo(
    () =>
      classNames(`${prefixCls}__content`, {
        [`${prefixCls}__content-display`]: visible,
        [`${prefixCls}__content-arrow-allowed`]: allowArrow,
        [`${prefixCls}__content-arrow-rejected`]: !allowArrow,
      }),
    [prefixCls, visible, allowArrow]
  );

  const { styles, attributes } = usePopper(referenceElement.current, popperElement.current, {
    placement: placements[placement],
    modifiers: [{ name: 'arrow', options: { element: arrowElement.current } }],
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

  const isClickToShow = useMemo(() => trigger.indexOf('click') !== -1, [trigger]);

  const isHoverToShow = useMemo(() => trigger.indexOf('hover') !== -1, [trigger]);

  const isFocusToShow = useMemo(() => trigger.indexOf('focus') !== -1, [trigger]);

  const onMouseEnter = useMemo(
    () => debounce(() => isHoverToShow && updateVisible(true), 100),
    [isHoverToShow, updateVisible]
  );
  const onMouseLeave = useMemo(
    () => debounce(() => isHoverToShow && updateVisible(false), 100),
    [isHoverToShow, updateVisible]
  );

  const onClick = useCallback(() => {
    if (!isHoverToShow && !isFocusToShow) {
      isClickToShow && updateVisible(!visible);
    }
  }, [isClickToShow, isHoverToShow, isFocusToShow, visible, updateVisible]);
  const onFocus = useCallback(() => {
    isFocusToShow && updateVisible(true);
  }, [isFocusToShow, updateVisible]);
  const onBlur = useCallback(() => {
    isFocusToShow && updateVisible(false);
  }, [isFocusToShow, updateVisible]);

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

  useEffect(() => {
    if (!isUndefined(enterVisible)) {
      setVisible(enterVisible);
    }
  }, [enterVisible]);

  return (
    <>
      <div className={`${prefixCls}__popcorn`} ref={referenceElement} {...divRoles}>
        {children}
      </div>
      {content && (
        <div
          {...attributes.popper}
          className={contentCls}
          ref={popperElement}
          style={{ ...styles.popper }}
          onMouseEnter={onContentMouseEnter}
          onMouseLeave={onContentMouseLeave}
        >
          {allowArrow && <div className={`${prefixCls}__arrow`} ref={arrowElement} style={{ ...styles.arrow }} />}
          <div className={`${prefixCls}__content-inner`}>{content}</div>
        </div>
      )}
    </>
  );
};

export default Popover;
