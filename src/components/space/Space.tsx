import React,{ useMemo } from 'react';
import classnames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import Item from './Item';
import { SpaceProps, SpaceSize } from './interface';
import './style'

export const SpaceContext = React.createContext({
    horizontalSize: 0,
    verticalSize: 0,
    latestIndex: 0,
});

const Space : React.FC<SpaceProps> = props => {
    const {
        size = 8,
        className,
        children,
        direction = 'horizontal',
        prefixCls: customizePrefixCls,
        split,
        style,
        autoWrap = false,
        align = 'center',
    } = props;
    const prefixCls = usePrefixCls('space', customizePrefixCls);
    const [horizontalSize, verticalSize] = useMemo(() => ((Array.isArray(size) ? size : [size, size]) as [SpaceSize, SpaceSize]),[size]);

    const childNodes = toArray(children, { keepEmpty: true });

    if(childNodes.length === 0) {
        return null;
    }

    const itemCls = `${prefixCls}-item`;
    const cls = classnames(
        prefixCls,
        `${prefixCls}-${direction}`,
        `${prefixCls}-align-${align}`,
        className,
    );

    let latestIndex = 0;
    const nodes = childNodes.map((child, index) => {
        if(child !== null && child !== undefined) {
            latestIndex = index;
        }

        return (
          <Item
            className={itemCls}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
            direction={direction}
            split={split}
            autoWrap={autoWrap}
          >
            {child}
          </Item>
        )
    })

    return (
      <div
        className={cls}
        style={{
                ...(autoWrap && { flexWrap: 'wrap', marginBottom: -verticalSize }),
                ...style
            }}
      >
        <SpaceContext.Provider value={{ horizontalSize, verticalSize, latestIndex }}>
          {nodes}
        </SpaceContext.Provider>
      </div>
    )
}

export default Space;