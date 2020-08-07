import React, { useContext } from 'react';
import Avatar from './Avatar';
import classNames from 'classnames';
import { AvatarGroupProps, UserAvatarType } from './interface';
import { ConfigContext } from '../config-provider';
import _ from 'lodash';

const AvatarGroup: React.FC<AvatarGroupProps> = (props: AvatarGroupProps) => {
  const { number = 5, users = [], className, placement = 'bottom' } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('avatar');

  let children = null;
  const renderAvatarGroup = (users: UserAvatarType[]) =>
    users.map((user, idx) => (
      <Avatar key={idx} {...user} displayTooltip={true} placement={placement}>
        {user.name}
      </Avatar>
    ));
  const renderAvatarRest = (users: UserAvatarType[]) => (
    <Avatar className={`${prefixCls}-rest`} omit={false}>{`+${users.length}`}</Avatar>
  );
  const classString = classNames(className, `${prefixCls}-group`);

  if (users.length === 0) {
    children = null;
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

  return <div className={classString}>{children}</div>;
};
export default AvatarGroup;
