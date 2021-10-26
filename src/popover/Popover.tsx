import React, { useState, useCallback } from 'react';
import { usePopper } from 'react-popper';
import usePrefixCls from '../utils/hooks/use-prefix-cls';

import './style';

const placements = {
  topLeft: 'top-start',
  top: 'top',
  topRight: 'top-end',
  leftTop: 'left-start',
  left: 'left',
  leftBottom: 'left-end',
  rightTop: 'right-start',
  right: 'right',
  rightBottom: 'right-end',
  bottomLeft: 'bottom-start',
  bottom: 'bottom',
  bottomRight: 'bottom-end',
} as any;

const Popover = (props: any) => {
  const { placement } = props;

  const prefixCls = usePrefixCls('popover-new');
  const [visible, setVisible] = useState(false);

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placements[placement],
    modifiers: [
      { name: 'arrow', options: { padding: 0, element: arrowElement } },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  console.log(placements[placement]);

  const onMouseOver = useCallback(() => setVisible(true), []);
  const onMouseOut = useCallback(() => setVisible(false), []);
  const onClick = useCallback(() => setVisible(!visible), [visible]);

  console.log(styles);

  const visibility = visible ? 'unset' : 'hidden';

  return (
    <>
      <div
        className={`${prefixCls}__popcorn`}
        ref={setReferenceElement}
        // onMouseOver={onMouseOver}
        // onMouseOut={onMouseOut}
        onClick={onClick}
      >
        {props.children}
      </div>
      <div
        className={`${prefixCls}__content`}
        ref={setPopperElement}
        {...attributes.popper}
        style={{ ...styles.popper, visibility }}
      >
        Popper element
        <div className={`${prefixCls}__arrow`} ref={setArrowElement} style={{ ...styles.arrow, visibility }} />
      </div>
    </>
  );
};

export default Popover;
