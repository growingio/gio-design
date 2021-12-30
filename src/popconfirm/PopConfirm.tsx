import React, { useCallback, useEffect } from 'react';
import { WarningCircleFilled } from '@gio-design/icons';
import { useControlledState, useLocale, usePrefixCls } from '@gio-design/utils';
import { isUndefined } from 'lodash';
import Button from '../button';
import Popover from '../popover/Popover';
import { PopConfirmProps } from './interface';
import defaultLocaleText from './locales/zh-CN';

const PopConfirm: React.FC<PopConfirmProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    title,
    desc,
    onCancel: onCustomizeCancel,
    onConfirm: onCustomizeConfirm,
    onVisibleChange: onCustomizeVisibleChange,
    okText,
    cancelText,
    icon,
    visible: customizaVisible,
    defaultVisible,
    children,
    disabled,
    trigger = 'click',
    ...rest
  } = props;
  const prefixCls = usePrefixCls('confirm', customizePrefixCls);
  const textObject: typeof defaultLocaleText = useLocale('PopConfirm') || defaultLocaleText;
  const [visible, setVisible] = useControlledState(customizaVisible, defaultVisible);

  const onVisibleChange = useCallback(
    (resetVisible: boolean) => {
      const realVisible = !disabled && resetVisible;
      setVisible(realVisible);
      onCustomizeVisibleChange?.(realVisible);
    },
    [disabled, onCustomizeVisibleChange, setVisible]
  );

  const onCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setVisible(false);
      onCustomizeCancel?.(e);
      onCustomizeVisibleChange?.(false);
    },
    [onCustomizeCancel, onCustomizeVisibleChange, setVisible]
  );
  const onConfirm = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const confirmCode = onCustomizeConfirm?.(e);
      if (confirmCode !== false) {
        setVisible(false);
        onCustomizeVisibleChange?.(false);
      }
    },
    [onCustomizeConfirm, onCustomizeVisibleChange, setVisible]
  );

  useEffect(() => {
    if (!isUndefined(customizaVisible)) {
      setVisible(customizaVisible);
    }
  }, [customizaVisible, setVisible]);

  const content = (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}__content`}>
        <div className={`${prefixCls}__content-title`}>
          <span className={`${prefixCls}__content-title-icon`}>{icon || <WarningCircleFilled />}</span>
          <span className={`${prefixCls}__content-title-text`}>{title}</span>
        </div>
        {desc && <div className={`${prefixCls}__content-desc`}>{desc}</div>}
      </div>
      <div className={`${prefixCls}__footer`}>
        <div>
          <Button onClick={onCancel} size="small" type="secondary">
            {cancelText || textObject.cancelText}
          </Button>
          <Button onClick={onConfirm} size="small">
            {okText || textObject.okText}
          </Button>
        </div>
      </div>
    </div>
  );
  return (
    <Popover
      {...rest}
      trigger={trigger}
      visible={visible}
      enterable
      onVisibleChange={onVisibleChange}
      content={content}
    >
      {children}
    </Popover>
  );
};

export default PopConfirm;
