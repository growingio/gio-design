import FilterPicker from './FilterPicker';
import FilterCondition from './components/FilterList/Expression/FilterCondition';

/**
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat
 */
export const listFormat: (list: string[], code: 'zh-CN' | 'en-US') => string = (list, code = 'zh-CN') => {
  if ('ListFormat' in Intl) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore 忽略 `类型“Intl”上不存在属性“ListFormat”。ts(2339) `的错误
    return new Intl.ListFormat(code).format(list);
  }
  return list.join(',');
};

export type { FilterPickerProps } from './interfaces';

export { FilterCondition };

export default FilterPicker;
