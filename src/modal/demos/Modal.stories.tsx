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
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};
Default.args = {
  title: 'Dialog Title',
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
      >
        <div>本次修改将同时影响该分析所在的其他 20 个看板，是否直接保存修改？或者您可对其进行另存。</div>
      </Modal>
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
      >
        <div>本次修改将同时影响该分析所在的其他 20 个看板，是否直接保存修改？或者您可对其进行另存。</div>
      </Modal>
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

export const Imperative = () => (
  <Button
    type="secondary"
    onClick={() =>
      Modal.open({
        title: '弹窗标题',
        content: 'Confirm content',
      })
    }
  >
    Open Modal
  </Button>
);

export const NestedChild = () => {
  const [modalFuncs, hookModal] = Modal.useModal();
  const child = () => (
    <>
      <div>弹窗内容</div>
      <Button
        onClick={() => {
          Modal.open({
            title: '子弹窗标题',
            content: '子弹窗内容',
            afterClose: () => {
              action('afterClose')('子弹窗关闭');
            },
            onClose: () => {
              action('onClose')('子弹窗关闭');
            },
          });
        }}
      >
        open child Modal
      </Button>
    </>
  );
  const handleConfirm = () => {
    modalFuncs.open({
      title: '弹窗标题',
      onClose: () => {
        action('onClose')('父弹窗关闭');
      },
      afterClose: () => {
        action('afterClose')('父弹窗关闭');
      },
      content: child(),
    });
  };

  return (
    <>
      <Button type="secondary" onClick={() => handleConfirm()}>
        Open Modal
      </Button>
      {hookModal}
    </>
  );
};
export const DestroyAllFn = () => {
  const showModal = () => {
    for (let i = 0; i < 3; i += 1) {
      setTimeout(() => {
        Modal.open({
          title: `Modal title ${i}`,
          content: (
            <Button
              onClick={() => {
                Modal.destroyAll();
              }}
            >
              Click to destroy all
            </Button>
          ),
          onOk() {
            action('destroyAllFn')('OK');
          },
          onClose() {
            action('destroyAllFn')('onClose');
          },
        });
      }, i * 500);
    }
  };
  return <Button onClick={showModal}>Show Modals</Button>;
};
export const ManualClose = () => {
  const countDown = () => {
    let secondsToGo = 5;

    const modal = Modal.open({
      title: 'This is a notification message',
      content: `This modal will be destroyed after ${secondsToGo} second.`,
      onClose: () => {
        action('countDown')('onClose');
      },
      afterClose: () => {
        action('countDown')('afterClose');
      },
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      if (secondsToGo <= 0) {
        clearInterval(timer);
        modal.destroy();
      } else {
        modal.update({
          content: `This modal will be destroyed after ${secondsToGo} second.`,
        });
      }
    }, 1000);
  };
  return (
    <Button type="secondary" onClick={countDown}>
      Open Modal to close in 5 seconds
    </Button>
  );
};
