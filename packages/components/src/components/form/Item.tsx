import { Field, FormInstance } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/lib/Field';
import { Meta } from 'rc-field-form/lib/interface';
import FieldContext from 'rc-field-form/lib/FieldContext';
import React, { useContext } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import { FormContext, FormLabelAlign } from './context';
import { hasValidName, toArray } from './util';
import ItemControl, { FormItemFeedbackType } from './ItemControl';
import ItemLabel from './ItemLabel';

type RenderChildren = (form: FormInstance) => React.ReactNode;
type ChildrenType = RenderChildren | React.ReactNode;

export interface Props extends Omit<FieldProps, 'children'> {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  afterLabel?: React.ReactNode;
  afterInput?: React.ReactNode;
  children?: ChildrenType;
  help?: React.ReactNode;
  feedback?: React.ReactNode;
  feedbackType?: FormItemFeedbackType;
  required?: boolean;
  marker?: React.ReactNode;
  feedbackIcon?: React.ReactNode;
  htmlFor?: string;
  labelWidth?: number;
  inputWidth?: number;
  colon?: boolean;
  labelAlign?: FormLabelAlign;

  fieldKey?: React.Key | React.Key[];
}

const Item: React.FC<Props> = (props: Props) => {
  const {
    requiredMark,
    name: formName,
    labelWidth: _labelWidth,
    inputWidth: _inputWidth,
    colon: _colon,
    labelAlign: _labelAlign,
  } = useContext(FormContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    style,
    name,
    label,
    help,
    feedback,
    feedbackType,
    afterLabel,
    afterInput,
    children,
    trigger = 'onChange',
    validateTrigger,
    required = false,
    marker,
    feedbackIcon,
    htmlFor,
    labelWidth = _labelWidth, // set default value to formContext value
    inputWidth = _inputWidth,
    colon = _colon,
    labelAlign = _labelAlign,
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('field', customizePrefixCls);
  const { validateTrigger: contextValidateTrigger = 'onChange' } = useContext(FieldContext);
  const mergedValidateTrigger = validateTrigger === undefined ? contextValidateTrigger : validateTrigger;

  const renderLayout = (childNode: React.ReactNode, meta?: Meta, fieldId?: string) => {
    const { errors = [] } = meta || {};
    const hasFeedback = !!feedback;
    const hasError = errors.length > 0;
    const hasHelp = !!help;
    const mergedFeedbackType = feedbackType || (hasError ? 'error' : feedbackType);
    const mergedFeedback = feedback ? toArray(feedback) : errors;
    const mergedRequired = required === true && (requiredMark === true || requiredMark === undefined);
    const cls = classNames(prefixCls, className, {
      [`${prefixCls}-required`]: mergedRequired,
      [`${prefixCls}-has-error`]: hasError,
      [`${prefixCls}-has-feedback`]: hasFeedback,
      [`${prefixCls}-has-help`]: hasHelp,
    });

    return (
      <div className={cls} data-message-type={mergedFeedbackType} style={style}>
        <ItemLabel
          label={label}
          labelAlign={labelAlign}
          prefixCls={prefixCls}
          fieldId={fieldId}
          required={required}
          afterLabel={afterLabel}
          labelWidth={labelWidth}
          requiredMark={requiredMark}
          marker={marker}
          htmlFor={htmlFor}
          colon={colon ? '：' : ''}
        />
        <ItemControl
          prefixCls={prefixCls}
          inputWidth={inputWidth}
          afterInput={afterInput}
          help={help}
          feedback={mergedFeedback}
          feedbackType={feedbackType}
          icon={feedbackIcon}
        >
          {childNode}
        </ItemControl>
      </div>
    );
  };

  // 没传 name 进行 merge control 会影响到 input 的 defaultValue
  // name 可能为 `0`，校验条件不能简单把 `name` 转成 boolean
  if (!hasValidName(name) && typeof children !== 'function') {
    return renderLayout(children);
  }

  return (
    <Field {...props} trigger={trigger} validateTrigger={mergedValidateTrigger}>
      {(control, meta, form) => {
        const mergedName = name && meta ? meta.name : [];
        const fieldId = mergedName.length
          ? [formName, ...mergedName].filter((d) => d !== undefined).join('_')
          : undefined;

        let childNode: React.ReactNode = null;

        if (typeof children === 'function') {
          childNode = children(form);
        } else if (React.isValidElement(children)) {
          const childProps = { ...control, ...children.props };

          const triggers = new Set([...toArray(trigger), ...toArray(mergedValidateTrigger)]);

          triggers.forEach((eventName) => {
            childProps[eventName] = (...args: unknown[]) => {
              control[eventName]?.(...args);
              children.props[eventName]?.(...args); // execute the orignal event handler
            };
          });

          if (!childProps.id) {
            childProps.id = fieldId;
          }

          childNode = React.cloneElement(children, childProps);
        } else {
          childNode = children;
        }

        return renderLayout(childNode, meta, fieldId);
      }}
    </Field>
  );
};

export default Item;
