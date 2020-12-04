const labels = ['全部', '已上线', '待上线', '已下线', '草稿'];
const values = ['all', 'online', 'pending', 'off', 'draft'];
const numberValues = [10,20,30,40,50];

const options = values.map((value, index) => ({
  value,
  label: labels[index],
  groupValue: 'platform',
  groupLabel: '应用平台',
}));

const numberOptions = numberValues.map((value, index) => ({
  value,
  label: labels[index],
}));

const optionsWithoutGroup = values.map((value, index) => ({
  value,
  label: labels[index],
}));

const optionsWithChildren = values.map((value, index) => ({
  value:`${value}-自定义`,
  label: `${labels[index]}-自定义`,
}));

export { optionsWithoutGroup,optionsWithChildren,numberOptions };
export default options;
