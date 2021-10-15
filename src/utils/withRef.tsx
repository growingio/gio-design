import React, { CSSProperties } from 'react';

export interface RefWrapperProps<T> {
  forwardedRef?: React.Ref<T>;
}

type PropsWithChildren<P> = P & { children?: React.ReactNode };

type PropsWithStyle<P> = P & { style?: CSSProperties };

type PropsWithClassname<P> = P & { classname?: string };

type PropsWithForwardRef<T, P> = P & { forwardRef?: React.Ref<T> };

type CommonProps<T, P> = PropsWithForwardRef<T, PropsWithChildren<PropsWithClassname<PropsWithStyle<P>>>>;

type PropsWithRef<P, T> = P & { ref: React.MutableRefObject<T> };

export type CommonPropsWithRef<P, T> = PropsWithRef<CommonProps<T, P>, T>;

interface ComponentInterface<P> {
  defaultProps: Partial<P>;
}

function WithRef<T, P, I>(OptComponent: React.FC<CommonProps<T, RefWrapperProps<T>>>, dependencies?: I) {
  const RefWrapper: React.FC<CommonProps<T, P>> = (props) => {
    const { forwardRef, ...rest } = props;
    return <OptComponent {...rest} ref={forwardRef} />;
  };

  const ForwardRefComponent = React.forwardRef<T, P>((props, ref) => <RefWrapper {...props} forwardedRef={ref} />);

  type InternalComponentProps = typeof ForwardRefComponent;

  const Component = ForwardRefComponent as ComponentInterface<P> & InternalComponentProps & I & Record<string, any>;
  function moveProperty(
    deps: typeof dependencies & Record<string, any>,
    res: typeof ForwardRefComponent & Record<string, any>
  ) {
    Object.keys(deps).forEach((key: string) => {
      res[key] = deps[key];
    });
    return res;
  }

  return moveProperty(dependencies as Record<string, any>, Component);
}

export default WithRef;
