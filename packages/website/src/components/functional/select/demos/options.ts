const labels = ['全部', '已上线', '待上线', '已下线', '草稿'];
const values = ['all', 'online', 'pending', 'off', 'draft'];

const options = values.map((value, index) => ({
  value,
  label: labels[index],
  groupValue: 'platform',
  groupLabel: '应用平台',
}));

const optionsWithoutGroup = values.map((value, index) => ({
  value,
  label: labels[index],
}));

export { optionsWithoutGroup };
export default options;
