import React from 'react';
import classnames from 'classnames';
import { CheckCircleOutlined, CheckCircleFilled } from '@gio-design/icons';
import * as tokens from '@gio-design/tokens';
import { isFunction } from 'lodash';
import { StepProps } from './interface';

const Step: React.FC<StepProps> = (props) => {
  const { finished, title, description, className, prefixCls, active, stepNumber = 0, onStepClick } = props;
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
      icon = <div className={`${prefixCls}__item-icon`}>{stepNumber + 1}</div>;
    }
    return icon;
  };

  let clickableProps: {
    role?: string;
    tabIndex?: number;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  } = {};

  if (isFunction(onStepClick)) {
    clickableProps = {
      ...clickableProps,
      role: 'button',
      tabIndex: 0,
      onClick: () => {
        onStepClick(stepNumber);
      },
    };
  }

  return (
    <div className={classNames}>
      {/* eslint react/jsx-props-no-spreading: off */}
      <div
        className={description ? `${prefixCls}__item-container` : `${prefixCls}__item-noDescription`}
        {...clickableProps}
      >
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
