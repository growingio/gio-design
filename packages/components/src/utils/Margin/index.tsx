import * as React from 'react';

interface P {
  top?: number | string;
  bottom?: number | string;
  right?: number | string;
  left?: number | string;
  visible?: boolean;
  classname?: string;
}

const Margin: React.FC<P> = ({
  top = 0,
  bottom = 0,
  right = 'auto',
  left = 'auto',
  visible = true,
  classname = '',
  children,
}) => (
  <div
    style={{
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
      marginTop: top,
      display: visible ? undefined : 'none',
    }}
    className={classname}
  >
    {children}
  </div>
);

// const Margin =  pure(Margin);
export default Margin;
