import React, { useContext, useMemo, useState, useRef } from 'react';
import classNames from 'classnames';
import { isFunction, isNumber, isNaN, isUndefined } from 'lodash';
import { LeftOutlined, LeftDoubleOutlined, RightOutlined, RightDoubleOutlined, More } from '@gio-design/icons';
import Input from '../input';
import { ConfigContext } from '../config-provider';
import { PaginationProps } from './interface';
import { generatePageArray } from './ until';

const Pagination = ({
  prefixCls: customizePrefixCls,
  defaultCurrent = 1,
  disabled,
  pageSize = 10,
  current,
  className,
  style,
  total = 0,
  showTotal = (total: number) => `总共 ${total.toLocaleString()} 条`,
  onChange,
  showQuickJumper = false,
  hideOnSinglePage = false,
}: PaginationProps) => {
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('pagination', customizePrefixCls);
  const pageNumber = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);
  const [localCurrent, setLocalCurrent] = useState<number>(isNumber(current) ? current : defaultCurrent);
  const [inputValue, setInputValue] = useState<string>('');
  useMemo(() => {
    if (isNumber(current)) {
      setLocalCurrent(current);
    }
  }, [current]);

  const shouldShowQuickJumper = useMemo(() => showQuickJumper && pageNumber > 10, [showQuickJumper, pageNumber]);
  const shouldShowOption = useMemo(() => shouldShowQuickJumper, [shouldShowQuickJumper]);
  const offset = 5;

  const prevSymbol = useRef<symbol>(Symbol('prev'));
  const nextSymbol = useRef<symbol>(Symbol('next'));
  const prevDisabled = localCurrent <= 1;
  const nextDisabled = localCurrent >= pageNumber;

  const pagination = useMemo(
    () =>
      generatePageArray(localCurrent, pageNumber, offset, prevSymbol, nextSymbol).map((page: number | symbol) => {
        if (typeof page === 'number') {
          return (
            <li
              className={classNames(`${prefixCls}-item`, {
                [`${prefixCls}-item-active`]: page === localCurrent,
              })}
              key={page}
              onClick={() => handleClick(page)}
            >
              {page}
            </li>
          );
        }
        if (Object.is(page, prevSymbol.current)) {
          return (
            <li
              key="prev"
              className={classNames(`${prefixCls}-jump-prev`)}
              onClick={() => handleClick(localCurrent - offset)}
            >
              <More className="more" />
              <LeftDoubleOutlined className="double" color="#0044F2" />
            </li>
          );
        }
        if (Object.is(page, nextSymbol.current)) {
          return (
            <li
              key="next"
              className={classNames(`${prefixCls}-jump-next`)}
              onClick={() => handleClick(localCurrent + offset)}
            >
              <More className="more" />
              <RightDoubleOutlined className="double" color="#0044F2" />
            </li>
          );
        }
        return null;
      }),
    [localCurrent, pageNumber]
  );

  const handleClick = (toPage: number) => {
    if (isNumber(toPage) && !Object.is(toPage, localCurrent) && !disabled) {
      let _toPage = toPage;
      if (_toPage < 1) {
        _toPage = 1;
      } else if (toPage > pageNumber) {
        _toPage = pageNumber;
      }
      if (isUndefined(current)) {
        setLocalCurrent(_toPage);
      }
      onChange?.(_toPage, pageSize);
    }
  };

  const totalText = useMemo(() => {
    if (!isFunction(showTotal)) {
      return null;
    }
    return (
      <li className={`${prefixCls}-total-text`}>
        {showTotal(total, [
          total === 0 ? 0 : (localCurrent - 1) * pageSize + 1,
          localCurrent * pageSize > total ? total : localCurrent * pageSize,
        ])}
      </li>
    );
  }, [total, showTotal, localCurrent, pageSize]);

  const handleInputPressEnter = (e: any) => {
    const transformValue = Number(e.target.value);
    if (!isNaN(transformValue)) {
      if (transformValue >= 1 && transformValue <= pageNumber) {
        setLocalCurrent(transformValue);
        onChange?.(transformValue, pageSize);
      }
    }
    setInputValue('');
  };

  const renderInput = () => (
    <div className={`${prefixCls}-options-quick-jumper`}>
      跳至
      <Input
        style={{ display: 'inline-block' }}
        value={inputValue}
        disabled={disabled}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={handleInputPressEnter}
      />
      页
    </div>
  );

  if (hideOnSinglePage && pageNumber <= 1) {
    return null;
  }

  return (
    <ul
      className={classNames(prefixCls, className, {
        [`${prefixCls}-disabled`]: disabled,
      })}
      style={style}
    >
      {totalText}
      <li
        className={classNames(`${prefixCls}-prev`, {
          [`${prefixCls}-disabled`]: prevDisabled,
        })}
        onClick={() => prevDisabled || handleClick(localCurrent - 1)}
      >
        <LeftOutlined size="16px" />
      </li>
      {pagination}
      <li
        className={classNames(`${prefixCls}-next`, {
          [`${prefixCls}-disabled`]: nextDisabled,
        })}
        onClick={() => nextDisabled || handleClick(localCurrent + 1)}
      >
        <RightOutlined size="16px" />
      </li>
      {shouldShowOption && <li className={`${prefixCls}-options`}>{shouldShowQuickJumper && renderInput()}</li>}
    </ul>
  );
};

export default Pagination;
