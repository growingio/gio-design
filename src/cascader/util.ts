import { OptionProps } from '../list/interfance';

export const getLabelByValue = (val?: string | string[], opts?: OptionProps | OptionProps[], separator = '') =>
  val?.includes('.')
    ? (val as any)
        ?.split('.')
        ?.reduce(
          (prev: string[], curr: string) => [...prev, (opts as OptionProps[]).find((o) => o.value === curr)?.label],
          []
        )
        ?.join(separator)
    : (opts as OptionProps).label;

export default {
  getLabelByValue,
};
