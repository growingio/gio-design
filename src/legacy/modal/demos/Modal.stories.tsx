/* eslint-disable no-console */
import React, { useContext, useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Modal, { ModalProps, StepModalProps, StepModal } from '../index';
import '../style';
import Button from '../../../legacy/button';
import { ConfigContext } from '../../config-provider';
import { IModalStaticFuncConfig } from '../interface';
import Docs from './ModalPage';

export default {
  title: 'Legacy/Modal',
  component: Modal,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/kP3A6S2fLUGVVMBgDuUx0f/GrowingIO-Design-Components?node-id=889%3A6757',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
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
      >
        Default Modal
      </Modal>
    </div>
  );
};
export const Default = Template.bind({});
Default.args = {
  title: 'title',
};

const CustomHeightTemplate: Story<ModalProps> = (args) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal
        {...args}
        style={{ top: 100, width: 500, margin: '0 auto' }}
        bodyStyle={{ height: 200 }}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      >
        {'Custom Height '.repeat(40)}
      </Modal>
    </div>
  );
};
export const CustomHeight = CustomHeightTemplate.bind({});
CustomHeight.args = {
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

const buttonStyle = {
  marginRight: 10,
};
const FunctionModalTemplate: Story<IModalStaticFuncConfig> = (args) => {
  const handleInfo = () => {
    Modal.info({
      ...args,
      title: 'Info',
      content: 'Info content',
    });
  };

  const handleSuccess = () => {
    Modal.success({
      ...args,
      title: 'Success',
      content: 'Success content',
    });
  };

  const handleWarn = () => {
    Modal.warn({
      ...args,
      title: 'Warn',
      content: 'Warn content',
    });
  };

  const handleError = () => {
    Modal.error({
      ...args,
      title: 'Error',
      content: 'Error content',
    });
  };
  return (
    <>
      <Button type="secondary" style={buttonStyle} onClick={() => handleInfo()}>
        Info
      </Button>
      <Button type="secondary" style={buttonStyle} onClick={() => handleSuccess()}>
        Success
      </Button>
      <Button type="secondary" style={buttonStyle} onClick={() => handleWarn()}>
        Warn
      </Button>
      <Button type="secondary" style={buttonStyle} onClick={() => handleError()}>
        Error
      </Button>
    </>
  );
};

export const FunctionModal = FunctionModalTemplate.bind({});
FunctionModal.args = {};

const UseModalTemplate: Story<IModalStaticFuncConfig> = (args) => {
  const [modalFuncs, hookModal] = Modal.useModal();
  const handleConfirm = () => {
    modalFuncs.confirm({
      ...args,
      title: 'Confirm',
      content: 'Confirm content',
    });
  };
  const handleInfo = () => {
    modalFuncs.info({
      ...args,
      title: 'Info',
      content: 'Info content',
    });
  };
  const handleSuccess = () => {
    modalFuncs.success({
      ...args,
      title: 'Success',
      content: 'Success content',
    });
  };
  const handleWarn = () => {
    modalFuncs.warn({
      ...args,
      title: 'Warn',
      content: 'Warn content',
    });
  };
  const handleError = () => {
    modalFuncs.error({
      ...args,
      title: 'Error',
      content: 'Error content',
    });
  };
  const context = useContext(ConfigContext);
  return (
    <ConfigContext.Provider value={{ ...context, rootPrefixCls: 'gio' }}>
      <>
        <Button type="secondary" style={buttonStyle} onClick={() => handleConfirm()}>
          confirm
        </Button>
        <Button type="secondary" style={buttonStyle} onClick={() => handleInfo()}>
          Info
        </Button>
        <Button type="secondary" style={buttonStyle} onClick={() => handleSuccess()}>
          Success
        </Button>
        <Button type="secondary" style={buttonStyle} onClick={() => handleWarn()}>
          Warn
        </Button>
        <Button type="secondary" style={buttonStyle} onClick={() => handleError()}>
          Error
        </Button>
        {hookModal}
      </>
    </ConfigContext.Provider>
  );
};

export const UseModal = UseModalTemplate.bind({});
UseModal.args = {};
