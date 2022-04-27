import React from 'react';
import {
  MobileOutlined,
  ClickOutlined,
  EventOutlined,
  GlobeOutlined,
  RelationOutlined,
  BrowserOutlined,
  CompassOutlined,
  UserTieOutlined,
  TagOutlined,
  CodeOutlined,
} from '@gio-design/icons';

const IconRender = (props: { group?: string }) => {
  const { group = '' } = props;
  switch (group) {
    case 'cs':
      return <EventOutlined />;
    case 'ads':
      return <EventOutlined />;
    case 'page':
      return <BrowserOutlined />;
    case 'app':
      return <EventOutlined />;
    case 'event':
      return <EventOutlined />;
    case 'item':
      return <RelationOutlined />;
    case 'people':
      return <BrowserOutlined />;
    case 'visitor':
      return <EventOutlined />;
    case 'element':
      return <ClickOutlined />;
    case 'conversion':
      return <BrowserOutlined />;
    case 'user':
      return <UserTieOutlined />;
    case 'tag':
      return <TagOutlined />;
    case 'geo':
      return <GlobeOutlined />;
    case 'device':
      return <MobileOutlined />;
    case 'origin':
      return <CompassOutlined />;
    case 'virtual':
      return <CodeOutlined />;
    default:
      return <EventOutlined />;
  }
};
export default IconRender;
