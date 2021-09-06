import * as React from 'react';

export const tupleNum = <T extends number[]>(...args: T) => args;
const TITLE_ELE_LIST = tupleNum(1, 2, 3, 4, 5);

export interface TitleProps {
  children: string;
  level: any;
}

const Title: React.FC<TitleProps> = ({ level = 1, ...restProps }: TitleProps) => {
  let Component: any;
  if (TITLE_ELE_LIST.indexOf(level) !== -1) {
    Component = `h${level}`;
  } else {
    Component = 'h1';
  }

  return <Component {...restProps} />;
};

export default Title;
