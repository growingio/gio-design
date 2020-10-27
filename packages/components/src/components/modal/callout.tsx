import React from 'react';
import ReactDOM from 'react-dom';
import { WarningFilled, InformationFilled, CheckCircleFilled, CloseCircleFilled } from '@gio-design/icons';
import { PaletteBlue4, PaletteYellow5, PaletteGreen6, PaletteRed5 } from '@gio-design/tokens';
import CalloutModal from './CalloutModal';
import { IModalStaticFuncConfig, IModalStaticFuncReturn } from './interface';

export default function callout(config: IModalStaticFuncConfig): IModalStaticFuncReturn {
  const container = document.createElement('div');
  container.classList.add('gio-modal__callout-container');
  document.body.appendChild(container);

  let props = { okText: '确定', closeText: '取消', ...config, close, visible: true };

  function render(modalProps: any) {
    setTimeout(() => {
      ReactDOM.render(<CalloutModal {...modalProps}>{modalProps.content}</CalloutModal>, container);
    });
  }

  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(container);

    if (unmountResult && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }

  function close(...args: any[]) {
    props = {
      ...props,
      visible: false,
      afterClose: destroy.bind(this, ...args),
    };
    render(props);
  }

  function update(newConfig: IModalStaticFuncConfig) {
    props = {
      ...props,
      ...newConfig,
    };
    render(props);
  }

  render(props);

  return {
    destroy: close,
    update,
  };
}

export const iconColorMap = {
  confirm: PaletteYellow5,
  info: PaletteBlue4,
  success: PaletteGreen6,
  warn: PaletteYellow5,
  error: PaletteRed5,
};

export function withConfirm(props: IModalStaticFuncConfig): IModalStaticFuncConfig {
  return {
    type: 'confirm',
    icon: <WarningFilled size="20px" color={iconColorMap.confirm} />,
    showClose: true,
    ...props,
  };
}

export function withInfo(props: IModalStaticFuncConfig): IModalStaticFuncConfig {
  return {
    type: 'info',
    icon: <InformationFilled size="20px" color={iconColorMap.info} />,
    showClose: false,
    ...props,
  };
}

export function withSuccess(props: IModalStaticFuncConfig): IModalStaticFuncConfig {
  return {
    type: 'success',
    icon: <CheckCircleFilled size="20px" color={iconColorMap.success} />,
    showClose: false,
    ...props,
  };
}

export function withWarn(props: IModalStaticFuncConfig): IModalStaticFuncConfig {
  return {
    type: 'warn',
    icon: <WarningFilled size="20px" color={iconColorMap.warn} />,
    showClose: false,
    ...props,
  };
}

export function withError(props: IModalStaticFuncConfig): IModalStaticFuncConfig {
  return {
    type: 'error',
    icon: <CloseCircleFilled size="20px" color={iconColorMap.error} />,
    showClose: false,
    ...props,
  };
}
