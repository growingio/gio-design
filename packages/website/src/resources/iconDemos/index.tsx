/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, ReactText } from 'react';
import * as GIOIcons from '@gio-design/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import { TabNav, Toast } from '@gio-design/components';
import outLinedSrc from './assets/outlined.svg';
import filledSrc from './assets/filled.svg';

import '@gio-design/components/es/components/toast/style/index.css';
import '@gio-design/components/es/components/tabnav/style/index.css';

import './index.less';

const allIcons: {
  [key: string]: any;
} = GIOIcons;

interface ItemProps {
  title: string;
  icon: React.ReactElement;
}
function Item({ title, icon }: ItemProps) {
  function onCopy(text: string, result: boolean) {
    if (result) {
      Toast.success(`${text} copied!`, 3);
    } else {
      Toast.error('Copy icon name failed!');
    }
  }

  return (
    <CopyToClipboard text={`<${title} />`} onCopy={onCopy}>
      <div className="icon-item-container">
        <div className="icon-item-inner-container">
          {icon}
          <span className="icon-item-title">{title}</span>
        </div>
      </div>
    </CopyToClipboard>
  );
}

function filterIcons(iconKeys: string[], type: string) {
  return iconKeys.filter((k: string) => k.toLowerCase().endsWith(type));
}

export default () => {
  const [iconType, setIconType] = useState('outlined');

  function onIconTypeChange(iconType: ReactText) {
    setIconType(iconType as string);
  }

  const iconKeys = filterIcons(Object.keys(allIcons), iconType);
  return (
    <div>
      <div>
        <TabNav activeKey={iconType} onChange={onIconTypeChange}>
          <TabNav.Item key="outlined">
            <img src={outLinedSrc} />
            <span style={{ marginLeft: 6, verticalAlign: 'middle' }}>Outlined</span>
          </TabNav.Item>
          <TabNav.Item key="filled">
            <img src={filledSrc} />
            <span style={{ marginLeft: 6, verticalAlign: 'middle' }}>Filled</span>
          </TabNav.Item>
        </TabNav>
      </div>
      <div className="icons-category">
        {iconKeys.map((key: string) => (
          <Item key={key} title={key} icon={React.createElement(allIcons[key])} />
        ))}
      </div>
    </div>
  );
};
