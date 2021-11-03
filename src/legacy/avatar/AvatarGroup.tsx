import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { usePrefixCls } from '@gio-design/utils';
import Avatar from './Avatar';
import { AvatarGroupProps, UserAvatarType } from './interfaces';

const AvatarGroup: React.FC<AvatarGroupProps> = (props: AvatarGroupProps) => {
  const { number = 5, users = [], className, placement = 'bottom', style, displayTooltip = true } = props;
  const prefixCls = usePrefixCls('avatar');

  let children = null;
  const renderAvatarGroup = (sliceUsers: UserAvatarType[]) =>
    sliceUsers.map((user) => (
      <Avatar key={user.name} displayTooltip={displayTooltip} placement={placement} {...user}>
        {user.name}
      </Avatar>
    ));
  const renderAvatarRest = (restUsers: UserAvatarType[]) => (
    <Avatar className={`${prefixCls}-rest`} omit={false}>{`+${restUsers.length}`}</Avatar>
  );
  const classString = classNames(className, `${prefixCls}-group`);

  if (users.length === 0) {
    return null;
  }
  if (users.length <= number) {
    children = renderAvatarGroup(users);
  } else {
    const sliceUsers = _.slice(users, 0, number - 1);
    const restUsers = _.slice(users, number - 1, users.length);
    children = (
      <>
        {renderAvatarGroup(sliceUsers)}
        {renderAvatarRest(restUsers)}
      </>
    );
  }

  return (
    <div className={classString} style={style}>
      {children}
    </div>
  );
};
export default AvatarGroup;
