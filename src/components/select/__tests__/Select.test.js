import React from 'react';
import '../../../../es/components/select/style/index.css';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Select from '../index';
import { CustomOption, defaultLabelRenderer } from '../utils';
import Selector from '../Selector';

const labels = ['全部', '已上线', '待上线', '已下线', '草稿'];
const values = ['all', 'online', 'pending', 'off', 'draft'];

const options = values.map((value, index) => ({
  value,
  label: labels[index],
  groupValue: 'platform',
  groupLabel: '应用平台',
}));

const tooltipOptions = values.map((value, index) => ({
  value,
  label: labels[index],
  tooltip: 'tooltip',
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

  it('renders <Select.Option /> components', () => {
    const tree = renderer
      .create(
        <Select>
          <Select.Option value="all">全部</Select.Option>
          <Select.Option value="online">已上线</Select.Option>
          isNotReactElement
          {/* waring ReactElement is Dom Element */}
        </Select>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders <Select.Group /> components', () => {
    const tree = renderer
      .create(
        <Select>
          <Select.Group label="应用平台" value="platform">
            <Select.Option value="all">全部</Select.Option>
            <Select.Option value="online">已上线</Select.Option>
          </Select.Group>
          <Select.Group label="选择" value="change">
            <Select.Option value="yes">Yes</Select.Option>
            <Select.Option value="no">No</Select.Option>
          </Select.Group>
        </Select>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have correc dom structure', () => {
    const tree = shallow(<Select options={options} />);
    expect(tree.find('.gio-select-trigger').exists()).toBeTruthy();
    expect(tree.find(Selector).shallow().find('.gio-select-selector').exists()).toBeTruthy();
    expect(tree.find(Selector).shallow().find('.gio-select-values-wrapper').exists()).toBeTruthy();
    expect(tree.find(Selector).shallow().find('.gio-select-arrow').exists()).toBeTruthy();
    tree.unmount();
  });

  it('should have correc dom structure', () => {
    const tree = shallow(<Select options={optionsWithOutGroup} />);
    expect(tree.find('.gio-select-trigger').exists()).toBeTruthy();
    expect(tree.find(Selector).shallow().find('.gio-select-selector').exists()).toBeTruthy();
    expect(tree.find(Selector).shallow().find('.gio-select-values-wrapper').exists()).toBeTruthy();
    expect(tree.find(Selector).shallow().find('.gio-select-arrow').exists()).toBeTruthy();
    tree.unmount();
  });

  it('should have correct classes', () => {
    const tree = shallow(<Select options={options} />);
    tree.setProps({ size: 'small' });
    expect(tree.find(Selector).shallow().find('.gio-select-small').exists()).toBeTruthy();
    tree.setProps({ size: 'middle' });
    expect(tree.find(Selector).shallow().find('.gio-select-middle').exists()).toBeTruthy();
    tree.setProps({ size: 'large' });
    expect(tree.find(Selector).shallow().find('.gio-select-large').exists()).toBeTruthy();
  });

  it('select dropdown should display correct search result', () => {
    const tree = mount(<Select options={options} searchable />);
    expect(document.body.querySelector('.gio-select-dropdown')).toBeNull();
    act(() => {
      tree.simulate('click');
    });
    const dropdown = document.querySelector('.gio-select-dropdown');
    expect(dropdown).not.toBeNull();
    act(() => {
      tree.find('input').simulate('change', { target: { value: 'demo' } });
    });
    expect(dropdown.querySelector('.not-found-context')).not.toBeNull();
    act(() => {
      tree.find('input').simulate('change', { target: { value: '全' } });
    });
    act(() => {
      tree.find('input').simulate('click');
    });
    expect(dropdown.querySelectorAll('.gio-select-list-option')).toHaveLength(1);
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
});

describe('<Select /> allowClear onClear onAllowClear', () => {
  it('allowClear onClear onAllowClear', () => {
    const tree = mount(<Select options={optionsWithOutGroup} searchable allowClear allowDeselect allowCustomOption />);
    act(() => {
      tree.simulate('click');
    });
    act(() => {
      tree.find('input').simulate('change', { target: { value: '全部' } });
    });
    act(() => {
      document.querySelector('.gio-select-dropdown .gio-select-list-option').click();
    });
    act(() => {
      tree.simulate('mouseenter');
    });
    act(() => {
      tree.simulate('mouseenter').find('.gio-select-arrow').simulate('click');
    });
    act(() => {
      tree.simulate('mouseleave');
    });
    act(() => {
      tree.find('input').simulate('change', { target: { value: '全部' } });
    });
    act(() => {
      tree.simulate('mouseenter').find('.gio-select-arrow').simulate('click');
    });
    expect(tree.find('input').text()).toBe('');
    tree.unmount();
  });
  it('allowClear input', () => {
    const tree = mount(<Select options={optionsWithOutGroup} searchable allowClear />);
    act(() => {
      tree.simulate('click');
    });
    act(() => {
      tree.find('input').simulate('change', { target: { value: '全部' } });
    });
    act(() => {
      tree.simulate('mouseenter');
    });
    act(() => {
      tree.simulate('mouseenter').find('.gio-select-arrow').simulate('click');
    });
    act(() => {
      tree.simulate('mouseleave');
    });
    expect(tree.find('input').text()).toBe('');
    tree.unmount();
  });
});
describe('<Select /> callback functions should work as expected', () => {
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
        placeholder="请选择"
        searchable
        allowDeselect
        allowCustomOption
      />
    );
    act(() => {
      tree.simulate('click');
    });
    act(() => {
      tree.find('input').simulate('change', { target: { value: '全部' } });
    });
    act(() => {
      document.querySelector('.gio-select-dropdown .gio-select-list-option').click();
    });
    act(() => {
      document.querySelector('.gio-select-dropdown .gio-select-list-option').click();
    });
    expect(document.querySelector('.gio-dropdown.gio-dropdown-hidden')).not.toBeNull();
    tree.unmount();
  });
});

describe('<Select Multiple /> callback functions should work as expected on multiple mode', () => {
  const onChange = (v, o) => {
    expect(v).toEqual(['online', 'all']);
    expect(o).toEqual([
      { value: 'online', label: '已上线' },
      { value: 'all', label: '全部' },
    ]);
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
        multiple
        options={optionsWithOutGroup}
        onChange={onChange}
        onSelect={onSelect}
        onDeselect={onDeSelect}
        onSearch={onSearch}
        searchable
        defaultValue={['online']}
      />
    );
    act(() => {
      tree.simulate('click');
    });
    act(() => {
      tree.find('input').simulate('change', { target: { value: '全部' } });
    });
    act(() => {
      document.querySelector('.gio-select-dropdown .gio-select-list-option').click();
    });
    tree.unmount();
  });
});

describe('<Select allowCustomOptions multiple/> can create option by presee enter, and unselect by press delete key', () => {
  it('should be able to create by enter', () => {
    const tree = mount(<Select multiple allowCustomOption searchable options={options} defaultValue={['all']} />);
    act(() => {
      tree.find('input').simulate('change', { target: { value: 'test' } });
    });
    act(() => {
      tree.find('input').simulate('keydown', { keyCode: 13 });
    });
    expect(tree.render().find('.gio-select-values-wrapper').children('.gio-tag')).toHaveLength(2);
    act(() => {
      tree.find('input').simulate('change', { target: { value: '' } });
    });
    act(() => {
      tree.find('input').simulate('keydown', { keyCode: 46 });
    });
    expect(tree.render().find('.gio-select-values-wrapper').children('.gio-tag')).toHaveLength(1);
    act(() => {
      tree.find('input').simulate('keydown', { keyCode: 46 });
    });
    act(() => {
      tree.find('input').simulate('keydown', { keyCode: 65 });
    });
    act(() => {
      tree.unmount();
    });
  });
});

describe('<Select /> when press delete key will unselect current option', () => {
  it('should be able to create by enter', () => {
    const tree = mount(<Select searchable options={options} defaultValue="all" />);
    act(() => {
      tree.find('input').simulate('keydown', { keyCode: 46 });
    });
    expect(tree.render().find('.gio-select-values-wrapper').children('.gio-select-item-text').text()).toBe('');
    act(() => {
      tree.unmount();
    });
  });
});
describe('<Select /> tooltip', () => {
  it('tooltip', () => {
    const tree = mount(<Select searchable options={tooltipOptions} />);
    act(() => {
      tree.simulate('click');
    });
    expect(document.querySelector('.gio-tooltip')).toBe(null);
    act(() => {
      document.querySelector('.gio-select-dropdown').querySelectorAll('.gio-select-list-option')[0].click();
    });
    // expect(wrapper.find('.gio-tooltip-inner-title').text()).toBe('这是一个很长的文字');

    act(() => {
      tree.unmount();
    });
  });
});
describe('<Select /> when press delete key will unselect current option', () => {
  it('should be able to create by enter', () => {
    const onDeSelect = (v, o) => {
      expect(v).toBe('all');
      expect(o).toMatchObject({ label: '全部', value: 'all' });
    };

    const tree = mount(<Select multiple searchable options={options} defaultValue={['all']} onDeselect={onDeSelect} />);

    act(() => {
      tree.find('.gio-tag .gio-tag-closable-icon').at(0).simulate('click');
    });

    expect(tree.render().find('.gio-select-values-wrapper').children()).toHaveLength(2);
    act(() => {
      tree.unmount();
    });
  });
});

describe('<Select /> deselect list', () => {
  it('should be able to create by enter', () => {
    const onDeSelect = (v, o) => {
      expect(v).toBe('all');
      expect(o).toMatchObject({ label: '全部', value: 'all' });
    };

    const tree = mount(
      <Select multiple searchable options={optionsWithOutGroup} defaultValue={['all']} onDeselect={onDeSelect} />
    );
    act(() => {
      tree.simulate('click');
    });
    act(() => {
      tree.find('input').simulate('change', { target: { value: '全部' } });
    });
    act(() => {
      document.querySelector('.gio-select-dropdown').querySelectorAll('.gio-select-list-option')[0].click();
    });
    tree.unmount();
  });
});

describe('<Select /> deselect list', () => {
  it('should be able to create by enter', () => {
    const tree = mount(<Select searchable options={optionsWithOutGroup} defaultValue="all" onDeselect={onDeSelect} />);

    const onDeSelect = (v, o) => {
      expect(v).toBe('all');
      expect(o).toMatchObject({ label: '全部', value: 'all' });
      act(() => {
        tree.unmount();
      });
    };

    act(() => {
      tree.simulate('click');
    });
    act(() => {
      tree.find('input').simulate('change', { target: { value: '全部' } });
    });
    act(() => {
      document.querySelector('.gio-select-dropdown').querySelectorAll('.gio-select-list-option')[0].click();
    });
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
    // React.Fragment 渲染会导致shallow报错 Shallow rendering works only with custom components, but the provided element type was `symbol`
    const tree = shallow(defaultLabelRenderer('s', 'select')(option));
    expect(tree.find('.select-search-highlight').text()).toBe('s');
  });
});
