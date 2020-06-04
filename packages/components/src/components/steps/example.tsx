import * as React from 'react';
import { Button, message } from 'antd';
import Steps, { Step } from './index';

const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

class StepsExample extends React.Component<{}, { current: number }> {
  public constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  public render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className='steps-content'>{steps[current].content}</div>
        <div className='steps-action'>
          {current < steps.length - 1 && (
            <Button type='primary' onClick={() => this.next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type='primary' onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
  }

  private next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  private prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
}

export default StepsExample;
