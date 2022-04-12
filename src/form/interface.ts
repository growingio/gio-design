import { FormProps as RcFormProps } from 'rc-field-form/lib/Form';
import { FormInstance } from 'rc-field-form';
import { FieldProps } from 'rc-field-form/lib/Field';
import { Callbacks, Store, ValidateMessages } from 'rc-field-form/es/interface';
import { FormLabelAlign, RequiredMark } from './context';
import { FormItemFeedbackType } from './ItemControl';
import { SizeType } from '../utils/SizeContext';

export type FormLayout = 'horizontal' | 'vertical' | 'inline';

export interface Props<Values = unknown> extends Omit<RcFormProps<Values>, 'form'> {
  /**
   自定义 `css` 类前缀
   */
  prefixCls?: string;
  /**
   自定义 `className`
   */
  className?: string;
  /**
     表单名称
   */
  name?: string;
  /**
   `label` 标签的宽度（width）
   */
  labelWidth?: number;
  /**
   `input` 控制项标签的宽度（width）
   */
  inputWidth?: number;
  /**
   `label` 标签的文本对齐方式
   */
  labelAlign?: FormLabelAlign;
  /**
   * 实例方法
   */
  form?: FormInstance<Values>;
  /**
   表单布局
   */
  layout?: FormLayout;
  /**
   设置字段组件的尺寸（仅限 giod 组件）
   */
  size?: SizeType;
  /**
   * 配置 Form.Item 的 colon 的默认值。表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效)
   * @default false
   */
  colon?: boolean;
  /**
   必选样式，可以切换为必选或者可选展示样式。此为 Form 配置，Form.Item 无法单独配置
   */
  requiredMark?: RequiredMark;
  /**
   自定义样式
   */
  style?: React.CSSProperties;

  /**
   * 表单默认值，只有初始化以及重置时生效。key 对应的是 Form.Item 的 name，value 为对应的值
   * @type { Record<string, any> }
   */
  initialValues?: Store;
  /**
   * 设置 Form 渲染元素，为 false 则不创建 DOM 节点
   * @default form
   */
  component?: false | string | React.ComponentType;

  /**
   * 验证提示模板，更多介绍请看 [rc-field-form](https://github.com/react-component/field-form#validatemessages)
   */
  validateMessages?: ValidateMessages;
  /**
   * 字段值更新时触发回调事件
   */
  onValuesChange?: Callbacks<Values>['onValuesChange'];
  /**
   * 字段更新时触发回调事件
   */
  onFieldsChange?: Callbacks<Values>['onFieldsChange'];
  /**
   * 提交表单且数据验证成功后回调事件
   */
  onFinish?: Callbacks<Values>['onFinish'];
  /**
   * 提交表单且数据验证失败后回调事件
   */
  onFinishFailed?: Callbacks<Values>['onFinishFailed'];
  /**
   * 统一设置字段触发验证的时机
   * @default onChange
   */
  validateTrigger?: string | string[] | false;
  /**
   * 当字段被删除时保留字段值
   * @default true
   */
  preserve?: boolean;
}

export type FormProps<Values = unknown> = Props<Values>;

type RenderChildren = (form: FormInstance) => React.ReactNode;
type ChildrenType = RenderChildren | React.ReactNode;

export interface FormItemProps extends Omit<FieldProps, 'children'>, Omit<ItemLabelProps, 'colon'> {
  /**
   自定义 `css` 类前缀
   */
  prefixCls?: string;
  /**
   自定义 `className`
   */
  className?: string;
  /**
   自定义样式
   */
  style?: React.CSSProperties;
  /**
   `label` 标签的文本
   */
  label?: React.ReactNode;

  /**
   * `label` 元素的 title 属性，不设置则尝试使用 string 类型的 label 属性
   */
  title?: string;
  /**
   * 自定义 label 后面的内容
   */
  afterLabel?: React.ReactNode;
  /**
   * 自定义 input 后面的内容
   */
  afterInput?: React.ReactNode;
  /**
   被包裹的元素
   */
  children?: ChildrenType;
  /**
   帮助信息
   */
  help?: React.ReactNode;
  /**
   自定义校验结果提示信息，如不设置则会根据校验规则自动生成
   */
  feedback?: React.ReactNode;
  /**
   自定义校验结果类型
   */
  feedbackType?: FormItemFeedbackType;
  /**
   必填样式设置。如不设置，则会根据校验规则自动生成
   */
  required?: boolean;
  marker?: React.ReactNode;
  /**
   自定义校验图标，可使用内部图标或自由传入
   */
  feedbackIcon?: boolean | React.ReactNode;
  /**
   设置子元素 label htmlFor 属性
   */
  htmlFor?: string;
  /**
   label 标签的宽度（width）
   */
  labelWidth?: React.CSSProperties['width'];
  /**
   input 控制项标签的宽度（width）
   */
  inputWidth?: React.CSSProperties['width'];
  /**
   配置 Form.Item 的 colon 的默认值。表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效)
   */
  colon?: boolean;
  /**
   label 标签的文本对齐方式
   */
  labelAlign?: FormLabelAlign;
  fieldKey?: React.Key | React.Key[];
}

export interface FormContextProps {
  name?: string;
  layout?: FormLayout;
  labelAlign?: FormLabelAlign;
  labelWidth?: React.CSSProperties['width'];
  inputWidth?: React.CSSProperties['width'];
  requiredMark?: RequiredMark;
  colon?: boolean;
}

export interface ItemLabelProps {
  label?: React.ReactNode;
  title?: string;
  fieldId?: string;
  prefixCls?: string;
  labelWidth?: React.CSSProperties['width'];
  afterLabel?: React.ReactNode;
  required?: boolean;
  requiredMark?: RequiredMark;
  marker?: React.ReactNode;
  colon?: string;
  htmlFor?: string;
  labelAlign?: FormLabelAlign;
}

// 支持 ForwardRef 传入泛型
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ForwardRefFn = <Values = any>(
  props: React.PropsWithChildren<Props<Values>> & React.RefAttributes<FormInstance<Values>>
) => React.ReactElement;
