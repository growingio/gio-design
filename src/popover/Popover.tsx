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
  } = props;

  const prefixCls = usePrefixCls('popover-new', customPrefixCls);
  const [visible, setVisible] = useState(defaultVisible);
  const overContentRef = useRef<boolean>(false);

  const referenceElement = useRef();
  const popperElement = useRef();
  const arrowElement = useRef();

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
      if (overContentRef.current && enterable) {
      } else {
        setVisible(realVisible);
        onVisibleChange?.(resetVisible);
      }
    },
    [onVisibleChange, enterVisible, enterable]
  );

  const onMouseEnter = useMemo(
    () => debounce(() => trigger === 'hover' && updateVisible(true), 100),
    [trigger, updateVisible]
  );
  const onMouseLeave = useMemo(
    () => debounce(() => trigger === 'hover' && updateVisible(false), 100),
    [trigger, updateVisible]
  );

  const onClick = useCallback(() => trigger === 'click' && updateVisible(!visible), [trigger, visible, updateVisible]);
  const onFocus = useCallback(() => trigger === 'focus' && updateVisible(true), [trigger, updateVisible]);
  const onBlur = useCallback(() => trigger === 'focus' && updateVisible(false), [trigger, updateVisible]);

  const onContentMouseEnter = useCallback((e) => (overContentRef.current = true), [enterable]);
  const onContentMouseLeave = useMemo(
    () =>
      debounce(() => {
        overContentRef.current = false;
        if (trigger === 'hover') {
          updateVisible(false);
        }
      }, 100),
    [enterable, trigger]
  );

  useEffect(() => {
    if (!isUndefined(enterVisible)) {
      setVisible(enterVisible);
    }
  }, [enterVisible]);

  return (
    <>
      <div
        className={`${prefixCls}__popcorn`}
        ref={referenceElement}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onClick={onClick}
      >
        {props.children}
      </div>
      <div
        className={contentCls}
        ref={popperElement}
        {...attributes.popper}
        style={{ ...styles.popper }}
        onMouseEnter={onContentMouseEnter}
        onMouseLeave={onContentMouseLeave}
      >
        {allowArrow && <div className={`${prefixCls}__arrow`} ref={arrowElement} style={{ ...styles.arrow }} />}
        <div className={`${prefixCls}__content-inner`}>{content}</div>
      </div>
    </>
  );
};

export default Popover;
