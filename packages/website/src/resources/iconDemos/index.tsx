/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, ReactText } from 'react';
import * as GIOIcons from '@gio-design/icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import { TabNav, Toast } from '@gio-design/components';
import { Outlined, Filled } from './svgs';

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
    <div className="gio-icon-list">
      <div className="gio-icon-list-header">
        <TabNav activeKey={iconType} onChange={onIconTypeChange}>
          <TabNav.Item key="outlined">
            <Outlined />
            <span className="gio-tabnav__title">Outlined</span>
          </TabNav.Item>
          <TabNav.Item key="filled">
            <Filled />
            <span className="gio-tabnav__title">Filled</span>
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
