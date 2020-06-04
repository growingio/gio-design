import React from 'react';
import { mount } from 'enzyme';
import List from '..';

const columns = [
  { title: '标题', dataIndex: 'name', render: (text) => <a href='https://www.baidu.com'>{text}</a> },
  { title: '人数', dataIndex: 'userNum', width: 150, className: 'align-right' },
  { title: '创建人', dataIndex: 'creator', width: 150 },
];

const dataSouce = [{ key: 1, name: '百度', userNum: 69, creator: '姜曼' }];

describe('Testing Table', () => {
  it('should be able to render component', () => {
    const wrapper = mount(<List columns={columns} dataSouce={dataSouce} />);
    expect(wrapper.find('.ant-table-wrapper.gio-list').length).toBe(1);
    // expect(wrapper.find('.gio-datepicker-label').length).toBe(1);
    // expect(wrapper.find('.gio-datepicker-label span').length).toBe(3);
    // expect(wrapper.find('.gio-datepicker-label span').at(1).text()).toBe('2014/05/09');
  });
});
