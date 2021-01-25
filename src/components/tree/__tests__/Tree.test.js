import React from 'react';
import { mount } from 'enzyme';
import { DownFilled } from '@gio-design/icons';
import Tree from '../index';

const treeData = [
  {
    title: '产品团队',
    key: '0-0',
    children: [
      {
        title: '产品经理团队',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: '产品一组',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: '产品二组',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: '设计师团队',
        key: '0-0-1',
        children: [
          {
            title: <span style={{ color: 'red' }}>UX</span>,
            key: '0-0-1-0',
          },
        ],
      },
    ],
  },
  {
    title: '市场团队',
    key: '0-1',
    children: [],
  },
];

const treeData2 = [
  {
    title: '产品团队',
    icon: 'icon',
    key: '1',
    children: [
      {
        title: 'node1',
        icon: 'icon',
        key: '2',
      },
      {
        title: 'node2',
        key: '3',
      },
    ],
  },
];

describe('Tree', () => {
  it('icon and switcherIcon of Tree should render correctly', () => {
    const wrapper = mount(<Tree treeData={treeData} showIcon />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('switcherIcon in Tree should not render at leaf nodes', () => {
    const wrapper = mount(<Tree switcherIcon={<i className="switcherIcon" />} defaultExpandAll treeData={treeData2} />);
    expect(wrapper.find('.switcherIcon').length).toBe(1);
  });

  it('switcherIcon in Tree could be string', () => {
    const wrapper = mount(<Tree switcherIcon="switcherIcon" defaultExpandAll treeData={treeData2} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('switcherIcon in Tree could be React.ReactNode', () => {
    const wrapper = mount(<Tree switcherIcon={<DownFilled />} defaultExpandAll treeData={treeData2} prefixCls="xxx" />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
