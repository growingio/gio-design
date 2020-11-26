import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { Props as MenuItemProps, NodeData } from './menu-item';
import { toInt, useDynamicData, dataKeyMapping, withPrefix } from './helper';
import SingleMenu, { Props as SingleMenuProps } from './single-menu';

export type Props = SingleMenuProps;

const InnerMenu: React.FC<SingleMenuProps> = (props) => {
  const {
    className,
    style = {},
    dataSource: originDataSource = [],
    keyMapping: originKeyMapping,
    open,
    depth = 0,
    parentsData = [],
    onTrigger: userOnTrigger,
    onSelect: userOnSelect,
    offsetLeft: userOffsetLeft = 5,
    offsetTop: userOffsetTop = 0,
  } = props;
  const keyMapping = { label: 'label', value: 'value', ...originKeyMapping };
  const [dataSource, setDataSource] = useDynamicData(originDataSource);
  const wrapRef = useRef<HTMLDivElement>((null as unknown) as HTMLDivElement);
  const withWrapperCls = withPrefix('cascader-menu');
  const [canOpen, setCanOpen] = useState(open);
  const [triggerData, setTriggerData] = useState<NodeData>();
  const [offset, setOffset] = useState([0, 0]);

  const onTrigger = (event: React.MouseEvent | React.KeyboardEvent, nodeData: NodeData) => {
    const menu = event.currentTarget.closest('.cascader-menu');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { width, paddingLeft, paddingTop } = getComputedStyle(menu!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { scrollTop, scrollLeft } = menu!.querySelector('.cascader-menu-body')!;
    const { offsetLeft = 0, offsetTop = 0 } = (event.currentTarget || {}) as HTMLElement;
    setOffset([toInt(width) + offsetLeft - toInt(paddingLeft) - scrollLeft, offsetTop - toInt(paddingTop) - scrollTop]);
    setTriggerData(nodeData);
    userOnTrigger?.(event, nodeData);
    setCanOpen(!isEmpty(nodeData.children));

    const nextData = dataSource.map((d) => {
      if (d.value === dataKeyMapping(nodeData, keyMapping).value) {
        return nodeData;
      }
      return d;
    });
    setDataSource(nextData);
  };
  const onSelect: MenuItemProps['onSelect'] = (nodeData, parents) => {
    userOnSelect?.(nodeData, parents);
    setCanOpen(false);
  };

  let childMenu;
  if (canOpen && triggerData && !isEmpty(triggerData.children)) {
    const [offsetLeft, offestTop] = offset;
    const { top: inheritTop = 0, left: inheritLeft = 0 } = style;
    const nextDepth = depth + 1;
    const [top, left] = [
      userOffsetTop + offestTop + toInt(inheritTop),
      userOffsetLeft + offsetLeft + toInt(inheritLeft),
    ];

    childMenu = (
      <InnerMenu
        {...props}
        parentMenu={wrapRef.current}
        key={[nextDepth, triggerData[keyMapping.value]].join('-')}
        depth={nextDepth}
        dataSource={triggerData.children}
        parentsData={[triggerData, ...parentsData]}
        style={{
          ...style,
          top,
          left,
        }}
      />
    );
  }

  return (
    <>
      <SingleMenu
        {...props}
        onTrigger={onTrigger}
        onSelect={onSelect}
        className={classNames(className, withWrapperCls())}
        ref={wrapRef}
      />
      {childMenu}
    </>
  );
};

const Menu = React.forwardRef<HTMLDivElement, SingleMenuProps>((props, ref) => {
  const { className, style } = props;

  // @TODO useKeyboardNav
  return (
    <div ref={ref} className={classNames('cascader-menu-outer', className)} style={style}>
      <InnerMenu {...props} />
    </div>
  );
});

export default React.memo(Menu);
