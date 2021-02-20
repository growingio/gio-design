/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import classNames from 'classnames';
import { LoadingOutlined } from '@gio-design/icons';
import { ConfigContext } from '../config-provider';
import SizeContext from '../config-provider/SizeContext';
import { ButtonProps } from './interfaces';
import { cloneElement } from '../../utils/reactNode';
import usePrefixCls from '../../utils/hooks/use-prefix-cls';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function isString(str: unknown) {
  return typeof str === 'string';
}

function insertSpace(child: React.ReactChild, needInserted: boolean) {
  if (child === null || child === undefined) {
    return null;
  }
  const SPACE = needInserted ? ' ' : '';
  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    isString(child.type) &&
    isTwoCNChar(child.props.children)
  ) {
    return cloneElement(child, {
      children: child.props.children.split('').join(SPACE),
    });
  }
  if (typeof child === 'string') {
    if (isTwoCNChar(child)) {
      return <span>{child.split('').join(SPACE)}</span>;
    }
    return <span>{child}</span>;
  }
  return child;
}

function spaceChildren(children: React.ReactNode, needInserted: boolean) {
  let isPrevChildPure = false;
  const childList: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    const type = typeof child;
    const isCurrentChildPure = type === 'string' || type === 'number';
    if (isPrevChildPure && isCurrentChildPure) {
      const lastIndex = childList.length - 1;
      const lastChild = childList[lastIndex];
      childList[lastIndex] = `${lastChild}${child}`;
    } else {
      childList.push(child);
    }

    isPrevChildPure = isCurrentChildPure;
  });

  return React.Children.map(childList, (child) => insertSpace(child as React.ReactChild, needInserted));
}

interface CompoundedComponent extends React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLElement>> {
  __GIO_BUTTON: boolean;
}

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const {
    loading,
    prefixCls: customizePrefixCls,
    type = 'primary',
    size: customizeSize,
    className,
    children,
    icon,
    ghost,
    block,
    mini,
    ...rest
  } = props;

  const size = React.useContext(SizeContext);
  const [innerLoading, setLoading] = React.useState<boolean | undefined>(loading);
  const [hasTwoCNChar, setHasTwoCNChar] = React.useState(false);
  const { autoInsertSpaceInButton } = React.useContext(ConfigContext);
  const prefixCls = usePrefixCls('btn', customizePrefixCls);
  const buttonRef = (ref as any) || React.createRef<HTMLElement>();

  const isNeedInserted = () => React.Children.count(children) === 1 && !icon;

  const fixTwoCNChar = () => {
    if (!buttonRef || !buttonRef.current || autoInsertSpaceInButton === false) {
      return;
    }
    const buttonText = buttonRef.current.textContent;

    if (isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!hasTwoCNChar) {
        setHasTwoCNChar(true);
      }
    } else if (hasTwoCNChar) {
      setHasTwoCNChar(false);
    }
  };

  React.useEffect(() => {
    setLoading(loading);
  }, [loading]);

  React.useEffect(() => {
    fixTwoCNChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonRef]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props;
    if (innerLoading) {
      return;
    }
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e);
    }
  };

  const autoInsertSpace = autoInsertSpaceInButton !== false;

  const iconType = innerLoading ? 'loading' : icon;
  const sizeCls = mini && !!(!children && children !== 0 && iconType) ? 'mini' : customizeSize || size;

  const classes = classNames(prefixCls, className, {
    [`${prefixCls}-${type}`]: type,
    [`${prefixCls}-${sizeCls}`]: sizeCls,
    [`${prefixCls}-icon-only`]: !children && children !== 0 && iconType,
    [`${prefixCls}-background-ghost`]: ghost,
    [`${prefixCls}-loading`]: innerLoading,
    [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace,
    [`${prefixCls}-block`]: block,
  });

  let iconNode = null;

  if (icon && !innerLoading) {
    iconNode = icon;
  } else if (innerLoading) {
    iconNode = <LoadingOutlined rotating />;
  }

  const kids = children || children === 0 ? spaceChildren(children, isNeedInserted() && autoInsertSpace) : null;

  const { htmlType, ...otherProps } = rest;
  const buttonNode = (
    // eslint-disable-next-line react/button-has-type
    <button {...otherProps} ref={buttonRef} type={htmlType} className={classes} onClick={handleClick}>
      {iconNode}
      {kids}
    </button>
  );

  return buttonNode;
};

export const Button = React.forwardRef<unknown, ButtonProps>(InternalButton) as CompoundedComponent;

Button.defaultProps = {
  loading: false,
  ghost: false,
  block: false,
  htmlType: 'button' as ButtonProps['htmlType'],
};

Button.displayName = 'Button';

// eslint-disable-next-line no-underscore-dangle
Button.__GIO_BUTTON = true;

export default Button;
