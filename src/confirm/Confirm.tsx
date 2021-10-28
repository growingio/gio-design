import React from 'react';
import Popover from '../popover/Popover';
import { ConfirmProps } from './interface';

const Confirm: React.FC<ConfirmProps> = (props) => {
  return (
    <Popover>
      <span>test</span>
    </Popover>
  );
};

export default Confirm;
