import * as React from 'react';
import { DefaultSizeType } from './interfaces';

export type SizeType = DefaultSizeType | string | undefined;

export const SizeContext = React.createContext<SizeType>(undefined);

export interface SizeContextProps {
  size?: SizeType;
}

export const SizeContextProvider: React.FC<SizeContextProps> = ({ children, size }) => (
  <SizeContext.Consumer>
    {(originSize) => <SizeContext.Provider value={size || originSize}>{children}</SizeContext.Provider>}
  </SizeContext.Consumer>
);

export default SizeContext;
