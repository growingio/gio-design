import { CommonProps } from '../../utils/interfaces';

export interface StepsProps extends CommonProps {
  /**
   * 只允许使用 Step 组件
   */
  children: React.ReactNode;

  /**
   * 当前步骤，从 0 开始计数
   * @default 0
   */
  current?: number;

  /**
   * 未支持
   */
  type?: string;

  /**
   * 未支持
   */
  size?: string;

  /**
   * 点击步骤项时触发, 如果不设置该回调函数，则步骤条为 `不可点击` 状态
   * @param { number } current 当前 current 值，标识当前是第几个步骤
   * @returns { void } void
   */
  onClick?: (current: number) => void;
}

export interface StepProps extends CommonProps {
  /**
   * 当前步骤的标题
   */
  title?: string;

  /**
   * 当前步骤的描述信息
   */
  description?: string;

  prefixCls?: string;

  /**
   * 是否已完成, 如果不指定该参数，则会组件内部会自己计算当前是否为 finished 状态
   * @default false
   */
  finished?: boolean;

  onStepClick?: (current: number) => void;
  active?: boolean;
  stepNumber?: number;
}
