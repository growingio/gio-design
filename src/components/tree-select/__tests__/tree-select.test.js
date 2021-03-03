import React from 'react';
import { mount } from 'enzyme';
import { MoreOutlined } from '@gio-design/icons';
import TreeSelect from '../index';
import focusTest from './focusTest';

const treeData = [
  {
    title: 'parent 1',
    key: '0-1',
    value: '0-1',
    children: [
      {
        title: 'parent 1-0',
        key: '0-1-1',
        value: '0-1-1',
        children: [
          {
            title: 'my leaf',
            key: 'random',
            value: 'random',
          },
          {
            title: 'your leaf',
            key: 'random1',
            value: 'random1',
          },
        ],
      },
    ],
  },
];

const treeData2 = [
  {
    title: 'parent 1',
    value: 'partent 1',
    icon: <span>Bamboo</span>,
  },
];

describe('Testing tree select', () => {
  focusTest(TreeSelect);

  it('should support customized icons', () => {
    const wrapper = mount(
      <TreeSelect
        showSearch
        clearIcon={<span>clear</span>}
        removeIcon={<span>remove</span>}
        value={['leaf1', 'leaf2']}
        placeholder="Please select"
        multiple
        allowClear
        treeDefaultExpandAll
        treeData={treeData}
      />
    );

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should `treeIcon` work', () => {
    const wrapper = mount(<TreeSelect treeIcon open treeData={treeData2} />);

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('not found work', () => {
    const wrapper = mount(<TreeSelect notFoundContent={<div>暂无数据</div>} treeData={[]} />);

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('`multiple` will alway be `true` when `treeCheckable` is true work', () => {
    const wrapper = mount(<TreeSelect treeData={treeData} treeCheckable />);

    expect(wrapper.render()).toMatchSnapshot();

    const wrapper2 = mount(<TreeSelect treeData={treeData} treeCheckable multiple />);

    expect(wrapper2.render()).toMatchSnapshot();

    const wrapper3 = mount(<TreeSelect treeData={treeData} treeCheckable={false} multiple={false} />);

    expect(wrapper3.render()).toMatchSnapshot();
  });

  it('should support listHeight and listItemHeight work', () => {
    const wrapper = mount(
      <TreeSelect
        treeData={treeData}
        listHeight={400}
        listItemHeight={30}
        suffixIcon={<MoreOutlined />}
        showSearch
        menuItemSelectedIcon={<MoreOutlined />}
      />
    );

    expect(wrapper.render()).toMatchSnapshot();
  });
});
