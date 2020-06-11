import React, { PureComponent, ReactNode } from 'react';

import { noop } from 'lodash';
import Checkbox from '../../checkbox';
import Gap from '../../../utils/gap';
import Block from '../../../utils/Block';
import Ellipsis from '../../../utils/Ellipsis';
import Margin from '../../../utils/Margin';

interface P {
  checked?: boolean;
  onClick?: (x: any) => void;
  value: any;
  className?: string;
  disabled?: boolean;
  bottom?: number;
  title?: ReactNode;
}

class CheckOption extends PureComponent<P> {
  public render() {
    const { checked, children, className, disabled = false, bottom, title } = this.props;
    return (
      <Margin bottom={bottom}>
        <Block
          onClick={this.handleChange}
          left={15}
          classNames={[
            'gio-check-option',
            {
              'gio-check-option--checked': checked,
            },
            {
              'gio-check-option--disabled': disabled,
            },
            className,
          ]}
        >
          <Ellipsis title={title}>
            <Checkbox checked={checked} onChange={noop} disabled={disabled} />
            <Gap width={3} />
            {children}
          </Ellipsis>
        </Block>
      </Margin>
    );
  }
  private handleChange = () => {
    if (!this.props.onClick || this.props.disabled) {
      return;
    }
    this.props.onClick(this.props.value);
  };
}

export default CheckOption;
