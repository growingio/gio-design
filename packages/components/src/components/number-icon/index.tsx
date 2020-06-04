import React from 'react';
import classnames from 'classnames';
import './style/index.less';

interface NumberIconProps {
  color?: string;
  backgroundColor?: string;
  number: number;
  className?: string;
}

const colors = ['#FFBF1B', '#FF8F33', '#23A57E', '#0090FF', '#5C6BB5', '#C9C19D', '#4D91B2', '#8C2121'];

const NumberIcon: React.FC<NumberIconProps> = ({
  className,
  number,
  backgroundColor = colors[number - 1],
  color = '#fff',
}) => (
  <div className={classnames('gio-number-icon', className)} style={{ backgroundColor, color }}>
    {number}
  </div>
);

export default NumberIcon;
