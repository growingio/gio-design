import * as React from 'react';
import { Steps as AntdSteps } from 'antd';
import 'antd/lib/steps/style/index.css';

export const Step = AntdSteps.Step;

export interface PropsType {
  [key: string]: any;
}

class Steps extends React.Component<PropsType> {
  public static Step: typeof Step;
  public render() {
    return <AntdSteps {...this.props} />;
  }
}

Steps.Step = Step;

export default Steps;
