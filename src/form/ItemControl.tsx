import React from 'react';
import { CheckCircleFilled, LoadingTwoTone, WarningCircleFilled, CloseCircleFilled } from '@gio-design/icons';

export type FormItemFeedbackType = 'validating' | 'error' | 'warning' | 'success';

export interface Props {
  prefixCls?: string;
  className?: string;
  inputWidth?: React.CSSProperties['width'];
  afterInput?: React.ReactNode;
  help?: React.ReactNode;
  hasFeedback?: boolean;
  feedback: React.ReactNode[];
  feedbackType?: FormItemFeedbackType;
  children?: React.ReactNode;
  icon?: boolean | React.ReactNode;
}

const iconMap = {
  warning: WarningCircleFilled,
  error: CloseCircleFilled,
  success: CheckCircleFilled,
  validating: LoadingTwoTone,
};

const ItemControl: React.FC<Props> = (props: Props) => {
  const {
    prefixCls,
    inputWidth,
    afterInput,
    help,
    // hasFeedback,
    feedbackType,
    feedback,
    children,
    icon = false,
  } = props;

  const hasFeedback = feedback && feedback.length > 0;
  const IconNode = feedbackType && iconMap[feedbackType];
  const innerIcon =
    hasFeedback && IconNode ? (
      <span className={`${prefixCls}-children-icon`}>
        <IconNode rotating={feedbackType === 'validating'} />
      </span>
    ) : null;
  const mergedIcon = icon === false ? null : innerIcon;

  return (
    <div className={`${prefixCls}-control`} style={{ width: inputWidth }}>
      <div className={`${prefixCls}-control-input`}>
        {children}
        {mergedIcon}
        {afterInput}
      </div>
      <div className={`${prefixCls}-message`} data-has-feedback={hasFeedback || !!help}>
        {help && <div className={`${prefixCls}-help`}>{help}</div>}

        {hasFeedback && (
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
