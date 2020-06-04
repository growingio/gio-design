/* eslint-disable react/jsx-no-script-url */
import * as React from 'react';
import Checkbox from '../checkbox';
import './style/index.less';

interface TipProps {
  message: React.ReactNode;
  // 存在 localStorage 当中的 key
  name: string;
}

const Tip: React.FC<TipProps> = ({ message, name }) => {
  name = `gio-tip::${name}`;
  const [vanish, setVanish] = React.useState(false);
  const [visible, setVisible] = React.useState(localStorage.getItem(name) !== 'true');

  const hide = React.useCallback(() => {
    if (vanish) {
      localStorage.setItem(name, 'true');
    }
    setVisible(false);
  }, [vanish]);

  if (!visible) {
    return null;
  }
  return (
    <div className='gio-tip'>
      <div className='gio-tip__message'>{message}</div>
      <div className='gio-tip__operate'>
        <Checkbox checked={vanish} className='gio-tip__checkbox' onChange={(e) => setVanish(e.target.checked)} />
        &nbsp;
        <span>不再提示</span>
        &nbsp;
        <a className='gio-tip__a' href='javascript:void(0)' onClick={hide}>
          我知道了
        </a>
      </div>
    </div>
  );
};

export default Tip;
