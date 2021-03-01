import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import { MenuItemProps, NodeData, MenuProps } from './interface';
import { dataKeyMapping, getParentsByValue, mergeKeyMapping, toInt, useDynamicData, useKeyboardNav } from './helper';
import SingleMenu from './single-menu';
import useMergeRef from '../../utils/hooks/useMergeRef';

export type Props = MenuProps;

const InnerMenu: React.FC<Props> = (props) => {
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
  const keyMapping = mergeKeyMapping(originKeyMapping);
  const [dataSource, setDataSource] = useDynamicData(originDataSource);
  const wrapRef = useRef<HTMLDivElement>((null as unknown) as HTMLDivElement);
  const [canOpen, setCanOpen] = useDynamicData(open);
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
  const onSelect: MenuItemProps['onSelect'] = (nodeData, parents, event) => {
    userOnSelect?.(nodeData, parents, event);
    setCanOpen(false);
  };

  useEffect(() => {
    const wrapper = wrapRef.current;
    const handler = () => {
      setTriggerData(undefined);
    };
    wrapper?.addEventListener('focusin', handler);
    return () => wrapper?.removeEventListener('focusin', handler);
  }, [wrapRef, setTriggerData]);

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
        autoFocus
        open={canOpen}
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
        open={canOpen}
        onTrigger={onTrigger}
        onSelect={onSelect}
        className={className}
        expandedId={triggerData?.[keyMapping.value] as string}
        ref={wrapRef}
      />
      {childMenu}
    </>
  );
};

const Menu = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const {
    className,
    style,
    autoInit = true,
    open,
    onTrigger,
    onSelect,
    dataSource,
    value,
    selectedParents: userSelectedParents,
    keyMapping: originKeyMapping,
    ...others
  } = props;
  const wrapRef = useMergeRef(ref);
  const keyMapping = mergeKeyMapping(originKeyMapping);
  const [canOpen, setCanOpen] = useState(open);
  const [inited, setInited] = useState(false);
  const [selectedParents, setSelectedParents] = useState(userSelectedParents);
  const handleTrigger: typeof onTrigger = (a, b) => {
    setCanOpen(true);
    onTrigger?.(a, b);
  };
  const handleSelect: typeof onSelect = (nodeData, parentsData, event) => {
    onSelect?.(nodeData, parentsData, event);
    setSelectedParents(parentsData);
    setInited(true);
  };

  // @TODO useKeyboardNav
  useKeyboardNav(wrapRef);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!wrapRef.current.contains(e.target as HTMLElement) || wrapRef.current === e.target) {
        setCanOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [wrapRef]);

  useEffect(() => {
    if (autoInit && !inited && value && !isEmpty(dataSource)) {
      const km = { label: keyMapping.label, value: keyMapping.value };
      const nextData = getParentsByValue(km, value, dataSource as NodeData[]) || ([] as NodeData[]);
      setSelectedParents(nextData);
    }
  }, [autoInit, inited, value, dataSource, keyMapping.label, keyMapping.value]);

  return (
    <div ref={wrapRef} className={classNames('cascader-menu-outer', className)} style={style}>
      <InnerMenu
        {...others}
        open={canOpen}
        onSelect={handleSelect}
        onTrigger={handleTrigger}
        dataSource={dataSource}
        value={value}
        keyMapping={keyMapping}
        selectedParents={selectedParents}
      />
    </div>
  );
});

export default React.memo(Menu);
