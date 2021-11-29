import _PropertyPicker from './PropertyPicker';
import _PropertyCard from './PropertyCard';
import _PropertySelector from './PropertySelector';
// import './style/index';

export type { PropertySelectorProps, PropertyPickerProps, PropertyValue } from './interfaces';

export { dimensionToPropertyItem } from './util';
export const PropertyCard = _PropertyCard;
export type TPropertyPicker = typeof _PropertyPicker & {
  PropertyCard: typeof PropertyCard;
};
const Picker = _PropertyPicker as TPropertyPicker;
Picker.PropertyCard = _PropertyCard;

export const PropertyPicker = Picker;
type TPropertySelector = typeof _PropertySelector & {
  PropertyPicker: TPropertyPicker;
};
const PropertySelector = _PropertySelector as TPropertySelector;
PropertySelector.PropertyPicker = Picker;
export default PropertySelector;
