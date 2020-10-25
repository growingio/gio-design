import React, { Component } from 'react';
import classNames from 'classnames';
import raf from 'raf';
import { SelectProps } from './interface';

const scrollTo = (element: HTMLElement, to: number, duration: number) => {
  // jump to target if duration zero
  if (duration <= 0) {
    raf(() => {
      // eslint-disable-next-line no-param-reassign
      element.scrollTop = to;
    });
    return;
  }
  const difference = to - element.scrollTop;
  const perTick = (difference / duration) * 10;

  raf(() => {
    // eslint-disable-next-line no-param-reassign
    element.scrollTop += perTick;
    if (element.scrollTop === to) return;

    scrollTo(element, to, duration - 10);
  });
};

interface SelectState {
  active: boolean;
}
class Select extends Component<SelectProps, SelectState> {
  public constructor(s: SelectProps) {
    super(s);
    this.state = {
      active: false,
    };
  }

  public static state = {
    active: false,
  };

  public list: any;

  public root: any;

  public componentDidMount() {
    // jump to selected option
    this.scrollToSelected(0);
  }

  public componentDidUpdate(prevProps: SelectProps) {
    const { selectedIndex } = this.props;
    // smooth scroll to selected option
    if (prevProps.selectedIndex !== selectedIndex) {
      this.scrollToSelected(120);
    }
  }

  private onSelect = (value: any) => {
    const { onSelect, type } = this.props;
    onSelect(type, value);
  };

  private getOptions() {
    const { options, selectedIndex, prefixCls, onEsc } = this.props;
    return options.map((item, index) => {
      const cls = classNames({
        [`${prefixCls}-select-option-selected`]: selectedIndex === index,
        [`${prefixCls}-select-option-disabled`]: item.disabled,
      });
      const onClick = item.disabled
        ? undefined
        : () => {
            this.onSelect(item.value);
          };
      const onKeyDown = (e: any) => {
        if (e.keyCode === 13) {
          onClick && onClick();
        } else if (e.keyCode === 27) {
          onEsc && onEsc();
        }
      };

      const disprops = { disabled: item.disabled };
      return (
        <li
          role="button"
          onClick={onClick}
          className={cls}
          key={index}
          tabIndex={0}
          onKeyDown={onKeyDown}
          {...disprops}
        >
          {item.value}
        </li>
      );
    });
  }

  private handleMouseEnter = (e: any) => {
    const { onMouseEnter } = this.props;
    this.setState({ active: true });
    onMouseEnter(e);
  };

  private handleMouseLeave = () => {
    this.setState({ active: false });
  };

  private saveRoot = (node: HTMLDivElement) => {
    this.root = node;
  };

  private saveList = (node: HTMLUListElement) => {
    this.list = node;
  };

  private scrollToSelected(duration: number) {
    // move to selected item
    const { selectedIndex } = this.props;
    if (!this.list) {
      return;
    }
    let index = selectedIndex;
    if (index < 0) {
      index = 0;
    }
    const topOption = this.list.children[index];
    const to = topOption.offsetTop - 8;
    scrollTo(this.root, to, duration);
  }

  public render() {
    const { prefixCls, options } = this.props;
    const { active } = this.state;

    if (options.length === 0) {
      return null;
    }
    const cls = classNames(`${prefixCls}-select`, {
      [`${prefixCls}-select-active`]: active,
    });
    return (
      <div
        className={cls}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        ref={this.saveRoot}
      >
        <ul ref={this.saveList}>{this.getOptions()}</ul>
      </div>
    );
  }
}

export default Select;
