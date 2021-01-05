import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Modal, { ModalProps } from './index';
import './style';
import { Button } from '../..';

export default {
  title: 'Components/Functional/Modal',
  component: Modal,
} as Meta;

const showModal = (args: ModalProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        {...args}
        visible={args.visible ? args.visible : visible}
        onClose={() => {
          setVisible(false);
        }}
        onOk={() => console.log('ok')}
        afterClose={() => {
          console.log('');
        }}
      >
        Default Modal
      </Modal>
    </>
  );
};

const Template: Story<ModalProps> = (args) => <>{showModal(args)}</>;
export const Default = Template.bind({});
Default.args = {
  title: 'title',
};
