import React from 'react';
import classNames from 'classnames';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

import { FormLabelAlign, RequiredMark } from './context';

export interface Props {
  label?: React.ReactNode;
  title?: string;
  fieldId?: string;
  prefixCls: string;
  labelWidth?: number;
  afterLabel?: React.ReactNode;
  required?: boolean;
  requiredMark?: RequiredMark;
  marker?: React.ReactNode;
  colon?: string;
  htmlFor?: string;
  labelAlign?: FormLabelAlign;
}

const ItemLabel: React.FC<Props> = (props: Props) => {
  const {
    prefixCls,
    label,
    title = label,
    labelWidth,
    fieldId,
    afterLabel,
    required,
    requiredMark,
    marker,
    colon,
    htmlFor = fieldId,
    labelAlign,
  } = props;
  const isRequired = required && (requiredMark === true || requiredMark === undefined);
  const isOptional = !required && requiredMark === 'optional';
  const innerMarker = isOptional ? '（选填）' : '*';
  const mergedRequiredMarker = marker !== undefined ? marker : innerMarker;
  const mergedTitle = isNumber(title) || isString(title) ? (title as string) : '';
  const cls = classNames(
    `${prefixCls}-label`,
    isRequired && `${prefixCls}-label-required`,
    isOptional && `${prefixCls}-label-optional`,
    labelAlign && `${prefixCls}-label-${labelAlign}`
  );

  let labelChild: React.ReactNode = (
    <>
      {label}
      {colon}
    </>
  );

  if (isRequired || isOptional) {
    labelChild = (
      <>
        <span className={`${prefixCls}-label-content`}>{labelChild}</span>
        <span className={`${prefixCls}-label-marker`}>{mergedRequiredMarker}</span>
      </>
    );
  }

  return (
    <div className={cls} style={{ width: labelWidth }}>
      {label && (
        <label title={mergedTitle} htmlFor={htmlFor}>
          {labelChild}
        </label>
      )}
      {afterLabel}
    </div>
  );
};

export default ItemLabel;
