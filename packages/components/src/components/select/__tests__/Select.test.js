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
  // For List use AutoSizer.
  // AutoSizer uses offsetWidth and offsetHeight.
  // Jest runs in JSDom which doesn't support measurements APIs.
  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 320 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 160 });
  });

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
    expect(tree.find('.gio-select-arrow').exists()).toBeTruthy();
  });

  it('should have correc dom structure', () => {
    const tree = shallow(<Select options={optionsWithOutGroup} />);
    expect(tree.find('.gio-select').exists()).toBeTruthy();
    expect(tree.find('.gio-select-selector').exists()).toBeTruthy();
    expect(tree.find('.gio-select-values-wrapper').exists()).toBeTruthy();
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
      tree.find('input').simulate('change', { target: { value: '全' } });
    });
    act(() => {
      tree.find('input').simulate('click');
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

  it('select dropdown should display correct search result', () => {
    const tree = mount(<Select options={options} searchable />);
    act(() => {
      tree.simulate('click');
    });
    const dropdown = document.querySelector('.gio-select-dropdown');
    expect(dropdown).not.toBeNull();
    act(() => {
      tree.find('input').simulate('change', { target: { value: '全' } });
    });
    expect(document.querySelectorAll('.gio-select-dropdown .gio-select-option')).toHaveLength(2);
    act(() => {
      tree.find('.gio-select-dropdown .gio-select-option').at(0).simulate('click');
    });
    act(() => {
      expect(tree.find('.gio-select-input-reference.gio-select-item').text()).toBe('全');
    });
    act(() => {
      tree.unmount();
    });
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
        searchable
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
      document.querySelector('.gio-select-dropdown .gio-select-option').click();
    });
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
      document.querySelector('.gio-select-dropdown .gio-select-option').click();
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
      document.querySelector('.gio-select-dropdown').querySelectorAll('.gio-select-option')[0].click();
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
      document.querySelector('.gio-select-dropdown').querySelectorAll('.gio-select-option')[0].click();
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
    const tree = shallow(defaultLabelRenderer('s', 'select')(option));
    expect(tree.find('.select-search-highlight').text()).toBe('s');
  });
});
