import React from 'react';
import classNames from 'classnames';

import { FormLabelAlign, RequiredMark } from './context';

export interface Props {
  label?: string;
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
  const cls = classNames(
    `${prefixCls}-label`,
    isRequired && `${prefixCls}-label-required`,
    isOptional && `${prefixCls}-label-optional`,
    labelAlign && `${prefixCls}-label-${labelAlign}`
  );

  let labelChild: React.ReactNode = label;
  if (isRequired || isOptional) {
    labelChild = (
      <>
        <span className={`${prefixCls}-label-content`}>
          {label}
          {colon}
        </span>
        <span className={`${prefixCls}-label-marker`}>{mergedRequiredMarker}</span>
      </>
    );
  }

  return (
    <div className={cls} style={{ width: labelWidth }}>
      {label && (
        <label title={label} htmlFor={htmlFor}>
          {labelChild}
        </label>
      )}
      {afterLabel}
    </div>
  );
};

export default ItemLabel;
