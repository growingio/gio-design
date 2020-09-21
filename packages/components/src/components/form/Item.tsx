import { Field, FormInstance } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/lib/Field';
import FieldContext from 'rc-field-form/lib/FieldContext';
import React, { useContext, useState } from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import { FormContext } from './context';
import { toArray } from './util';
import ItemControl, { FormItemFeedbackType } from './ItemControl';
import ItemLabel from './ItemLabel';

type RenderChildren = (form: FormInstance) => React.ReactNode;
type ChildrenType = RenderChildren | React.ReactNode;

export interface Props extends Omit<FieldProps, 'children'> {
  prefixCls?: string;
  className?: string;
  label?: string;
  afterLabel?: React.ReactNode;
  afterInput?: React.ReactNode;
  children?: ChildrenType;
  help?: React.ReactNode;
  hasFeedback?: boolean;
  feedback?: React.ReactNode;
  feedbackType?: FormItemFeedbackType;
  required?: boolean;
  marker?: React.ReactNode;
  icon?: React.ReactNode;
}

const Item: React.FC<Props> = (props: Props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    name,
    label,
    help,
    feedback,
    hasFeedback = !!feedback,
    feedbackType,
    afterLabel,
    afterInput,
    children,
    trigger = 'onChange',
    validateTrigger,
    required = false,
    marker,
    icon,
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('field', customizePrefixCls);
  const [hasReseted, setHasReseted] = useState(false);
  const { name: formName, labelWidth, controlWidth, requiredMark } = useContext(FormContext);
  const { validateTrigger: contextValidateTrigger = 'onChange' } = useContext(FieldContext);
  const mergedValidateTrigger = validateTrigger === undefined ? contextValidateTrigger : validateTrigger;

  return (
    <Field
      {...props}
      trigger={trigger}
      validateTrigger={mergedValidateTrigger}
      onReset={() => {
        setHasReseted(true);
      }}
    >
      {(control, meta, form) => {
        const { errors } = meta;
        const hasError = !hasReseted && errors.length > 0;
        const hasHelp = !!help;
        const mergedFeedbackType = hasError ? 'error' : feedbackType;
        const mergedFeedback = feedback ? toArray(feedback) : errors;
        const mergedRequired = required === true && (requiredMark === true || requiredMark === undefined);
        const cls = classNames(prefixCls, className, {
          [`${prefixCls}-required`]: mergedRequired,
          [`${prefixCls}-has-error`]: hasError,
          [`${prefixCls}-has-feedback`]: hasFeedback,
          [`${prefixCls}-has-help`]: hasHelp,
        });
        const mergedName = name && meta ? meta.name : [];
        const fieldId = mergedName.length ? [formName, ...mergedName].filter((d) => !!d).join('_') : undefined;

        let childNode: React.ReactNode = null;

        if (typeof children === 'function') {
          childNode = children(form);
        } else if (React.isValidElement(children)) {
          const childProps = { ...control, ...children.props };

          const triggers = new Set([...toArray(trigger), ...toArray(mergedValidateTrigger)]);

          triggers.forEach((eventName) => {
            childProps[eventName] = (...args: unknown[]) => {
              setHasReseted(false);
              control[eventName]?.(...args);
              children.props[eventName]?.(...args); // orignal event handler
            };
          });

          if (!childProps.id) {
            childProps.id = fieldId;
          }

          childNode = React.cloneElement(children, childProps);
        } else {
          childNode = children;
        }

        return (
          <div className={cls} data-message-type={mergedFeedbackType}>
            <ItemLabel {...{ label, prefixCls, fieldId, required, afterLabel, labelWidth, requiredMark, marker }} />
            <ItemControl
              {...{
                prefixCls,
                childNode,
                controlWidth,
                afterInput,
                help,
                feedback: mergedFeedback,
                hasFeedback,
                feedbackType,
                children: childNode,
                icon,
              }}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default Item;
