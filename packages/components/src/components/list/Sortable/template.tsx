import React from 'react';
import classnames from 'classnames';
import { noop, pick, get } from 'lodash';
import { DragMove, CloseCircleFilled } from '@gio-design/icons';

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
  [key: string]: any;
}

export default class SiderSelectedItem extends React.PureComponent<SiderSelectedItemProps, any> {
  public static defaultProps = {
    onRemove: noop,
  };

  public constructor(props: SiderSelectedItemProps) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  public render() {
    const { sortData: item = {} } = this.props;
    const props = this.props;
    const className = classnames('gio-select-option', cls(), {
      indented: props.indented,
      selected: item.value === props.selected,
      collapsed: props.collapsed,
      [this.props.className]: !!this.props.className,
      [`v-${item.value}`]: true,
    });

    return (
      <div
        {...pick(props, ['onDragStart', 'onMouseEnter', 'onMouseLeave'])}
        className={className}
        onClick={() => {
          if (props.onSelect) {
            props.onSelect(item);
          }
        }}
      >
        {get(item, 'canDrag') !== false && (
          <IconCircle className={classnames({ selected: item.value === props.selected, collapsed: props.collapsed })}>
            <DragMove className="icon-drag" />
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
        >
          <CloseCircleFilled size="small" color="#5C4E61" />
        </span>
      </div>
    );
  }
}

const IconCircle = (props: any) => {
  const className = classnames('pa-sider-icon-circle', props.className, {
    scaled: props.scaled, // 利用 transform scale 解决 font-size < 12 的问题
  });

  return <span className={className}>{props.children}</span>;
};
