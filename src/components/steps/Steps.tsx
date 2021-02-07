import React from 'react';
import classnames from 'classnames';
import _ from 'lodash';
import toArray from 'rc-util/lib/Children/toArray';
import { cloneElement } from '../../utils/reactNode';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';
import Step from './Step';
import { StepsProps, StepProps } from './interface';

export const typeEnum = {
  drawer: Symbol('drawer'),
  modal: Symbol('modal'),
  page: Symbol('page'),
};

export const sizeEnum = {
  small: Symbol('small'),
  middle: Symbol('middle'),
};

/**
 * 获取支持的最多步骤数
 * 页面和大弹窗最多支持 4 步，小弹窗和抽屉最多支持 2 步
 */
function getMaxStepNumber(type: symbol, size: symbol) {
  switch (type) {
    case typeEnum.drawer:
      return 2;
    case typeEnum.modal:
      if (size === sizeEnum.small) return 2;
      if (size === sizeEnum.middle) return 4;
      return 2;
    default:
      return 4;
  }
}

const Steps: React.FC<StepsProps> & { Step: React.FC<StepProps> } = (props: StepsProps) => {
  const { current = 0, type = 'page', size = 'small', className, onClick, children: ch } = props;
  const prefixCls = usePrefixCls('steps');
  if (!ch) return null;
  const children = toArray(ch);

  const classNames = classnames(className, prefixCls, `${prefixCls}-${type}`, `${prefixCls}-${type}-${size}`);

  let maxStepNumber = getMaxStepNumber(typeEnum[type], sizeEnum[size]);
  if (maxStepNumber > children.length) maxStepNumber = children.length;

  const onStepClick = (stepNumber: number) => {
    if (_.isFunction(onClick)) onClick(stepNumber);
  };

  return (
    <div className={classNames}>
      {children.map((step, index) => {
        if (index >= maxStepNumber) return null;
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
        if (current < maxStepNumber && current >= 0) {
          active = current === index;
        } else if ((current >= maxStepNumber && index === maxStepNumber - 1) || (current < 0 && index === 0)) {
          active = true;
        } else {
          active = false;
        }
        stepProps.active = active;

        /**
         * 步骤项为可点击状态要满足以下所有条件:
         * 1. 当前步骤之前的所有步骤；
         * 4. 设置了 onClick 回调函数。
         * 2. 当前步骤的下一个步骤(或者是 finished = true)；
         */
        if (!active && _.isFunction(onClick) && (index <= current + 1 || stepProps.finished))
          stepProps.onStepClick = onStepClick;

        return cloneElement(step, stepProps);
      })}
    </div>
  );
};

Steps.Step = Step;

export default Steps;
