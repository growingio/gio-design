import React from 'react';
import '../../../../es/components/select/style/index.css';
import { fireEvent, render, screen } from '@testing-library/react';
import Select from '../index';
import 'raf/polyfill';
import { CustomOption, defaultLabelRenderer } from '../utils';

const labels = ['全部', '已上线', '待上线', '已下线', '草稿'];
const values = ['all', 'online', 'pending', 'off', 'draft'];
const baseClassName = '.gio-select-dropdown';
const options = values.map((value, index) => ({
  value,
  label: labels[index],
  groupValue: index % 2 === 0 ? 'platform' : 'platform1',
  groupLabel: index % 2 === 0 ? '应用平台' : '应用平台1',
}));

const TitleOptions = values.map((value, index) => ({
  title: `${labels[index]}--title`,
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

const expecialGroupOptions = values.map((value, index) => ({
  value,
  label: labels[index],
  groupValue: undefined,
  groupLabel: undefined,
}));

beforeEach(() => {
  jest.useFakeTimers();
});

describe('render select', () => {
  it('renders <Select /> components', () => {
    render(<Select defaultValue="all" options={options} placeholder="请选择" />);
    expect(screen.getByText('全部')).toBeTruthy();
  });

  it('renders <Select /> components', () => {
    render(<Select defaultValue="all" options={optionsWithOutGroup} placeholder="请选择" />);
    expect(screen.getByText('全部')).toBeTruthy();
  });
  it('renders <Select /> components multiple useFooter useAll mode', () => {
    render(<Select multiple mode="tags" useFooter useAll placeholder="请选择" options={optionsWithOutGroup} />);
    expect(screen.getByText('请选择')).toBeTruthy();
  });
  it('renders <Select.Option /> components', () => {
    render(
      <Select placeholder="请选择">
        <Select.Option value="all">全部</Select.Option>
        <Select.Option value="online">已上线</Select.Option>
        isNotReactElement
        {/* waring ReactElement is Dom Element */}
      </Select>
    );
    expect(screen.getByText('请选择')).toBeTruthy();
  });
  it('renders <Select.Group /> components', () => {
    render(
      <Select placeholder="请选择">
        <Select.Group label="应用平台" value="platform">
          <Select.Option value="all">全部</Select.Option>
          <Select.Option value="online">已上线</Select.Option>
        </Select.Group>
        <Select.Group label="选择" value="change">
          <Select.Option value="yes">Yes</Select.Option>
          <Select.Option value="no">No</Select.Option>
        </Select.Group>
      </Select>
    );
    expect(screen.getByText('请选择')).toBeTruthy();
  });
});
describe('<Select /> Single Multiple options or groupOptions ', () => {
  it('should have correc dom structure', () => {
    const { container } = render(<Select options={options} />);
    expect(container.getElementsByClassName('.gio-select-selector')).toBeTruthy();
    expect(container.getElementsByClassName('.gio-select-values-wrapper')).toBeTruthy();
    expect(container.getElementsByClassName('.gio-select-arrow')).toBeTruthy();
  });

  it('should have correc dom structure', () => {
    const { container } = render(<Select options={optionsWithOutGroup} />);
    expect(container.getElementsByClassName('.gio-select-selector')).toBeTruthy();
    expect(container.getElementsByClassName('.gio-select-values-wrapper')).toBeTruthy();
    expect(container.getElementsByClassName('.gio-select-arrow')).toBeTruthy();
  });

  it('should have correct classes', () => {
    const { container, rerender } = render(<Select options={options} />);
    rerender(<Select options={options} size="small" />);
    expect(container.getElementsByClassName('.gio-select-small')).toBeTruthy();
    rerender(<Select options={options} size="middle" />);
    expect(container.getElementsByClassName('.gio-select-middle')).toBeTruthy();
    rerender(<Select options={options} size="large" />);
    expect(container.getElementsByClassName('.gio-select-large')).toBeTruthy();
  });
});
describe('select dropdown should allowCustomOption', () => {
  it('select dropdown should display correct search result', () => {
    const { container } = render(
      <Select
        options={optionsWithOutGroup}
        labelRenderer={() => (option) => option.label}
        searchType="normal"
        placeholder="请选择"
      />
    );
    expect(container.getElementsByClassName(baseClassName)).toHaveLength(0);
    fireEvent.click(screen.getByText('请选择'));
    expect(container.getElementsByClassName(baseClassName)).not.toBeNull();
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: 'demo' } });
    expect(container.getElementsByClassName('.gio-select-empty')).toHaveLength(0);
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: '全' } });
    expect(screen.getByText('全部')).toBeTruthy();
  });
  it('match portion', () => {
    const { container } = render(
      <Select
        options={optionsWithOutGroup}
        searchType="normal"
        multiple
        mode="tags"
        allowCustomOption
        placeholder="请选择"
      />
    );
    expect(container.getElementsByClassName(baseClassName)).toHaveLength(0);
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: 'demo' } });
    expect(screen.getAllByText('demo')).toHaveLength(2);
    fireEvent.click(screen.getAllByText('demo')[1]);
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: 'dem' } });
    expect(screen.getAllByText('demo')).toHaveLength(1);
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: 'demo' } });
    expect(screen.getAllByText('demo')).toHaveLength(3);
  });
  it('select not allowCustomOption', () => {
    const { container } = render(
      <Select options={optionsWithOutGroup} searchType="normal" multiple mode="tags" placeholder="请选择" />
    );
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: 'demo' } });
    expect(screen.getAllByText('demo')).toHaveLength(1);
  });
  it('select dropdown should input match', () => {
    const { container } = render(
      <Select options={optionsWithOutGroup} searchType="normal" multiple mode="tags" placeholder="请选择" />
    );
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: '全' } });
    expect(screen.getAllByText('全')).toHaveLength(2);
  });
  it('renders <Select /> expecialGroup components', () => {
    render(<Select options={expecialGroupOptions} placeholder="请选择" />);
    fireEvent.click(screen.getByText('请选择'));
    expect(screen.getByText('未分组')).toBeTruthy();
  });
  it('renders <Select> renderlabel with title', () => {
    const { container } = render(<Select options={TitleOptions} searchType="normal" multiple placeholder="请选择" />);
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: '全部' } });
    fireEvent.click(screen.getAllByText('全部')[1]);
    expect(screen.getByText('全部--title')).toBeTruthy();
  });
});

describe('<Select /> allowClear onClear onAllowClear', () => {
  it('allowClear onClear onAllowClear', () => {
    const { container } = render(
      <Select
        options={optionsWithOutGroup}
        searchType="normal"
        allowClear
        allowCustomOption
        useFooter
        placeholder="请选择"
      />
    );
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: '全部' } });
    fireEvent.click(screen.getAllByText('全部')[1]);
    fireEvent.mouseEnter(screen.getAllByText('全部')[0]);
    expect(screen.getByRole('img', { hidden: true })).toBeTruthy();
    fireEvent.click(screen.getByRole('img', { hidden: true }));
    expect(container.getElementsByTagName('input')[0].textContent).toBe('');
  });
  it('allowClear', () => {
    const { container } = render(<Select options={optionsWithOutGroup} multiple allowClear searchType="normal" />);
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: '全部' } });
    fireEvent.mouseEnter(screen.getAllByText('全部')[0]);
    fireEvent.click(screen.getByRole('img', { hidden: true }));
    expect(container.getElementsByTagName('input')[0].textContent).toBe('');
  });
  it('tagDelete', () => {
    render(<Select options={optionsWithOutGroup} multiple mode="tags" placeholder="请选择" />);
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.click(screen.getAllByText('全部')[0]);
    expect(screen.getAllByText('全部')).toHaveLength(2);
    // screen.debug(screen.getAllByRole('img', { hidden:true } ))
    fireEvent.click(screen.getAllByRole('img', { hidden: true })[0]);
    expect(screen.getAllByText('全部')).toHaveLength(1);
  });
});
describe('<Select /> callback functions should work as expected', () => {
  const onChange = (v: any, o: any) => {
    expect(v).toBe('all');
    expect(o).toMatchObject({ label: '全部', value: 'all' });
  };
  const onSearch = (i: any) => {
    expect(i).toBe('全部');
  };
  const onDeSelect = (v: any, o: any) => {
    expect(v).toBe('all');
    expect(o).toMatchObject({ label: '全部', value: 'all' });
  };

  it('onChange, onSelect, onDeselect, OnSearch', () => {
    const { container } = render(
      <Select
        options={optionsWithOutGroup}
        onChange={onChange}
        onDeselect={onDeSelect}
        onSearch={onSearch}
        placeholder="请选择"
        searchType="normal"
        allowDeselect
        allowCustomOption
      />
    );
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: '全部' } });
    fireEvent.click(screen.getAllByText('全部')[1]);
    expect(container.getElementsByClassName('.gio-dropdown.gio-dropdown-hidden')).toHaveLength(0);
  });
});

describe('input to be create extendedOptions', () => {
  it('create extendedOptions', () => {
    const { container } = render(
      <Select
        options={optionsWithOutGroup}
        mode="tags"
        multiple
        searchType="normal"
        allowCustomOption
        placeholder="请选择"
      />
    );
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: '苹果皮' } });
    fireEvent.click(screen.getAllByText('苹果皮')[1]);
    expect(screen.getAllByText('苹果皮')).toHaveLength(2);
  });
});

describe('<Select Multiple /> callback functions should work as expected on multiple mode', () => {
  const onChange = (v: any, o: any) => {
    expect(v).toEqual(['online', 'all']);
    expect(o).toEqual([
      { value: 'online', label: '已上线' },
      { value: 'all', label: '全部' },
    ]);
  };

  const onSelect = (v: any, o: any) => {
    expect(v).toBe('all');
    expect(o).toMatchObject({ label: '全部', value: 'all' });
  };

  const onDeSelect = (v: any, o: any) => {
    expect(v).toBe('all');
    expect(o).toMatchObject({ label: '全部', value: 'all' });
  };

  const onSearch = (i: any) => {
    expect(i).toBe('全部');
  };

  it('onChange, onSelect, onDeselect, OnSearch', () => {
    const { container } = render(
      <Select
        multiple
        options={optionsWithOutGroup}
        onChange={onChange}
        onSelect={onSelect}
        onDeselect={onDeSelect}
        onSearch={onSearch}
        searchType="normal"
        defaultValue={['online']}
        placeholder="请选择"
      />
    );

    fireEvent.click(screen.getByText('已上线'));
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: '全部' } });
    fireEvent.click(container.getElementsByTagName('input')[0]);
    fireEvent.click(screen.getAllByText('全部')[1]);
  });
});
describe('select keyDown', () => {
  it('keyDown tab focus and blur', () => {
    render(<Select multiple mode="tags" options={optionsWithOutGroup} placeholder="请选择" />);
    fireEvent.focus(screen.getByText('请选择'));
    fireEvent.blur(screen.getByText('请选择'));
  });
  it('keyDown tab focus and Esc', () => {
    render(<Select multiple mode="tags" options={optionsWithOutGroup} placeholder="请选择" />);
    fireEvent.focus(screen.getByText('请选择'));
    fireEvent.keyDown(screen.getByText('请选择'), { keyCode: 27, key: 'Esc' });
  });
  it('keyDown mouseEnter', () => {
    const { container } = render(
      <Select multiple mode="tags" searchType="normal" options={optionsWithOutGroup} placeholder="请选择" />
    );
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: '全部' } });
    fireEvent.mouseEnter(screen.getAllByText('全部')[1]);
    fireEvent.click(screen.getAllByText('全部')[1]);
    expect(screen.getAllByText('全部')).toHaveLength(2);
  });

  it('keyDown tab not useFooter', () => {
    const { container } = render(<Select multiple mode="tags" options={options} placeholder="请选择" />);
    fireEvent.click(screen.getByText('请选择'));
    fireEvent.keyDown(screen.getByText('请选择'), { keyCode: 40, key: 'ArrowDown' });
    expect(container.getElementsByClassName(baseClassName)).not.toBeNull();
    fireEvent.keyDown(screen.getByText('请选择'), { keyCode: 9, key: 'Tab' });
  });
  it('keyDown useFooter onConfirm', () => {
    render(
      <div className="gio-select-test">
        <Select
          multiple
          mode="tags"
          useFooter
          options={optionsWithOutGroup}
          getContainer={(node) => node.parentElement}
          placeholder="请选择"
        />
      </div>
    );

    fireEvent.focus(screen.getByRole('combobox', { hidden: true }));
    fireEvent.keyDown(screen.getByRole('combobox', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 13, key: 'Enter' });
    expect(screen.getAllByText('全部')).toHaveLength(2);
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 13, key: 'Enter' });
    expect(screen.getAllByText('已下线')).toHaveLength(2);
  });
});
describe('<Select allowCustomOptions multiple/> keyDown', () => {
  it('keyDown onCancel', () => {
    render(
      <div className="gio-select-test">
        <Select
          multiple
          mode="tags"
          useFooter
          options={optionsWithOutGroup}
          getContainer={(node) => node.parentElement}
        />
      </div>
    );
    fireEvent.focus(screen.getByRole('combobox', { hidden: true }));
    fireEvent.keyDown(screen.getByRole('combobox', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 38, key: 'ArrowUp' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 13, key: 'Enter' });
    expect(screen.getAllByText('已上线')).toHaveLength(2);
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 13, key: 'Enter' });
    expect(screen.getAllByText('已上线')).toHaveLength(1);
  });
  it('keyDown up up up, down down down', () => {
    render(
      <div className="gio-select-test">
        <Select
          multiple
          mode="tags"
          options={options.filter((val, index) => index < 2)}
          getContainer={(node) => node.parentElement}
        />
      </div>
    );
    fireEvent.focus(screen.getByRole('combobox', { hidden: true }));
    fireEvent.keyDown(screen.getByRole('combobox', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 38, key: 'ArrowUp' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 38, key: 'ArrowUp' });
  });

  it('keyDown arrowDown, arrowUp, mouseLeave, mouseEnter', () => {
    render(
      <div className="gio-select-test">
        <Select
          multiple
          mode="tags"
          useFooter
          options={optionsWithOutGroup.filter((val, index) => index < 2)}
          getContainer={(node) => node.parentElement}
        />
      </div>
    );
    fireEvent.focus(screen.getByRole('combobox', { hidden: true }));
    fireEvent.keyDown(screen.getByRole('combobox', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 38, key: 'ArrowUp' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 38, key: 'ArrowUp' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 13, key: 'Enter' });
  });

  it('keyDown esc', () => {
    render(
      <div className="gio-select-test">
        <Select
          multiple
          mode="tags"
          useFooter
          options={optionsWithOutGroup}
          getContainer={(node) => node.parentElement}
        />
      </div>
    );
    fireEvent.focus(screen.getByRole('combobox', { hidden: true }));
    fireEvent.keyDown(screen.getByRole('combobox', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 27, key: 'Esc' });
  });
});

describe('select onConfirm keydown', () => {
  it('onConfirm', () => {
    render(
      <div className="gio-select-test">
        <Select
          multiple
          mode="tags"
          allowClear
          useFooter
          options={optionsWithOutGroup.filter((val, index) => index < 2)}
          getContainer={(node) => node.parentElement}
        />
      </div>
    );
    fireEvent.focus(screen.getByRole('combobox', { hidden: true }));
    fireEvent.keyDown(screen.getByRole('combobox', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 13, key: 'Enter' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 13, key: 'Enter' });
    expect(screen.getAllByText('已上线')).toHaveLength(2);
  });
});

describe('<Select /> when press delete key will unselect current option', () => {
  it('should be able to create by enter', () => {
    render(<Select searchType="normal" options={options} defaultValue="all" />);
    fireEvent.focus(screen.getByRole('combobox', { hidden: true }));
    fireEvent.keyDown(screen.getByRole('combobox', { hidden: true }), { keyCode: 46, key: 'ArrowDown' });
    expect(screen.getAllByText('全部')).toHaveLength(1);
  });
});

describe('<Select /> tooltip', () => {
  it('tooltip', () => {
    render(<Select searchType="normal" options={tooltipOptions} />);
    fireEvent.click(screen.getByRole('combobox', { hidden: true }));
    fireEvent.click(screen.getByText('全部'));
  });
});

describe('<Select /> when press delete key will unselect current option', () => {
  it('should close by tag-icon', () => {
    const onDeSelect = (v: any, o: any) => {
      expect(v).toBe('all');
      expect(o).toMatchObject({ label: '全部', value: 'all' });
    };

    render(
      <Select
        multiple
        searchType="normal"
        mode="tags"
        options={options}
        defaultValue={['all']}
        onDeselect={onDeSelect}
      />
    );
    fireEvent.click(screen.getByText('全部'));
  });
  it('tempValue close by tag-icon', () => {
    render(<Select multiple searchType="normal" mode="tags" useFooter options={optionsWithOutGroup} />);
    fireEvent.focus(screen.getByRole('combobox', { hidden: true }));
    fireEvent.keyDown(screen.getByRole('combobox', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 40, key: 'ArrowDown' });
    fireEvent.keyDown(screen.getByRole('list', { hidden: true }), { keyCode: 13, key: 'Enter' });
    expect(screen.getAllByText('待上线')).toHaveLength(2);
    fireEvent.click(screen.getAllByRole('img', { hidden: true })[0]);
    expect(screen.getAllByText('待上线')).toHaveLength(1);
  });
});

describe('<Select /> deselect list input match', () => {
  it('should be able to onDeselect', () => {
    const onDeselect = (v: any, o: any) => {
      expect(v).toBe('all');
      expect(o).toMatchObject({ label: '全部', value: 'all' });
    };

    const { container } = render(
      <Select
        multiple
        searchType="normal"
        options={optionsWithOutGroup}
        defaultValue={['all']}
        onDeselect={onDeselect}
      />
    );
    fireEvent.click(screen.getByRole('combobox', { hidden: true }));
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: '全部' } });
    fireEvent.click(screen.getAllByText('全部')[1]);
  });
});

describe('<Select /> deselect list', () => {
  it('onDeselect useFooter tempValue', () => {
    const onDeselect = (v: any, o: any) => {
      expect(v).toBe('all');
      expect(o).toMatchObject({ label: '全部', value: 'all' });
    };

    const { container } = render(
      <Select
        multiple
        searchType="normal"
        mode="string"
        options={optionsWithOutGroup}
        useFooter
        onDeselect={onDeselect}
      />
    );
    fireEvent.click(screen.getByRole('combobox', { hidden: true }));
    fireEvent.input(container.getElementsByTagName('input')[0], { target: { value: '全部' } });
    fireEvent.click(screen.getAllByText('全部')[1]);
    fireEvent.click(screen.getAllByText('全部')[1]);
    expect(screen.getAllByText('全部')).toHaveLength(1);
  });
});

describe('<Select /> deselect list onClick', () => {
  it('deselect value', () => {
    const onDeSelect = (v: any, o: any) => {
      expect(v).toBe('all');
      expect(o).toMatchObject({ label: '全部', value: 'all' });
    };
    render(
      <Select
        searchType="normal"
        options={optionsWithOutGroup}
        defaultValue="all"
        allowDeselect
        onDeselect={onDeSelect}
      />
    );
    fireEvent.click(screen.getByRole('combobox', { hidden: true }));
    fireEvent.click(screen.getAllByText('全部')[1]);
    expect(screen.getAllByText('全部')).toHaveLength(1);
  });
});

describe('<Select /> onAllClick click all or cencel useFooter click onConfim onCencel', () => {
  it('onAllClick mode = tags', () => {
    render(
      <Select multiple mode="tags" options={optionsWithOutGroup} useAll useFooter searchType="normal" allowClear />
    );
    fireEvent.click(screen.getByRole('combobox', { hidden: true }));
    fireEvent.click(screen.getAllByText('全部')[0]);
    expect(screen.getAllByText('已上线')).toHaveLength(2);
    expect(screen.getAllByText('草稿')).toHaveLength(2);
    fireEvent.click(screen.getAllByText('全部')[1]);
    expect(screen.getAllByText('已上线')).toHaveLength(1);
    expect(screen.getAllByText('草稿')).toHaveLength(1);
    fireEvent.click(screen.getAllByText('全部')[0]);
    fireEvent.click(screen.getByText('取 消'));
    expect(screen.getAllByText('已上线')).toHaveLength(1);
    expect(screen.getAllByText('草稿')).toHaveLength(1);
    fireEvent.click(screen.getByRole('combobox', { hidden: true }));
    fireEvent.click(screen.getAllByText('全部')[0]);
    fireEvent.click(screen.getByText('确 定'));
    expect(screen.getAllByText('已上线')).toHaveLength(2);
    expect(screen.getAllByText('草稿')).toHaveLength(2);
  });

  it('onAllClick mode = string', () => {
    render(<Select multiple mode="string" options={optionsWithOutGroup} useAll />);
    fireEvent.click(screen.getByRole('combobox', { hidden: true }));
    fireEvent.click(screen.getAllByText('全部')[0]);
    expect(screen.getAllByText('已上线')).toHaveLength(1);
    expect(screen.getAllByText('草稿')).toHaveLength(1);
    fireEvent.click(screen.getAllByText('全部')[0]);
    expect(screen.getAllByText('已上线')).toHaveLength(1);
    expect(screen.getAllByText('草稿')).toHaveLength(1);
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
    expect(defaultLabelRenderer('s', '')(option, true)).toBe('test');
  });
});
