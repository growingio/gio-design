import React, { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { isFunction, isNumber, isNaN, isUndefined } from 'lodash';
import { LeftOutlined, LeftDoubleOutlined, RightOutlined, RightDoubleOutlined, MoreOutlined } from '@gio-design/icons';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import Input from '../input';
import Select from '../select';
import { PaginationProps } from './interface';
import { generatePageArray } from './until';
import useControlledState from '../../utils/hooks/useControlledState';

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
  showTotal = (totals: number) => `总共 ${totals.toLocaleString()} 条`,
  onChange,
  showQuickJumper = false,
  hideOnSinglePage = false,
  showSizeChanger = false,
  pageSizeOptions = ['10', '20', '50', '100'],
  onShowSizeChange,
}: PaginationProps) => {
  const prefixCls = usePrefixCls('pagination', customizePrefixCls);
  const [controlledCurrent, setControlledCurrent] = useControlledState(current, defaultCurrent);
  const [controlledPageSize, setControlledPageSize] = useControlledState(pageSize, defaultPageSize);
  const [inputValue, setInputValue] = useState<string>('');
  const pageNumber = useMemo(() => Math.ceil(total / controlledPageSize), [total, controlledPageSize]);

  useEffect(() => {
    if(controlledCurrent > pageNumber) {
      onChange?.(pageNumber, controlledPageSize);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const shouldShowQuickJumper = useMemo(() => showQuickJumper && pageNumber > 10, [showQuickJumper, pageNumber]);
  const shouldShowOption = useMemo(() => shouldShowQuickJumper || showSizeChanger, [
    shouldShowQuickJumper,
    showSizeChanger,
  ]);
  const offset = 5;

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
              <MoreOutlined className="more" />
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
              <MoreOutlined className="more" />
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
    if (!isFunction(showTotal)) {
      return null;
    }
    return (
      <li className={`${prefixCls}-total-text`}>
        {showTotal(total, [
          total === 0 ? 0 : (controlledCurrent - 1) * controlledPageSize + 1,
          controlledCurrent * controlledPageSize > total ? total : controlledCurrent * controlledPageSize,
        ])}
      </li>
    );
  }, [total, showTotal, controlledCurrent, controlledPageSize, prefixCls]);

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
      <Select
        size="small"
        listHeight={176}
        disabled={disabled}
        defaultValue={controlledPageSize.toString()}
        onSelect={handleSelectPageSize}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        getContainer={(triggerNode) => triggerNode.parentElement!}
        options={pageSizeOptions.map((value) => ({
          value,
          label: `${value}条/页`,
        }))}
      />
    </div>
  );

  const handleInputPressEnter = (): void => {
    const transformValue = Number(inputValue);
    if (!isNaN(transformValue)) {
      if (transformValue >= 1 && transformValue <= pageNumber) {
        setControlledCurrent(transformValue);
        onChange?.(transformValue, controlledPageSize);
      }
    }
    setInputValue('');
  };

  const renderInput = (): React.ReactElement => (
    <div className={`${prefixCls}-options-quick-jumper`}>
      跳至
      <Input
        size="small"
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
        onClick={() => prevDisabled || handleClick(controlledCurrent - 1)}
        aria-hidden="true"
      >
        <LeftOutlined size="16px" />
      </li>
      {pagination}
      <li
        className={classNames(`${prefixCls}-next`, {
          [`${prefixCls}-disabled`]: nextDisabled,
        })}
        onClick={() => nextDisabled || handleClick(controlledCurrent + 1)}
        aria-hidden="true"
      >
        <RightOutlined size="16px" />
      </li>
      {shouldShowOption && (
        <li className={`${prefixCls}-options`}>
          {showSizeChanger && renderSelect()}
          {shouldShowQuickJumper && renderInput()}
        </li>
      )}
    </ul>
  );
};

export default Pagination;
