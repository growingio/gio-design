import React, { useRef } from 'react';
import WithRef, { CommonPropsWithRef } from '../withRef';

type InternalButton = typeof Button;

interface RefButton extends InternalButton {
  SubButton: InternalButton;
}

const InnerButton: React.FC<CommonPropsWithRef<React.HTMLProps<HTMLButtonElement>, HTMLButtonElement>> = (props) => {
  const { forwardRef, children } = props;
  return (
    <button type="button" ref={forwardRef}>
      {children}
    </button>
  );
};
const ButtonItem: React.FC<React.HTMLProps<HTMLButtonElement>> = () => <button type="button">subButton</button>;

const Button = WithRef<HTMLButtonElement, React.HTMLProps<HTMLButtonElement>, React.ReactNode>(InnerButton, {
  SubButton: ButtonItem,
});

export const Demo = () => {
  const ref = useRef(document.querySelector('button'));

  const { SubButton } = Button as unknown as RefButton;

  return (
    <div>
      <Button ref={ref} type="button">
        ButtonWithRef
      </Button>
      <SubButton />
    </div>
  );
};

export default {
  title: 'utils/TextWithRef',
  component: Demo,
};
