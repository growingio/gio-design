import * as React from 'react';
import { Select as AntSelect } from 'antd';
import { SelectProps } from 'antd/lib/select';
import classnames from 'classnames';
import Icon from '@gio-design/icon';
import isContain from '../../utils/pinyinHelper';
import { blurActiveElement } from '../../utils/helpers';

export const OptGroup = AntSelect.OptGroup;
export const Option = AntSelect.Option;

interface Props extends SelectProps {
  isAutoBlurAfterSelect?: boolean;
  type?: 'ghost';
}

const filterOption = (input: string, child: any): boolean => {
  const option = child.props.children || '';
  return isContain(option.toString(), input);
};

export default class Select extends React.Component<Props, {}> {
  public static OptGroup: any;
  public static Option: any;
  public static blur: () => void;
  public static focus: () => void;

  public render() {
    const {
      children,
      className,
      dropdownClassName,
      isAutoBlurAfterSelect = false,
      onChange,
      onSelect,
      type,
      ...props
    } = this.props;

    let _props = { ...props, onChange, onSelect };

    if (isAutoBlurAfterSelect) {
      const blurAfterOnChange = (...args: any[]) => {
        blurActiveElement();
        if (typeof onChange === 'function') {
          onChange.apply(null, args);
        }
      };

      const blurAfterOnSelect = (...args: any[]) => {
        blurActiveElement();
        if (typeof onSelect === 'function') {
          onSelect.apply(null, args);
        }
      };

      _props = { ...props, onChange: blurAfterOnChange, onSelect: blurAfterOnSelect };
    }

    return (
      <AntSelect
        className={classnames('gio-select', className, {
          [`gio-select-${type}`]: type,
        })}
        dropdownClassName={classnames('gio-select-dropdown', dropdownClassName)}
        filterOption={filterOption}
        {..._props}
        suffixIcon={<Icon type='down' />}
      >
        {children}
      </AntSelect>
    );
  }
}

Select.OptGroup = AntSelect.OptGroup;
Select.Option = AntSelect.Option;
Select.blur = (AntSelect as any).blur;
Select.focus = (AntSelect as any).focus;
