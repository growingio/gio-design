import React from 'react';
import { Dropdown, Avatar, Link } from '@gio-design/components';
import '@gio-design/components/es/components/dropdown/style/index.css';
import image from '../../avatar/demo/Avatar.png';
import './index.less';

const renderAvatarContent = () => {
  return (
    <div className="avatar-content">
      <div className="avatar-content-info">
        <Avatar size="large">T</Avatar>
        <p className="avatar-content-info-name">TANGTANG</p>
        <p className="avatar-content-info-email">tangtang@growingio.com</p>
        <Link className="avatar-content-info-link" to="/account/personal_info">
          个人设置
        </Link>
      </div>
      <div className="avatar-content-version">
        <p className="avatar-content-version-title">版本信息</p>
        <p className="avatar-content-version-content">当前版本：V 2020.6.4</p>
      </div>
      <hr />
      <div className="avatar-content-logout">退出登录</div>
    </div>
  );
};

export default () => {
  return (
    <Dropdown overlay={renderAvatarContent}>
      <Avatar src={image}>1111</Avatar>
    </Dropdown>
  );
};
