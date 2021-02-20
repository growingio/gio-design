import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import Steps, { StepsProps, Step } from '.';
import Docs from './Steps.mdx';
import './style';
import './style/steps.stories.less';
import { Drawer, Button, Toast, Modal } from '../..';

export default {
  title: 'Functional Components/Steps',
  component: Steps,
  subcomponents: { Step },
  parameters: {
    docs: {
      page: Docs,
    },
  },
} as Meta;

const PageStepsTemplate: Story<StepsProps> = (args) => {
  const [current, setCurrent] = React.useState(0);
  const [finished, setFinished] = React.useState([false, false, false]);

  const next = () => {
    finished[current] = true;
    setFinished([...finished]);
    setCurrent(current + 1);
  };
  const previous = () => {
    setCurrent(current - 1);
  };
  const done = () => {
    finished[current] = true;
    setFinished([...finished]);
    Toast.success('操作成功！');
  };
  return (
    <div style={{ maxWidth: '1200px' }}>
      <Steps
        {...args}
        current={current}
        onClick={(stepNumber) => {
          finished[current] = true;
          setFinished([...finished]);
          setCurrent(stepNumber);
        }}
      >
        <Step key="1" title="标题 1" description="描述信息 1" finished={finished[0]} />
        <Step key="2" title="标题 2" description="描述信息 2" finished={finished[1]} />
        <Step key="3" title="标题 3" description="描述信息 3" finished={finished[2]} />
      </Steps>
      <div className="steps-content">{`Content ${current + 1}`}</div>
      <div className="steps-action">
        {current > 0 && (
          <Button type="secondary" className="previous-btn" onClick={previous}>
            上一步
          </Button>
        )}
        {current < 2 && (
          <Button type="primary" className="next-btn" onClick={next}>
            下一步
          </Button>
        )}
        {current === 2 && (
          <Button className="done-btn" type="primary" onClick={done}>
            完成
          </Button>
        )}
      </div>
    </div>
  );
};
export const PageSteps = PageStepsTemplate.bind({});
PageSteps.args = {};

const SmallModalStepsTemplate: Story<StepsProps> = (args) => {
  const [visible, setVisible] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [finished, setFinished] = React.useState([false, false]);

  const next = () => {
    finished[current] = true;
    setFinished([...finished]);
    setCurrent(current + 1);
  };
  const previous = () => {
    setCurrent(current - 1);
  };
  const done = () => {
    finished[current] = true;
    setFinished([...finished]);
    Toast.success('操作成功！');
  };

  const modalFooter = (
    <div className="steps-action">
      {current > 0 && (
        <Button type="secondary" className="previous-btn" onClick={previous}>
          上一步
        </Button>
      )}
      {current < 1 && (
        <Button type="primary" className="next-btn" onClick={next}>
          下一步
        </Button>
      )}
      {current === 1 && (
        <Button className="done-btn" type="primary" onClick={done}>
          完成
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Small Modal</Button>
      <Modal
        destroyOnClose
        size="small"
        visible={visible}
        title="操 作"
        onClose={() => {
          setVisible(false);
          setCurrent(0);
          setFinished([false, false]);
        }}
        footer={modalFooter}
      >
        <div>
          <Steps
            {...args}
            current={current}
            size="small"
            type="modal"
            onClick={(stepNumber) => {
              finished[current] = true;
              setFinished([...finished]);
              setCurrent(stepNumber);
            }}
          >
            <Step key="1" title="标题 1" description="描述信息 1" finished={finished[0]} />
            <Step key="2" title="标题 2" description="描述信息 2" finished={finished[1]} />
          </Steps>
          <div className="steps-content">{`Content ${current + 1}`}</div>
        </div>
      </Modal>
    </>
  );
};

export const SmallModalSteps = SmallModalStepsTemplate.bind({});
SmallModalSteps.args = {};

const MiddleModalStepsTemplate: Story<StepsProps> = (args) => {
  const [visible, setVisible] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [finished, setFinished] = React.useState([false, false, false]);

  const next = () => {
    finished[current] = true;
    setFinished([...finished]);
    setCurrent(current + 1);
  };
  const previous = () => {
    setCurrent(current - 1);
  };
  const done = () => {
    finished[current] = true;
    setFinished([...finished]);
    Toast.success('操作成功！');
  };

  const modalFooter = (
    <div className="steps-action">
      {current > 0 && (
        <Button type="secondary" className="previous-btn" onClick={previous}>
          上一步
        </Button>
      )}
      {current < 2 && (
        <Button type="primary" className="next-btn" onClick={next}>
          下一步
        </Button>
      )}
      {current === 2 && (
        <Button className="done-btn" type="primary" onClick={done}>
          完成
        </Button>
      )}
    </div>
  );

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Middle Modal</Button>
      <Modal
        destroyOnClose
        size="middle"
        visible={visible}
        title="操 作"
        onClose={() => {
          setVisible(false);
          setCurrent(0);
          setFinished([false, false, false]);
        }}
        footer={modalFooter}
      >
        <div>
          <Steps
            {...args}
            current={current}
            size="middle"
            type="modal"
            onClick={(stepNumber) => {
              finished[current] = true;
              setFinished([...finished]);
              setCurrent(stepNumber);
            }}
          >
            <Step key="1" title="标题 1" description="描述信息 1" finished={finished[0]} />
            <Step key="2" title="标题 2" description="描述信息 2" finished={finished[1]} />
            <Step key="3" title="标题 3" description="描述信息 3" finished={finished[2]} />
          </Steps>
          <div className="steps-content">{`Content ${current + 1}`}</div>
        </div>
      </Modal>
    </>
  );
};

export const MiddleModalSteps = MiddleModalStepsTemplate.bind({});
MiddleModalSteps.args = {};

const DrawerStepsTemplate: Story<StepsProps> = (args) => {
  const [visible, setVisible] = React.useState(false);
  const [current, setCurrent] = React.useState(0);
  const [finished, setFinished] = React.useState([false, false]);
  const next = () => {
    finished[current] = true;
    setFinished([...finished]);
    setCurrent(current + 1);
  };
  const previous = () => {
    setCurrent(current - 1);
  };
  const done = () => {
    finished[current] = true;
    setFinished([...finished]);
    Toast.success('操作成功！');
  };

  const drawerFooter = (
    <div className="steps-action">
      {current > 0 && (
        <Button type="secondary" className="previous-btn" onClick={previous}>
          上一步
        </Button>
      )}
      {current < 1 && (
        <Button type="primary" className="next-btn" onClick={next}>
          下一步
        </Button>
      )}
      {current === 1 && (
        <Button className="done-btn" type="primary" onClick={done}>
          完成
        </Button>
      )}
    </div>
  );
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open Drawer
      </Button>
      <Drawer
        closable
        destroyOnClose
        mask
        title="操 作"
        placement="right"
        visible={visible}
        footer={drawerFooter}
        onClose={() => {
          setVisible(false);
          setCurrent(0);
          setFinished([false, false]);
        }}
      >
        <div style={{ width: '100%', height: '100%', padding: '16px' }}>
          <Steps
            {...args}
            current={current}
            type="drawer"
            onClick={(stepNumber) => {
              finished[current] = true;
              setFinished([...finished]);
              setCurrent(stepNumber);
            }}
          >
            <Step key="1" title="标题 1" description="描述信息 1" finished={finished[0]} />
            <Step key="2" title="标题 2" description="描述信息 2" finished={finished[1]} />
          </Steps>
          <div className="steps-content">{`Content ${current + 1}`}</div>
        </div>
      </Drawer>
    </>
  );
};
export const DrawerSteps = DrawerStepsTemplate.bind({});
DrawerSteps.args = {};
