import React from 'react';
import Icon from '@gio-design/icon';
import classnames from 'classnames';

interface Props {
  type: string;
  title?: string;
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

const style = {
  margin: 0,
};

const noop = () => {};
const IconButton: React.FC<Props> = (props) => {
  const { title, className, onClick, disabled, ...rest } = props;
  return (
    <span
      onClick={(!disabled && onClick) || noop}
      className={classnames('gio-icon-button', className, {
        'gio-icon-button-disabled': disabled,
      })}
      title={title}
    >
      <Icon style={style} {...rest} />
    </span>
  );
};

export default IconButton;
