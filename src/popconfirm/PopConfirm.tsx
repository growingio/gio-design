import React, { useCallback, useEffect, useState } from 'react';
import { WarningCircleFilled } from '@gio-design/icons';
import { isUndefined } from 'lodash';
import usePrefixCls from '../utils/hooks/use-prefix-cls';
import Button from '../button';
import Popover from '../popover/Popover';
import { PopConfirmProps } from './interface';

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
    children,
    disabled,
    ...rest
  } = props;
  const prefixCls = usePrefixCls('confirm-new', customizePrefixCls);

  const [visible, setVisible] = useState(customizaVisible);

  const onVisibleChange = useCallback(
    (resetVisible: boolean) => {
      const realVisible = !disabled && resetVisible;
      setVisible(realVisible);
      onCustomizeVisibleChange?.(realVisible);
    },
    [disabled, onCustomizeVisibleChange]
  );

  const onCancel = useCallback(
    (e) => {
      setVisible(false);
      onCustomizeCancel?.(e);
      onCustomizeVisibleChange?.(false);
    },
    [onCustomizeCancel, onCustomizeVisibleChange]
  );
  const onConfirm = useCallback(
    (e) => {
      const confirmCode = onCustomizeConfirm?.(e);
      if (confirmCode !== false) {
        setVisible(false);
        onCustomizeVisibleChange?.(false);
      }
    },
    [onCustomizeConfirm, onCustomizeVisibleChange]
  );

  useEffect(() => {
    if (!isUndefined(customizaVisible)) {
      setVisible(customizaVisible);
    }
  }, [customizaVisible]);

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
            {cancelText || '取消'}
          </Button>
          <Button onClick={onConfirm} size="small">
            {okText || '确认'}
          </Button>
        </div>
      </div>
    </div>
  );
  return (
    <Popover {...rest} visible={visible} enterable onVisibleChange={onVisibleChange} content={content}>
      {children}
    </Popover>
  );
};

export default PopConfirm;
