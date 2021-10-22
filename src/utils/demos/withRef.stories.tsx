import React, { useRef } from 'react';
import withRef from '../withRef';
import withSubComponent from '../withSubComponent';
import { WithCommonProps } from '../interfaces';

interface DemoButtonProps {
  size?: string;
}

interface SubComponentProps {
  type?: string;
}

const InternalButton: React.ForwardRefRenderFunction<HTMLButtonElement, WithCommonProps<DemoButtonProps>> = (
  { children },
  ref
) => (
  <button ref={ref} type="button">
    {children}
  </button>
);

const SubComponent: React.FC<WithCommonProps<SubComponentProps>> = ({ type }) => <div>{type}</div>;

const Button = withSubComponent(withRef(InternalButton), { SubComponent });

export const Demo = () => {
  const ref = useRef(document.querySelector('button'));

  return (
    <div>
      <Button ref={ref} size="size">
        ButtonWithRef
      </Button>
      <Button.SubComponent type="sub component" />
    </div>
  );
};

export default {
  title: 'utils/WithRef',
  component: Demo,
};
