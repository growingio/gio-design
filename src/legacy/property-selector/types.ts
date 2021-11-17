// export type Maybe<T> = T | undefined;
export type Dimension = {
  // __typename?: 'Dimension';
  id: string;
  name: string;
  type: string;
  groupId: string;
  groupName?: string;
  valueType?: string;
  associatedKey?: string;
  isSystem?: boolean;
};
