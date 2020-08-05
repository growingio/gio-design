export enum TagType {
  'normal',
  'prorupt',
  'large',
}

export enum TagStatus {
  'success',
  'warning',
  'error',
  'offline',
  'draft',
}

export enum TagColor {
  'beta',
  'new',
  'grayscale',
  'blue',
}

export type TagTypeKey = keyof typeof TagType;

export type TagStatusKey = keyof typeof TagStatus;

export type TagColorKey = keyof typeof TagColor;

export interface TagProps {
  type?: TagTypeKey;
  status?: TagStatusKey;
  color?: TagColorKey | string;
  closable?: boolean;
  disabled?: boolean;
  persistCloseIcon?: boolean;
  onClose?: (e: React.MouseEvent<SVGElement>) => void;
  customizePrefixCls?: string;
}
