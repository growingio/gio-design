/* eslint-disable prettier/prettier */
import { TreeSelectProps as RcTreeSelectProps } from 'rc-tree-select';
import { SizeType } from '../config-provider/SizeContext';

type RawValue = string | number;

export interface LabeledValue {
  key?: string;
  value: RawValue;
  label: React.ReactNode;
}

export type SelectValue = RawValue | RawValue[] | LabeledValue | LabeledValue[];

export interface TreeSelectProps<T>
  extends Omit<
  RcTreeSelectProps<T>,
  'showTreeIcon' | 'treeMotion' | 'inputIcon' | 'mode' | 'getInputElement' | 'backfill'
  > {
  suffixIcon?: React.ReactNode;
  size?: SizeType;
  bordered?: boolean;
}
