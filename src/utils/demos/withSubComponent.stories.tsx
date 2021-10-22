import React from 'react';
import withSubComponent from '../withSubComponent';
import { WithCommonProps } from '../interfaces';

interface DemoButtonProps {
  size?: string;
}

interface SubComponentProps {
  type?: string;
}

const InternalButton: React.FC<WithCommonProps<DemoButtonProps>> = ({ children }) => (
  <button type="button">{children}</button>
);

const SubComponent: React.FC<WithCommonProps<SubComponentProps>> = ({ type }) => <div>{type}</div>;

const Button = withSubComponent(InternalButton, { SubComponent });

export const Demo = () => (
  <div>
    <Button size="size">Button</Button>
    <Button.SubComponent type="sub component" />
  </div>
);

export default {
  title: 'utils/WithSubComponent',
  component: Demo,
};
