import React from 'react';
import classnames from 'classnames';
import { CheckCircleOutlined, CheckCircleFilled } from '@gio-design/icons';
import * as tokens from '@gio-design/tokens';
import _ from 'lodash';
import { StepProps } from './interface';

const Step: React.FC<StepProps> = (props) => {
  const { finished, title, description, className, prefixCls, active, stepNumber, onStepClick } = props;
  const classNames = classnames(className, `${prefixCls}__item`, {
    [`${prefixCls}__item_active`]: active === true,
    [`${prefixCls}__item_finished`]: finished === true,
  });
  const getIcon = () => {
    let icon = null;

    if (finished) {
      if (active) {
        icon = <CheckCircleFilled size="24px" color={tokens.PaletteBlue5} />;
      } else {
        icon = <CheckCircleOutlined size="24px" color={tokens.PaletteBlue5} />;
      }
    } else {
      icon = <div className={`${prefixCls}__item-icon`}>{_.isNumber(stepNumber) ? stepNumber + 1 : -1}</div>;
    }
    return icon;
  };

  const onClick = () => {
    if (_.isFunction(onStepClick)) onStepClick(_.isNumber(stepNumber) ? stepNumber : -1);
  };

  let clickableProps: {
    role?: string;
    tabIndex?: number;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  } = {};

  if (_.isFunction(onStepClick)) {
    clickableProps = {
      ...clickableProps,
      role: 'button',
      tabIndex: 0,
      onClick,
    };
  }

  return (
    <div className={classNames}>
      {/* eslint react/jsx-props-no-spreading: off */}
      <div className={`${prefixCls}__item-container`} {...clickableProps}>
        {getIcon()}
        <div className={`${prefixCls}__item-content`}>
          {title && <span className={`${prefixCls}__item-content-title`}>{title}</span>}
          {description && <span className={`${prefixCls}__item-content-description`}>{description}</span>}
        </div>
      </div>
    </div>
  );
};

export default Step;
