import { ListPickerProps } from '../list-picker';
import { SelectorProps } from '../../selector';

export interface ListSelectorProps
  extends Pick<
      SelectorProps,
      | 'allowClear'
      | 'borderless'
      | 'className'
      | 'defaultVisible'
      | 'disabled'
      | 'fitContent'
      | 'getContainer'
      | 'placeholder'
      | 'size'
      | 'style'
      | 'triggerClassName'
      | 'triggerStyle'
      | 'visible'
    >,
    Pick<ListPickerProps, 'defaultValue' | 'emptyImage' | 'items' | 'groups' | 'onSelect' | 'value'> {}
