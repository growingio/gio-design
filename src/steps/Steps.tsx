import React, { DOMAttributes } from 'react';
import classnames from 'classnames';
import { isNil } from 'lodash';
import { usePrefixCls } from '@gio-design/utils';
import { StepProps, StepsProps } from './interface';
import useControlledState from '../utils/hooks/useControlledState';
import Step from './Step';
import { WithCommonProps } from '../utils/interfaces';
import WithRef from '../utils/withRef';

export const Steps = WithRef<
  HTMLDivElement,
  WithCommonProps<StepsProps> & Omit<DOMAttributes<HTMLDivElement>, 'onChange'>
>(
  (
    {
      current,
      defaultCurrent = 0,
      onChange,
      className: classname,
      children,
      size = 'normal',
      className: customClassName,
      ...restProps
    }: WithCommonProps<StepsProps> & Omit<DOMAttributes<HTMLDivElement>, 'onChange'>,
    ref?
  ) => {
    const validCurrent = !isNil(current) && current < 0 ? defaultCurrent : current;
    const [mergedCurrent, setCurrent] = useControlledState<number>(validCurrent, defaultCurrent);
    const prefixCls = usePrefixCls('steps');
    const stepCls = classnames(prefixCls, classname, customClassName, {
      [`${prefixCls}-${size}`]: size,
    });

    const childrenToArray = () =>
      React.Children.toArray(children).filter(
        (node) => React.isValidElement(node) && node.type === Step
      ) as React.ReactElement<StepProps & { stepIndex?: number }>[];

    const onStepClick = (next: number) => {
      if (next < mergedCurrent) {
        setCurrent(next);
        onChange?.(next);
      }
    };
    const steps = childrenToArray().map((child: React.ReactElement<StepProps>, index) => {
      const { status, onClick: propOnClick, ...restStepProps } = child.props;
      const stepIndex = index + 1;
      const childProps: StepProps & { stepIndex?: number; active?: boolean } = {
        stepIndex,
        status,
        onClick: () => {
          onStepClick(stepIndex);
          propOnClick?.(stepIndex);
        },
        ...restStepProps,
      };
      if (!child.props.status) {
        if (stepIndex === mergedCurrent) {
          childProps.status = 'process';
        } else if (stepIndex < mergedCurrent) {
          childProps.status = 'finish';
        } else {
          childProps.status = 'pending';
        }
      }

      childProps.active = stepIndex === mergedCurrent;

      return React.cloneElement(child, { ...childProps, key: stepIndex });
    });

    return (
      <div className={stepCls} data-testid="steps" ref={ref} {...restProps}>
        <div data-testid="step-bars" className={`${prefixCls}-container`}>
          {steps}
        </div>
      </div>
    );
  }
);

Steps.displayName = 'Steps';

export default Steps;
