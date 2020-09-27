import React from 'react';
import { CheckCircleFilled, LoadingOutlined, WarningFilled, CloseCircleFilled } from '@gio-design/icons';

export type FormItemFeedbackType = 'validating' | 'error' | 'warning' | 'success';

export interface Props {
  prefixCls?: string;
  className?: string;
  inputWidth?: number;
  afterInput?: React.ReactNode;
  help?: React.ReactNode;
  hasFeedback?: boolean;
  feedback: React.ReactNode[];
  feedbackType?: FormItemFeedbackType;
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

const iconMap = {
  warning: WarningFilled,
  error: CloseCircleFilled,
  success: CheckCircleFilled,
  validating: LoadingOutlined,
};

const ItemControl: React.FC<Props> = (props: Props) => {
  const {
    prefixCls,
    inputWidth,
    afterInput,
    help,
    hasFeedback,
    feedbackType,
    feedback,
    children,
    icon: customIcon,
  } = props;

  const IconNode = feedbackType && iconMap[feedbackType];
  const innerIcon =
    hasFeedback && IconNode ? (
      <span className={`${prefixCls}-children-icon`}>
        <IconNode rotating={feedbackType === 'validating'} />
      </span>
    ) : null;
  const icon = customIcon || innerIcon;

  return (
    <div className={`${prefixCls}-control`} style={{ width: inputWidth }}>
      <div className={`${prefixCls}-control-input`}>
        {children}
        {icon}
      </div>
      {afterInput}
      <div className={`${prefixCls}-message`}>
        {help && <div className={`${prefixCls}-help`}>{help}</div>}

        {feedback && feedback.length > 0 && (
          <div className={`${prefixCls}-feedback`}>
            {feedback.map((e, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <div role="alert" key={i}>
                {e}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemControl;
