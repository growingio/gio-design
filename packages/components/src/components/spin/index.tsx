import React from 'react';
import { Spin as AntSpin } from 'antd';
import { SpinProps } from 'antd/lib/spin';
import classnames from 'classnames';

export type Props = SpinProps;

const Spin: React.FC<Props> = (props) => <AntSpin {...props} className={classnames('gio-spin', props.className)} />;

export default Spin;
