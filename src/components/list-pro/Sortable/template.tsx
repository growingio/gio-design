import React from 'react';
import classnames from 'classnames';
import { noop, pick, get } from 'lodash';
import { DragMove, CloseCircleFilled } from '@gio-design/icons';
import { withConfigConsumer, ConfigConsumerProps } from '../../config-provider';

const bemClsFactor = (blockName: string) => (elemName?: string, modifierName?: string) => {
  const elemName_ = elemName ? `__${elemName}` : '';
  const modifierName_ = modifierName ? `--${modifierName}` : '';
  return `${blockName}${elemName_}${modifierName_}`;
};

const cls = bemClsFactor('pa_sider-selected-item');

interface SiderSelectedItemProps {
  onRemove: (sortData: any) => void;
  selected?: string;
  collapsed?: boolean;
  onSelect?: (item: any) => void;
  prefixCls?: string;
  [key: string]: any;
}

class SiderSelectedItem extends React.PureComponent<SiderSelectedItemProps & ConfigConsumerProps, any> {
  public static defaultProps = {
    onRemove: noop,
  };

  public constructor(props: SiderSelectedItemProps & ConfigConsumerProps) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      visible: false,
    };
  }

  public render() {
    const { className, sortData: item = {} } = this.props;
    const { props } = this;
    const classNames = classnames(`${props.prefixCls}-option`, cls(), {
      indented: props.indented,
      selected: item.value === props.selected,
      collapsed: props.collapsed,
      [className]: !!className,
      [`v-${item.value}`]: true,
    });

    return (
      <div
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...pick(props, ['onDragStart', 'onMouseEnter', 'onMouseLeave'])}
        className={classNames}
        onClick={() => {
          if (props.onSelect) {
            props.onSelect(item);
          }
        }}
        aria-hidden="true"
      >
        {get(item, 'canDrag') !== false && (
          <IconCircle className={classnames({ selected: item.value === props.selected, collapsed: props.collapsed })}>
            <DragMove size='14px' className="icon-drag" />
          </IconCircle>
        )}

        {props.collapsed ? null : (
          <span className={classnames(cls('name-wrap'))}>
            <span className={classnames(cls('name'), { selected: item.value === props.selected })} title={item.name}>
              {item.label}
            </span>
          </span>
        )}

        <span
          onClick={(e) => e.stopPropagation()}
          className={classnames('dh-can-remove', {
            collapsed: props.collapsed,
          })}
          aria-hidden="true"
        >
          <CloseCircleFilled size="14px" color="#313E75" />
        </span>
      </div>
    );
  }
}

const IconCircle = (props: any) => {
  const { className, scaled, children } = props;
  const classNames = classnames('pa-sider-icon-circle', className, {
    scaled, // 利用 transform scale 解决 font-size < 12 的问题
  });

  return <span className={classNames}>{children}</span>;
};

export default withConfigConsumer<SiderSelectedItemProps>({ subPrefixCls: 'select' })(SiderSelectedItem);
