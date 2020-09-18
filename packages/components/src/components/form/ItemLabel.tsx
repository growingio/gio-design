import React from 'react';

export interface Props {
  label?: string;
  fieldId?: string;
  prefixCls: string;
  labelWidth?: string | number;
  afterLabel?: React.ReactNode;
  required?: boolean | 'option';
  requireMarker?: React.ReactNode;
}

const ItemLabel: React.FC<Props> = (props: Props) => {
  const { prefixCls, label, labelWidth, fieldId, afterLabel, required, requireMarker = '（选填）' } = props;
  const isOption = required === 'option';

  let labelChild: React.ReactNode = label;
  if (isOption) {
    labelChild = (
      <div className={`${prefixCls}-label-option`}>
        <span className={`${prefixCls}-label-content`}>{label}</span>
        <span className={`${prefixCls}-label-marker`}>{requireMarker}</span>
      </div>
    );
  }

  return (
    <div className={`${prefixCls}-label`} style={{ width: labelWidth }}>
      {label && (
        <label title={label} htmlFor={fieldId}>
          {labelChild}
        </label>
      )}
      {afterLabel}
    </div>
  );
};

export default ItemLabel;
