import * as React from 'react';
import Icon from '../icon';
import { noop } from 'lodash';
import Block from '../../utils/Block';
import Margin from '../../utils/Margin';

interface OptionProps {
  checked?: boolean;
  onClick?: (value: any) => void;
  value: any;
  disabled?: boolean;
  bottom?: number;
}

class Option extends React.PureComponent<OptionProps> {
  public static defaultProps: any;
  public render() {
    const { checked, children, disabled, bottom } = this.props;
    return (
      <Margin bottom={bottom}>
        <Block
          onClick={this.handleChange}
          left={15}
          classNames={[
            'gio-option',
            {
              'gio-option--checked': checked,
            },
            {
              'gio-option--diabled': disabled,
            },
          ]}
        >
          {children}
          {checked ? <Icon name='gicon-check1' fill='#F48267' /> : null}
        </Block>
      </Margin>
    );
  }
  private handleChange = () => {
    this.props.onClick && this.props.onClick(this.props.value);
  };
}

Option.defaultProps = {
  onClick: noop,
};

export default Option;
export { default as OptionGroup } from './OptionGroup';
export { default as CheckOption } from './CheckOption';
