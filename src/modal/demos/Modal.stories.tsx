/* eslint-disable no-console */
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { PlusCircleFilled } from '@gio-design/icons';
import { action } from '@storybook/addon-actions';
import Modal from '../index';
import Button from '../../button';
import { ModalProps, IModalStaticFuncConfig } from '../interface';
import Docs from './ModalPage';
import '../style';

export default {
  title: 'Upgraded/Modal',
  component: Modal,
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

export const Default: Story<ModalProps> = (args) => {
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
      />
    </div>
  );
};

export const CustomButton: Story<ModalProps> = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        title="customTitle"
        confirmLoading
        okText="customText"
        cancelText="customText"
        okType="text"
        closeIcon={<PlusCircleFilled />}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export const OnCloseAndOnOk: Story<ModalProps> = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        afterClose={action('afterClose')}
        visible={visible}
        onClose={() => {
          action('OK');
          setVisible(false);
        }}
        onOk={() => {
          action('Close');
          setVisible(false);
        }}
      />
    </div>
  );
};

export const FixedTemplate: Story<ModalProps> = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        title="弹窗标题"
        size="fixed"
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

export const FixedWidthDemo: Story<ModalProps> = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        title="弹窗标题"
        size="fixed"
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export const WidthAuto: Story<ModalProps> = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        title="弹窗标题"
        size="normal"
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export const FullModal: Story<ModalProps> = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        title="弹窗标题"
        size="full"
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        onOk={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export const HeightOverflowModal: Story<ModalProps> = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        title="弹窗标题"
        size="fixed"
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

export const UseModal: Story<IModalStaticFuncConfig> = () => {
  const [modalFuncs, hookModal] = Modal.useModal();
  const handleConfirm = () => {
    modalFuncs.open({
      title: '弹窗标题',
      content: 'Confirm content',
    });
  };

  return (
    <>
      <Button type="secondary" onClick={() => handleConfirm()}>
        Open Modal Hook
      </Button>
      {hookModal}
    </>
  );
};
