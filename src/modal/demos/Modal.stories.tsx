/* eslint-disable no-console */
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Modal from '../index';
import Button from '../../button';
import { ModalProps, IModalStaticFuncConfig } from '../interface';
import Docs from './ModalPage';
import '../style';

export default {
  title: 'Upgraded/Modal',
  component: Modal,
  docs: {
    page: Docs,
  },
} as Meta;

const Template: Story<ModalProps> = (args) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        {...args}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      >
        宽度自动撑开 宽度自动撑开 宽度自动撑开 宽度自动撑开 宽度自动撑开 宽度自动撑开 宽度自动撑开 宽度自动撑开
        宽度自动撑开 宽度自动撑开 宽度自动撑开 宽度自动撑开 宽度自动撑开 宽度自动撑开 宽度自动撑开 宽度自动撑开
      </Modal>
    </div>
  );
};
export const AdaptiveWidthDemo = Template.bind({});
AdaptiveWidthDemo.args = {
  title: '弹窗标题',
};

const FixedTemplate: Story<ModalProps> = (args) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        {...args}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      >
        宽度固定500 宽度固定500 宽度固定500 宽度固定500 宽度固定500 宽度固定500 宽度固定500 宽度固定500
      </Modal>
    </div>
  );
};

export const FixedWidthDemo = FixedTemplate.bind({});
FixedWidthDemo.args = {
  title: '弹窗标题',
  size: 'fixed',
};

export const FullModal = Template.bind({});
FullModal.args = {
  title: '弹窗标题',
  size: 'full',
};

const HeightOverflowModalTemplate: Story<ModalProps> = (args) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        {...args}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      >
        <div style={{ height: '2000px', background: '#E3FFF0' }}>
          HeightOverflowModalTemplate HeightOverflowModalTemplate
        </div>
      </Modal>
    </div>
  );
};

export const HeightOverflowModal = HeightOverflowModalTemplate.bind({});
HeightOverflowModal.args = {
  title: '弹窗标题',
  size: 'fixed',
};

const ConfirmTemplate: Story<ModalProps> = () => (
  <div>
    <Button
      onClick={() => {
        Modal.open({
          title: '弹窗标题',
          content: 'Some descriptions',
          size: 'fixed',
          onOk() {
            console.log('OK');
          },
          onClose() {
            console.log('Cancel');
          },
        });
      }}
    >
      Open Modal
    </Button>
  </div>
);
export const OpenModal = ConfirmTemplate.bind({});
OpenModal.args = {
  title: '弹窗标题',
};

const UseModalTemplate: Story<IModalStaticFuncConfig> = (args) => {
  const [modalFuncs, hookModal] = Modal.useModal();
  const handleConfirm = () => {
    modalFuncs.open({
      ...args,
      title: '弹窗标题',
      content: 'Confirm content',
    });
  };

  return (
    <>
      <Button type="secondary" onClick={() => handleConfirm()}>
        open
      </Button>
      {hookModal}
    </>
  );
};

export const UseModal = UseModalTemplate.bind({});
UseModal.args = {};
