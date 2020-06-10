import * as React from 'react';
import Block from '../../../utils/Block';

interface P {
  label: React.ReactNode;
}

const OptionGroup: React.FC<P> = ({ children, label }) => (
  <Block classNames={['gio-option-group']}>
    <div className='gio-option-group-label'>{label}</div>
    {children}
  </Block>
);

export default OptionGroup;
