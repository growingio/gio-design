import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import toArray from 'rc-util/lib/Children/toArray';
import { cloneElement } from '../../utils/reactNode';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import Step from './Step';
import { StepsProps, StepProps } from './interface';

const Steps: React.FC<StepsProps> & { Step: React.FC<StepProps> } = (props: StepsProps) => {
  const { current = 0, className, onClick, children: ch } = props;
  const prefixCls = usePrefixCls('steps');
  if (!ch) return null;
  const children = toArray(ch);

  return (
    <div className={classnames(className, prefixCls)}>
      {children.map((step, index) => {
        const stepProps: StepProps = {
          ...step.props,
          prefixCls,
          stepNumber: index,
        };

        if (_.isNil(stepProps.finished)) {
          if (index < current) {
            stepProps.finished = true;
          } else {
            stepProps.finished = false;
          }
        }

        let active = false;
        if (current >= 0) {
          active = current === index;
        } else if (current < 0 && index === 0) {
          active = true;
        }
        stepProps.active = active;

        if (!active && _.isFunction(onClick)) {
          stepProps.onStepClick = onClick;
        }

        return cloneElement(step, stepProps);
      })}
    </div>
  );
};

Steps.Step = Step;

export default Steps;
