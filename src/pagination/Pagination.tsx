import React, { useMemo, useState, useRef, useCallback } from 'react';
import classNames from 'classnames';
import { isFunction, isNumber, isNaN as notNumber, isUndefined } from 'lodash';
import { LeftOutlined, LeftDoubleOutlined, RightOutlined, RightDoubleOutlined, MoreOutlined } from '@gio-design/icons';
import { usePrefixCls, useLocale } from '@gio-design/utils';
import Input from '../legacy/input';
import Select from '../components/select';
import { PaginationProps } from './interface';
import { generatePageArray } from './until';
import { IconButton } from '../button';
import useControlledState from '../utils/hooks/useControlledState';
import defaultLocale from './locales/zh-CN';

const Pagination = ({
  prefixCls: customizePrefixCls,
  defaultCurrent = 1,
  defaultPageSize = 10,
  disabled,
  pageSize,
  current,
  className,
  style,
  total = 0,
  showTotal,
  onChange,
  showQuickJumper = false,
  hideOnSinglePage = false,
  showSizeChanger = false,
  pageSizeOptions = ['10', '20', '50'],
  onShowSizeChange,
}: PaginationProps) => {
  const prefixCls = usePrefixCls('pagination', customizePrefixCls);
  const [controlledCurrent, setControlledCurrent] = useControlledState(current, defaultCurrent);
  const [controlledPageSize, setControlledPageSize] = useControlledState(pageSize, defaultPageSize);
  const [inputValue, setInputValue] = useState<number>(1);
  const pageNumber = useMemo(() => Math.ceil(total / controlledPageSize), [total, controlledPageSize]);

  const shouldShowQuickJumper = useMemo(() => showQuickJumper && pageNumber > 10, [showQuickJumper, pageNumber]);
  const shouldShowOption = useMemo(
    () => shouldShowQuickJumper || showSizeChanger,
    [shouldShowQuickJumper, showSizeChanger]
  );
  const offset = 5;

  const locale = useLocale('Pagination');
  const { all, totals, jumpTo, pages }: { [key: string]: string } = {
    ...defaultLocale,
    ...locale,
  };

  const showTotals = useMemo(
    () => showTotal ?? ((tol: number) => `${all} ${tol.toLocaleString()} ${totals}`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showTotal]
  );

  const prevSymbol = useRef<symbol>(Symbol('prev'));
  const nextSymbol = useRef<symbol>(Symbol('next'));
  const prevDisabled = controlledCurrent <= 1;
  const nextDisabled = controlledCurrent >= pageNumber;

  const handleClick = useCallback(
    (toPage: number) => {
      if (isNumber(toPage) && !Object.is(toPage, controlledCurrent) && !disabled) {
        // eslint-disable-next-line no-underscore-dangle
        let _toPage = toPage;
        if (_toPage < 1) {
          _toPage = 1;
        } else if (toPage > pageNumber) {
          _toPage = pageNumber;
        }
        if (isUndefined(current)) {
          setControlledCurrent(_toPage);
        }
        onChange?.(_toPage, controlledPageSize);
      }
    },
    [controlledCurrent, disabled, pageNumber, current, onChange, controlledPageSize, setControlledCurrent]
  );

  const pagination = useMemo(
    () =>
      generatePageArray(controlledCurrent, pageNumber, offset, prevSymbol, nextSymbol).map((page: number | symbol) => {
        if (Object.is(page, prevSymbol.current)) {
          return (
            <li
              key="prev"
              className={classNames(`${prefixCls}-jump-prev`)}
              onClick={() => handleClick(controlledCurrent - offset)}
              aria-hidden="true"
            >
              <MoreOutlined className="more" color="#313E75" />
              <LeftDoubleOutlined className="double" color="#0044F2" />
            </li>
          );
        }
        if (Object.is(page, nextSymbol.current)) {
          return (
            <li
              key="next"
              className={classNames(`${prefixCls}-jump-next`)}
              onClick={() => handleClick(controlledCurrent + offset)}
              aria-hidden="true"
            >
              <MoreOutlined className="more" color="#313E75" />
              <RightDoubleOutlined className="double" color="#0044F2" />
            </li>
          );
        }
        return (
          <li
            className={classNames(`${prefixCls}-item`, {
              [`${prefixCls}-item-active`]: page === controlledCurrent,
            })}
            key={page as number}
            onClick={() => handleClick(page as number)}
            aria-hidden="true"
          >
            {page}
          </li>
        );
      }),
    [controlledCurrent, pageNumber, handleClick, prefixCls]
  );

  const totalText = useMemo(() => {
    if (!isFunction(showTotals)) {
      return null;
    }
    return (
      <li className={`${prefixCls}-total-text`}>
        {showTotals(total, [
          total === 0 ? 0 : (controlledCurrent - 1) * controlledPageSize + 1,
          controlledCurrent * controlledPageSize > total ? total : controlledCurrent * controlledPageSize,
        ])}
      </li>
    );
  }, [total, showTotals, controlledCurrent, controlledPageSize, prefixCls]);

  const handleSelectPageSize = (selectValue: string): void => {
    let _current = controlledCurrent;
    const newPageSize = Number(selectValue);
    setControlledPageSize(newPageSize);
    const newPageNumber = Math.ceil(total / newPageSize);
    if (controlledCurrent > newPageNumber) {
      setControlledCurrent(newPageNumber);
      _current = newPageNumber;
      onChange?.(newPageNumber, newPageSize);
    }
    onShowSizeChange?.(_current, newPageSize);
  };

  const renderSelect = (): React.ReactElement => (
    <div className={`${prefixCls}-options-size-changer`}>
      每页展示
      <Select
        size="small"
        listHeight={176}
        disabled={disabled}
        defaultValue={`${controlledPageSize.toString()}`}
        onSelect={handleSelectPageSize}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getContainer={(triggerNode) => triggerNode.parentElement!}
        options={pageSizeOptions.map((value) => ({
          value,
          label: `${value}`,
        }))}
        style={{ height: '28px', margin: '0 8px' }}
      />
      条
    </div>
  );

  const handleInputPressEnter = (): void => {
    const transformValue = Number(inputValue);
    if (!notNumber(transformValue)) {
      if (transformValue >= 1 && transformValue <= pageNumber) {
        setControlledCurrent(transformValue);
        onChange?.(transformValue, controlledPageSize);
      }
    }
    setInputValue(1);
  };

  const renderInput = (): React.ReactElement => (
    <div className={`${prefixCls}-options-quick-jumper`}>
      {jumpTo}
      <Input.InputNumber
        size="small"
        value={inputValue}
        disabled={disabled}
        onChange={(val) => setInputValue(Number(val))}
        onPressEnter={handleInputPressEnter}
        style={{ height: '30px' }}
      />
      {pages}
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
      {shouldShowOption && <li className={`${prefixCls}-options`}>{showSizeChanger && renderSelect()}</li>}
      {totalText}
      <li className={`${prefixCls}-arrow-container`} aria-hidden="true">
        <IconButton
          type="secondary"
          size="small"
          className={`${prefixCls}-prev`}
          onClick={() => prevDisabled || handleClick(controlledCurrent - 1)}
          disabled={prevDisabled}
        >
          <LeftOutlined />
        </IconButton>
      </li>
      {pagination}
      <li className={`${prefixCls}-arrow-container`} aria-hidden="true">
        <IconButton
          type="secondary"
          size="small"
          className={classNames(`${prefixCls}-next`)}
          onClick={() => nextDisabled || handleClick(controlledCurrent + 1)}
          disabled={nextDisabled}
        >
          <RightOutlined />
        </IconButton>
      </li>
      {shouldShowOption && <li className={`${prefixCls}-options`}>{shouldShowQuickJumper && renderInput()}</li>}
    </ul>
  );
};

export default Pagination;
