import React from 'react';
import { render, screen } from '@testing-library/react';
import { DownFilled } from '@gio-design/icons';
import Tree from '../index';

describe('Testing Tree', () => {
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
      
    it('icon and switcherIcon of Tree should render correctly', () => {
        const wrapper = render(<Tree treeData={treeData} showIcon />);
        expect(wrapper).toBeTruthy();
    });

    it('switcherIcon in Tree should not render at leaf nodes', () => {
        const wrapper = render(<Tree switcherIcon={<i className="switcherIcon" />} defaultExpandAll treeData={treeData2} />);
        expect(wrapper).toBeTruthy()
    });

    it('switcherIcon in Tree could be string', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
        const wrapper = render(<Tree switcherIcon="switcherIcon" defaultExpandAll treeData={treeData2} />);
        screen.logTestingPlaygroundURL()
        expect(wrapper).toBeTruthy();
    });
    
    it('switcherIcon in Tree could be React.ReactNode', () => {
        const wrapper = render(<Tree switcherIcon={<DownFilled />} defaultExpandAll treeData={treeData2} prefixCls="xxx" />);
        expect(wrapper).toBeTruthy();
    });

})