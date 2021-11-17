import React from 'react';
import {
  DevicePropertyOutlined,
  // AttributionPropertyOutlined,
  ElementPropertyOutlined,
  EventPropertyOutlined,
  GeoPropertyOutlined,
  ItemPropertyOutlined,
  PagePropertyOutlined,
  UserOriginOutlined,
  UserPropertyOutlined,
  TagOutlined,
} from '@gio-design/icons';

const IconRender = (props: { group?: string }) => {
  const { group = '' } = props;
  switch (group) {
    case 'cs':
      return <EventPropertyOutlined />;
    case 'ads':
      return <EventPropertyOutlined />;
    case 'page':
      return <PagePropertyOutlined />;
    case 'app':
      return <EventPropertyOutlined />;
    case 'event':
      return <EventPropertyOutlined />;
    case 'item':
      return <ItemPropertyOutlined />;
    case 'people':
      return <PagePropertyOutlined />;
    case 'visitor':
      return <EventPropertyOutlined />;
    case 'element':
      return <ElementPropertyOutlined />;
    case 'conversion':
      return <PagePropertyOutlined />;
    case 'user':
      return <UserPropertyOutlined />;
    case 'tag':
      return <TagOutlined />;
    case 'geo':
      return <GeoPropertyOutlined />;
    case 'device':
      return <DevicePropertyOutlined />;
    case 'origin':
      return <UserOriginOutlined />;
    default:
      return <></>;
  }
};
export default IconRender;
