import React, { useContext, useState, useEffect } from 'react';
import { isBoolean, isUndefined } from 'lodash';
import { WarningFilled } from '@gio-design/icons';
import Tooltip from '../tooltip';
import Button from '../button';
import { ConfigContext } from '../config-provider';
import { PopconfirmProps } from './interface';

const Popconfirm: React.FC<PopconfirmProps> = (props: PopconfirmProps) => {
  const {
    title,
    desc,
    onCancel,
    onConfirm,
    okText = '确认',
    cancelText = '取消',
    children,
    prefixCls: customizePrefixCls,
    visible,
    defaultVisible,
    disabled = false,
    onVisibleChange,
    icon,
    ...rest
  } = props;
  const [localVisible, setLocalVisible] = useState<boolean>(!disabled && (isUndefined(visible) ? false : visible));
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('popconfirm', customizePrefixCls);

  useEffect(() => {
    if (disabled) return;
    if (isBoolean(visible)) {
      setLocalVisible(visible);
    }
  }, [disabled, visible]);

  useEffect(() => {
    if (disabled) return;
    if (isBoolean(defaultVisible)) {
      setLocalVisible(defaultVisible);
    }
  }, [disabled, defaultVisible]);

  const shouldUpdateLocalVisible = (value: boolean) => {
    if (disabled) return;
    if (isUndefined(visible)) {
      setLocalVisible(value);
    }
    onVisibleChange?.(value);
  };

  const popConfirmOverlay = () => (
    <>
      {icon || <WarningFilled size="16px" color="#F7AF48" style={{ position: 'absolute', top: '22px' }} />}
      <div className={`${prefixCls}-inner-title`}>{title}</div>
      {desc && <div className={`${prefixCls}-inner-desc`}>{desc}</div>}
      <div className={`${prefixCls}-inner-btns`}>
        <Button
          size="small"
          type="secondary"
          onClick={(e) => {
            shouldUpdateLocalVisible(false);
            onCancel?.(e);
          }}
        >
          {cancelText}
        </Button>
        <Button
          size="small"
          onClick={(e) => {
            shouldUpdateLocalVisible(false);
            onConfirm?.(e);
          }}
        >
          {okText}
        </Button>
      </div>
    </>
  );

  return (
    <Tooltip
      prefixCls={prefixCls}
      visible={localVisible}
      onVisibleChange={(visible: boolean) => {
        if (disabled) return;
        shouldUpdateLocalVisible(visible);
      }}
      overlayInnerStyle={{ width: desc ? 400 : 260 }}
      overlay={popConfirmOverlay()}
      trigger="click"
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

export default Popconfirm;
