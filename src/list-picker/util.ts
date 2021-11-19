import { OptionProps, SelectionItemProps } from '../list/interfance';

export const getFlattenOptions = (
  data: OptionProps[] | SelectionItemProps[],
  isSelection = false
): { groupName: string; groupId: string; options: OptionProps[] }[] | OptionProps[] => {
  const groupMap = new Map();
  if (!isSelection) {
    return data;
  }
  (data as SelectionItemProps[])?.map((cur: SelectionItemProps) => {
    const gValue = groupMap.get(cur.groupId);
    if (gValue) {
      const { options, ...rest } = gValue;
      return groupMap.set(cur.groupId, {
        options: [...options, cur],
        ...rest,
      });
    }
    return groupMap.set(cur.groupId, {
      label: cur.groupName,
      value: cur.groupId,
      options: [cur],
    });
  });
  const flattenOption: { groupName: string; groupId: string; options: OptionProps[] }[] = [];
  groupMap.forEach((value) => {
    flattenOption.push({
      groupName: value.label,
      groupId: value.value,
      options: value.options ?? [],
    });
  });
  return flattenOption;
};

export default {
  getFlattenOptions,
};
