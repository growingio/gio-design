import React from "react";

export type ButtonType = 'primary' | 'secondary' | 'text'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'prefix' | 'type' | 'disabled'> {
  /**
   * 按钮类型
   * @default 'primary'
   */
  type?: ButtonType

  /**
   * 按钮大小
   * @default 'normal'
   * @TODO 使用全局的 SizeType
   */
  size?: 'small' | 'normal'

  /**
   * 按钮文本前的内容
   */
  prefix?: React.ReactNode

  /**
   * 按钮文本后的内容
   */
  suffix?: React.ReactNode

  /**
   * 按钮的载入状态，如果为 `true`，则 `disabled` 也默认为 `true`
   * @default false
   */
  loading?: boolean

  /**
   * `button` 原生的 `type` 值
   * @default `button`
   */
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']

  /**
   * 按钮的失效状态
   * @default false
   */
  disabled?: boolean
}

export type IconButtonProps = Omit<ButtonProps, 'prefix' | 'suffix'>