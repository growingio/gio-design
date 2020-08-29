export type VauleType = string | number;

export type ExampleType = (value: VauleType) => React.ReactNode;

export interface TokenProps {
  [key: string]: VauleType;
}

export interface Record {
  name: string;
  example: ExampleType;
  value: VauleType;
}

export interface TokenTableProps {
  prefix: string;
  example: ExampleType;
}
