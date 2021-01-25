/* eslint-disable no-console */
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Modal, { ModalProps, StepModalProps, StepModal } from './index';
import './style';
import { Button } from '../..';

export default {
  title: 'Components/Functional/Modal',
  component: Modal,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/ZIYRsKMYnXJBastapZCVKt/GrowingIO-Design-System?node-id=0%3A16184',
      allowFullscreen: true,
    },
  },
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

const StepModalTemplate: Story<StepModalProps> = (args) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [visible, setVisible] = useState(false);
  const steps = [
    {
      key: '1',
      content: '这是内容1',
      return: null,
    },
    {
      key: '2',
      content: '这是内容2',
      return: '1',
    },
    {
      key: '3',
      content: '这是内容3',
      return: '2',
    },
  ];
  return (
    <>
      <Button onClick={() => setVisible(true)}>Open StepModal</Button>
      <StepModal
        {...args}
        visible={visible}
        title="操作"
        onOk={() => setVisible(false)}
        steps={steps}
        onClose={() => setVisible(false)}
      />
    </>
  );
};

export const StepModalDemo = StepModalTemplate.bind({});
StepModalDemo.args = {
  title: '操作',
};
