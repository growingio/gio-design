import React, { useContext } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Avatar from './Avatar';
import { AvatarGroupProps, UserAvatarType } from './interface';
import { ConfigContext } from '../config-provider';

const AvatarGroup: React.FC<AvatarGroupProps> = (props: AvatarGroupProps) => {
  const { number = 5, users = [], className, placement = 'bottom', style, displayTooltip = true } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('avatar');

  let children = null;
  const renderAvatarGroup = (users: UserAvatarType[]) =>
    users.map((user, idx) => (
      <Avatar key={idx} displayTooltip={displayTooltip} placement={placement} {...user}>
        {user.name}
      </Avatar>
    ));
  const renderAvatarRest = (users: UserAvatarType[]) => (
    <Avatar className={`${prefixCls}-rest`} omit={false}>{`+${users.length}`}</Avatar>
  );
  const classString = classNames(className, `${prefixCls}-group`);

  if (users.length === 0) {
    return null;
  } else if (users.length <= number) {
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
