import React, { useContext } from 'react';
import { SpaceContext } from './Space';
import { ItemProps } from './interface';

const Item = ({
    className,
    index,
    direction,
    children,
    split,
    autoWrap,
} : ItemProps) => {
    const { horizontalSize, verticalSize, latestIndex } = useContext(SpaceContext);

    let style : React.CSSProperties = {};

    if(direction === 'vertical') {
      if(index < latestIndex) {
        style = { marginBottom: horizontalSize / (split ? 2 : 1) };
      }
    }else {
        style = {
            ...(index < latestIndex && { marginRight: horizontalSize / (split ? 2 : 1) }),
            ...(autoWrap && { marginBottom: verticalSize }),
        };
    }

    if(children === null || children === undefined) {
        return null;
    }

    return (
      <>
        <div className={className} style={style}>
          {children}
        </div>
        {
            index < latestIndex && split && (
            <span className={`${className}-split`} style={style}>
              {split}
            </span>
            )
        }
      </>
    )
}

export default Item;