import { LeftDoubleOutlined, LeftOutlined, RightDoubleOutlined, RightOutlined } from '@gio-design/icons';
import React, { useContext } from 'react';
import { Button } from '../index';
import { PaginationItemProps, PaginationItemType } from './interface';
import { PaginationContext } from './Pagination';

const PaginationItem: React.FC<PaginationItemProps> = (props) => {
  // prettier-ignore
  const {
    'aria-current': ariaCurrent,
    'aria-label': ariaLabel,
    disabled,
    onClick,
    page,
    type,
    active
  } = props;

  const { prefixCls } = useContext(PaginationContext);

  const icon = {
    [PaginationItemType.First]: <LeftDoubleOutlined />,
    [PaginationItemType.Previous]: <LeftOutlined />,
    [PaginationItemType.Next]: <RightOutlined />,
    [PaginationItemType.Last]: <RightDoubleOutlined />,
  };

  const isPage = type === PaginationItemType.Page;

  return (
    <Button.IconButton
      disabled={disabled}
      type="secondary"
      size="small"
      active={active}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      style={{
        width: isPage ? 'auto' : undefined,
      }}
      data-testid={`pagination-item__${isPage ? page : type}`}
    >
      {isPage ? <span className={`${prefixCls}__page__button-text`}>{page}</span> : icon[type]}
    </Button.IconButton>
  );
};

export default PaginationItem;
