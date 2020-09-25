/* eslint-disable @typescript-eslint/ban-types */
import { OverrideProps } from '../../utils/type';

export type HtmlElement = keyof React.ReactHTML;

export interface ILinkProps {
  component: React.ElementType;
  to?: string;
  disabled?: boolean;
  prefix?: string;
}

export interface LinkTypeMap<P = {}, D extends React.ElementType = 'a'> {
  props: P & ILinkProps;
  defaultComponent: D;
}

export type TLinkProps<D extends React.ElementType = LinkTypeMap['defaultComponent'], P = {}> = OverrideProps<
  LinkTypeMap<P, D>,
  D
>;
