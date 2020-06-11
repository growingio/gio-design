export type CheckboxValueType = string | number | boolean;

export interface CheckboxOptionType {
  label: React.ReactNode;
  value: CheckboxValueType;
  disabled?: boolean;
  onChange?: (e: any) => void;
}
