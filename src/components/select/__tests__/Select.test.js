/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import '../../../../es/components/select/style/index.css';
import renderer from 'react-test-renderer';
import { render as testRender, screen, waitFor } from '@testing-library/react';
import { shallow, mount, render } from 'enzyme';
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

describe('<Select /> Single Multiple options or groupOptions ', () => {
  it('renders <Select /> components', () => {
    const tree = renderer.create(<Select defaultValue="all" options={options} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders <Select /> components', () => {
    const tree = renderer.create(<Select defaultValue="all" options={optionsWithOutGroup} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders <Select /> components multiple useFooter useAll mode', () => {
    const tree = renderer
      .create(<Select defaultValue="all" multiple mode="tags" useFooter useAll options={optionsWithOutGroup} />)
      .toJSON();
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
    expect(tree.find(Selector).shallow().find('.gio-select-selector').exists()).toBeTruthy();
    expect(tree.find(Selector).shallow().find('.gio-select-values-wrapper').exists()).toBeTruthy();
    expect(tree.find(Selector).shallow().find('.gio-select-arrow').exists()).toBeTruthy();
    // tree.unmount();
  });

  it('should have correc dom structure', () => {
    const tree = shallow(<Select options={optionsWithOutGroup} />);
    expect(tree.find(Selector).shallow().find('.gio-select-selector').exists()).toBeTruthy();
    expect(tree.find(Selector).shallow().find('.gio-select-values-wrapper').exists()).toBeTruthy();
    expect(tree.find(Selector).shallow().find('.gio-select-arrow').exists()).toBeTruthy();
    // tree.unmount();
  });

  it('should have correct classes', () => {
    const tree = shallow(<Select options={options} />);
    act(() => {
      tree.setProps({ size: 'small' });
    });
    expect(tree.find(Selector).shallow().find('.gio-select-small').exists()).toBeTruthy();
    act(() => {
      tree.setProps({ size: 'middle' });
    });
    expect(tree.find(Selector).shallow().find('.gio-select-middle').exists()).toBeTruthy();
    act(() => {
      tree.setProps({ size: 'large' });
    });
    expect(tree.find(Selector).shallow().find('.gio-select-large').exists()).toBeTruthy();
  });

  it('select dropdown should display correct search result', () => {
    const tree = mount(<Select options={optionsWithOutGroup} searchable="default" />);
    expect(document.querySelector('.gio-select-dropdown')).toBeNull();
    tree.simulate('click');
    expect(document.querySelector('.gio-select-dropdown')).not.toBeNull();
    tree.find('input').simulate('change', { target: { value: 'demo' } });

    expect(document.querySelector('.gio-select-dropdown').querySelector('.not-found-context')).not.toBeNull();
    tree.find('input').simulate('change', { target: { value: '全' } });
    expect(document.querySelector('.gio-select-dropdown').querySelectorAll('.gio-select-list-option')).toHaveLength(1);
    tree.unmount();
  });
  it('select dropdown should allowCustomOption', () => {
    const tree = mount(<Select options={optionsWithOutGroup} searchable="default" allowCustomOption />);
    expect(document.querySelector('.gio-select-dropdown')).toBeNull();
    tree.simulate('click');
    expect(document.querySelector('.gio-select-dropdown')).not.toBeNull();
    tree.find('input').simulate('change', { target: { value: 'demo' } });
    expect(document.querySelector('.gio-select-dropdown').querySelectorAll('.gio-select-list-option')).toHaveLength(1);
    tree.unmount();
  });
});

describe('<Select /> allowClear onClear onAllowClear', () => {
  it('allowClear onClear onAllowClear', () => {
    const tree = mount(
      <Select options={optionsWithOutGroup} searchable="default" allowClear allowCustomOption useFooter />
    );
    act(() => {
      tree.simulate('click');
    });
    tree.find('input').simulate('click');
    act(() => {
      tree.find('input').simulate('change', { target: { value: '全部' } });
    });
    document.querySelector('.gio-select-dropdown .gio-select-list-option').click();
    tree.find('#selector').simulate('mouseenter').find('.gio-select-arrow').simulate('click');
    expect(tree.find('input').text()).toBe('');
    act(() => {
      tree.find('input').simulate('change', { target: { value: '全部' } });
    });
    tree.find('#selector').simulate('mouseenter').find('.gio-select-arrow').simulate('click');
    expect(tree.find('input').text()).toBe('');
    tree.unmount();
  });
  it('allowClear', () => {
    const tree = mount(<Select options={optionsWithOutGroup} multiple allowClear searchable="default" />);
    act(() => {
      tree.find('input').simulate('change', { target: { value: '全部' } });
    });
    tree.find('#selector').simulate('mouseenter').find('.gio-select-arrow').simulate('click');
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
        searchable="default"
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

describe('input to be create extendedOptions', () => {
  it('create extendedOptions', () => {
    const tree = mount(
      <Select options={optionsWithOutGroup} mode="tags" multiple searchable="default" allowCustomOption />
    );
    act(() => {
      tree.simulate('click');
    });
    act(() => {
      tree.find('input').simulate('change', { target: { value: '苹果皮' } });
    });
    act(() => {
      document.querySelector('.gio-select-dropdown .gio-select-list-option').click();
    });
    expect(tree.render().find('.gio-select-values-wrapper').children('.gio-tag')).toHaveLength(1);
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
        searchable="default"
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

describe('<Select allowCustomOptions multiple/> keyDown', () => {
  it('keyDown tab focus and blur', () => {
    const tree = mount(<Select multiple mode="tags" options={optionsWithOutGroup} />);
    act(() => {
      tree.find('.gio-select').simulate('focus');
    });
    act(() => {
      tree.find('.gio-select').simulate('blur');
    });
    act(() => {
      tree.unmount();
    });
  });
  it('keyDown tab focus and Esc', () => {
    const tree = mount(<Select multiple mode="tags" options={optionsWithOutGroup} />);
    act(() => {
      tree.find('.gio-select').simulate('focus');
    });
    act(() => {
      tree.find('.gio-select').simulate('keyDown', { keyCode: 27, key: 'Esc' });
    });
    act(() => {
      tree.unmount();
    });
  });
  it('keyDown', async () => {
    const tree = mount(<Select multiple mode="tags" options={optionsWithOutGroup} />);
    act(() => {
      tree.find('.gio-select').simulate('focus');
    });
    act(() => {
      tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
    });
    expect(document.querySelector('.gio-select-dropdown')).not.toBeNull();
    act(() => {
      tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
    });

    act(() => {
      tree.unmount();
    });
  });
  // it('keyDown tab not useFooter', () => {
  //   const tree = mount(<Select multiple mode="tags" options={optionsWithOutGroup} />);
  //   act(() => {
  //     tree.find('.gio-select').simulate('focus');
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   expect(document.querySelector('.gio-select-dropdown')).not.toBeNull();
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 9, key: 'Tab' });
  //   });
  //   act(() => {
  //     tree.unmount();
  //   });
  // });
  // it('keyDown useFooter onConfirm', () => {
  //   const tree = mount(<Select multiple mode="tags" useFooter options={optionsWithOutGroup} />);
  //   act(() => {
  //     tree.find('.gio-select').simulate('focus');
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 13, key: 'Enter' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 13, key: 'Enter' });
  //   });
  //   expect(tree.render().find('.gio-select-values-wrapper').children('.gio-tag')).toHaveLength(1);
  //   act(() => {
  //     tree.unmount();
  //   });
  // });

  // it('keyDown onCancel', () => {
  //   const tree = mount(<Select multiple mode="tags" useFooter options={optionsWithOutGroup} />);
  //   act(() => {
  //     tree.find('.gio-select').simulate('focus');
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 13, key: 'Enter' });
  //   });
  //   expect(tree.render().find('.gio-select-values-wrapper').children('.gio-tag')).toHaveLength(1);
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 13, key: 'Enter' });
  //   });
  //   expect(tree.render().find('.gio-select-values-wrapper').children('.gio-tag')).toHaveLength(0);
  //   act(() => {
  //     tree.unmount();
  //   });
  // });

  // it('keyDown tab', () => {
  //   const tree = mount(<Select multiple mode="tags" useFooter options={optionsWithOutGroup} />);
  //   act(() => {
  //     tree.find('.gio-select').simulate('focus');
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 38, key: 'ArrowUp' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 38, key: 'ArrowUp' });
  //   });
  //   act(() => {
  //     tree.unmount();
  //   });
  // });
  // it('keyDown esc', () => {
  //   const tree = mount(<Select multiple mode="tags" useFooter options={optionsWithOutGroup} />);
  //   act(() => {
  //     tree.find('.gio-select').simulate('focus');
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 40, key: 'ArrowDown' });
  //   });
  //   act(() => {
  //     tree.find('.gio-select').simulate('keyDown', { keyCode: 27, key: 'Esc' });
  //   });
  //   act(() => {
  //     tree.unmount();
  //   });
  // });
});

describe('<Select /> when press delete key will unselect current option', () => {
  it('should be able to create by enter', () => {
    const tree = mount(<Select searchable="default" options={options} defaultValue="all" />);
    act(() => {
      tree.simulate('click');
    });
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
    const tree = mount(<Select searchable="default" options={tooltipOptions} />);
    act(() => {
      tree.simulate('click');
    });
    expect(document.querySelector('.gio-tooltip')).toBe(null);
    act(() => {
      document.querySelector('.gio-select-dropdown').querySelectorAll('.gio-select-list-option')[0].click();
    });
    // expect(wrapper.find('.gio-tooltip-inner-title').text()).toBe('这是一个很长的文字');
    tree.unmount();
  });
});
describe('<Select /> when press delete key will unselect current option', () => {
  it('should be able to create by enter', () => {
    const onDeSelect = (v, o) => {
      expect(v).toBe('all');
      expect(o).toMatchObject({ label: '全部', value: 'all' });
    };

    const tree = mount(
      <Select
        multiple
        searchable="default"
        mode="tags"
        options={options}
        defaultValue={['all']}
        onDeselect={onDeSelect}
      />
    );

    act(() => {
      tree.find('.gio-tag .gio-tag-closable-icon').at(0).simulate('click');
    });

    expect(tree.render().find('.gio-select-values-wrapper').children()).toHaveLength(2);
    tree.unmount();
  });
});

describe('<Select /> deselect list', () => {
  it('should be able to create by enter', () => {
    const onDeselect = (v, o) => {
      expect(v).toBe('all');
      expect(o).toMatchObject({ label: '全部', value: 'all' });
    };

    const tree = mount(
      <Select
        multiple
        searchable="default"
        options={optionsWithOutGroup}
        defaultValue={['all']}
        onDeselect={onDeselect}
      />
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
  it('onDeselect useFooter tempValue', () => {
    const onDeselect = (v, o) => {
      expect(v).toBe('all');
      expect(o).toMatchObject({ label: '全部', value: 'all' });
    };

    const tree = mount(
      <Select
        multiple
        searchable="default"
        mode="string"
        options={optionsWithOutGroup}
        useFooter
        onDeselect={onDeselect}
      />
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
    act(() => {
      document.querySelector('.gio-select-dropdown').querySelectorAll('.gio-select-list-option')[0].click();
    });
    expect(tree.render().find('.gio-select-values-wrapper .gio-select-item-all-text').text()).toBe('');
    tree.unmount();
  });
});

describe('<Select /> deselect list', () => {
  it('should be able to create by enter', () => {
    const tree = mount(
      <Select
        searchable="default"
        options={optionsWithOutGroup}
        defaultValue="all"
        allowDeselect
        onDeselect={onDeSelect}
      />
    );

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

describe('<Select /> onAllClick click all or cencel useFooter click onConfim onCencel', () => {
  it('onAllClick mode = tags', () => {
    const tree = mount(
      <Select multiple mode="tags" options={optionsWithOutGroup} useAll useFooter searchable="default" allowClear />
    );
    act(() => {
      tree.simulate('click');
    });
    act(() => {
      document.querySelector('.gio-select-dropdown .gio-select-list-option-all').click();
    });

    expect(tree.render().find('.gio-select-values-wrapper').children('.gio-tag')).toHaveLength(5);
    act(() => {
      document.querySelector('.gio-select-dropdown .gio-select-list-option-all').click();
    });

    expect(tree.render().find('.gio-select-values-wrapper').children('.gio-tag')).toHaveLength(0);

    act(() => {
      document.querySelector('.gio-select-dropdown .gio-select-list-option-all').click();
    });

    act(() => {
      document
        .querySelector('.gio-select-dropdown .gio-select-footer-button-group')
        .querySelectorAll('.gio-btn')[0]
        .click();
    });

    expect(tree.render().find('.gio-select-values-wrapper').children('.gio-tag')).toHaveLength(0);
    act(() => {
      tree.simulate('click');
    });
    act(() => {
      document.querySelector('.gio-select-dropdown .gio-select-list-option-all').click();
    });
    act(() => {
      document
        .querySelector('.gio-select-dropdown .gio-select-footer-button-group')
        .querySelectorAll('.gio-btn')[1]
        .click();
    });
    expect(tree.render().find('.gio-select-values-wrapper').children('.gio-tag')).toHaveLength(5);
    tree.unmount();
  });

  it('onAllClick mode = string', () => {
    const tree = mount(<Select multiple mode="string" options={optionsWithOutGroup} useAll />);
    act(() => {
      tree.simulate('click');
    });
    act(() => {
      document.querySelector('.gio-select-dropdown .gio-select-list-option-all').click();
    });
    expect(tree.render().find('.gio-select-values-wrapper .gio-select-item-all-text').text()).not.toBe('');

    act(() => {
      document.querySelector('.gio-select-dropdown .gio-select-list-option-all').click();
    });
    expect(tree.render().find('.gio-select-values-wrapper .gio-select-item-all-text').text()).toBe('');
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
    // React.Fragment 渲染会导致shallow报错 Shallow rendering works only with custom components, but the provided element type was `symbol`
    const tree = shallow(defaultLabelRenderer('s', 'select')(option));
    expect(tree.find('.select-search-highlight').text()).toBe('s');
  });
});
