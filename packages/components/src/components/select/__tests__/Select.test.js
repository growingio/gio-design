import React from 'react';
import Select from '../index';
import '@gio-design/components/es/components/Select/style/index.css';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { CustomOption, defaultLabelRenderer } from '../Select';

const labels = ['全部', '已上线', '待上线', '已下线', '草稿'];
const values = ['all', 'online', 'pending', 'off', 'draft'];

const options = values.map((value, index) => ({
  value,
  label: labels[index],
  groupValue: 'platform',
  groupLabel: '应用平台',
}));

const optionsWithOutGroup = values.map((value, index) => ({
  value,
  label: labels[index],
}));

describe('<Select />', () => {
  it('renders <Select /> components', () => {
    const tree = renderer.create(<Select defaultValue="all" options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders <Select /> components', () => {
    const tree = renderer.create(<Select defaultValue="all" options={optionsWithOutGroup} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have correc dom structure', () => {
    const tree = shallow(<Select options={options} />);
    expect(tree.find('.gio-select').exists()).toBeTruthy();
    expect(tree.find('.gio-select-selector').exists()).toBeTruthy();
    expect(tree.find('.gio-select-values-wrapper').exists()).toBeTruthy();
    expect(tree.find('.gio-select-item').exists()).toBeTruthy();
    expect(tree.find('.gio-select-arrow').exists()).toBeTruthy();
  });

  it('should have correc dom structure', () => {
    const tree = shallow(<Select options={optionsWithOutGroup} />);
    expect(tree.find('.gio-select').exists()).toBeTruthy();
    expect(tree.find('.gio-select-selector').exists()).toBeTruthy();
    expect(tree.find('.gio-select-values-wrapper').exists()).toBeTruthy();
    expect(tree.find('.gio-select-item').exists()).toBeTruthy();
    expect(tree.find('.gio-select-arrow').exists()).toBeTruthy();
    tree.unmount();
  });

  it('should have correct classes', () => {
    const tree = shallow(<Select options={options} />);
    tree.setProps({ size: 'small' });
    expect(tree.find('.gio-select-small').exists()).toBeTruthy();
    tree.setProps({ size: 'middle' });
    expect(tree.find('.gio-select-middle').exists()).toBeTruthy();
    tree.setProps({ size: 'large' });
    expect(tree.find('.gio-select-large').exists()).toBeTruthy();
  });

  it('select dropdown should display correct search result', () => {
    const tree = mount(<Select options={options} searchable allowCustomOption />);
    expect(document.body.querySelector('.gio-select-dropdown')).toBeNull();
    act(() => {
      tree.simulate('click');
    });
    const dropdown = document.querySelector('.gio-select-dropdown');
    expect(dropdown).not.toBeNull();
    act(() => {
      tree.find('input.gio-select-input.gio-select-item').simulate('change', { target: { value: '全' } });
    });
    expect(dropdown.querySelectorAll('.gio-select-option')).toHaveLength(4);
    tree.unmount();
  });
});

describe('<Select multiple/>', () => {
  it('renders <Select multiple/> components', () => {
    const tree = renderer.create(<Select defaultValue={['all']} options={options} multiple />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders <Select multiple/> components', () => {
    const tree = renderer.create(<Select defaultValue={['all']} options={optionsWithOutGroup} multiple />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have correct classes', () => {
    const tree = shallow(<Select options={options} />);
    tree.setProps({ size: 'small' });
    expect(tree.find('.gio-select-small').exists()).toBeTruthy();
    tree.setProps({ size: 'middle' });
    expect(tree.find('.gio-select-middle').exists()).toBeTruthy();
    tree.setProps({ size: 'large' });
    expect(tree.find('.gio-select-large').exists()).toBeTruthy();
  });

  it('select dropdown should display correct search result', () => {
    const tree = mount(<Select options={options} searchable allowCustomOption />);
    act(() => {
      tree.simulate('click');
    });
    const dropdown = document.querySelector('.gio-select-dropdown');
    expect(dropdown).not.toBeNull();
    act(() => {
      tree.find('input.gio-select-input.gio-select-item').simulate('change', { target: { value: '全' } });
    });
    expect(document.querySelectorAll('.gio-select-dropdown .gio-select-option')).toHaveLength(4);
    act(() => {
      document.querySelector('.gio-select-dropdown').querySelectorAll('.gio-select-option')[1].click();
    });
    expect(tree.find('.gio-select-item .gio-select-item-text').text()).toBe('全');
    tree.unmount();
  });
});

describe('callback functions should work as expected', () => {
  const onChange = (v, o) => {
    expect(v).toBe('all');
    expect(o).toMatchObject({ label: '全部', value: 'all' });
  };

  const onSelect = (v, o) => {
    expect(v).toBe('all');
    expect(o).toMatchObject({ label: '全部', value: 'all' });
  };

  const onDeSelect = (v, o) => {
    expect(v).toBe('all');
    expect(o).toMatchObject({ label: '全部', value: 'all' });
  };

  const onSearch = (i) => {
    expect(i).toBe('全部');
  };

  it('onChange, onSelect, onDeselect, OnSearch', () => {
    const tree = mount(
      <Select
        options={optionsWithOutGroup}
        onChange={onChange}
        onSelect={onSelect}
        onDeselect={onDeSelect}
        onSearch={onSearch}
        searchable
      />
    );
    act(() => {
      tree.simulate('click');
    });
    act(() => {
      tree.find('input.gio-select-input.gio-select-item').simulate('change', { target: { value: '全部' } });
    });
    act(() => {
      document.querySelector('.gio-select-dropdown .gio-select-option').click();
    });
    tree.unmount();
  });
});

describe('independent function should work as expected', () => {
  it('CutomOption should render free option with group', () => {
    expect(CustomOption('test', true)).toEqual({
      value: 'test',
      label: 'test',
      groupValue: 'select_custom_option_',
      groupLabel: '自由输入',
    });
  });

  it('label renderer should render highlighted item', () => {
    const option = {
      value: 'test',
      label: 'test',
      groupValue: 'select_custom_option_',
      groupLabel: '自由输入',
    };
    expect(defaultLabelRenderer('s')(option, true)).toBe('test');
    const tree = shallow(defaultLabelRenderer('s', 'select')(option));
    expect(tree.find('.select-search-highlight').text()).toBe('s');
  });
});
