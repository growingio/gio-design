import { CommonProps } from '../../utils/type';

export type Type = 'page' | 'modal' | 'drawer';
export type Size = 'middle' | 'small';

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
   * 使用场景，包括 `page`（页面）、`modal`（弹窗） 和 `drawer`（抽屉）
   * @page 最多支持 4 步操作
   * @modal 最多支持 2 ~ 4 步操作
   * @drawer 最多支持 2 步操作
   * @default `page`
   */
  type?: Type;

  /**
   * 当 type = `modal` 时有效，middle 最多支持 4 步操作，small 最多支持 2 步操作
   * @default `small`
   */
  size?: Size;

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
