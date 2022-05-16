import { render, screen, fireEvent } from '@testing-library/react';
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'
import List from '..';
import CascaderItem from '../inner/CascaderItem'

const { Item, } = List;

function sleep(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
describe('Testing List', () => {


  it('render List', () => {
    render(<List >
      <List.Item value="1">List Item 1</List.Item>
      <Item disabled value="2">
        List Item 2
      </Item>
      <Item value="3">List Item 3</Item>
      <Item value="4">List Item 4</Item>
      <Item value="5">List Item 5</Item>
    </List>);


    expect(screen.queryByTestId('list')).toBeTruthy();
    expect(screen.queryByTestId('list').children?.length).toBe(5);
  })
  it('render List by provide options', () => {
    const options = [{ label: 'List Item 1', value: '1' }, { label: ' List Item 2', value: '2' }]
    render(<List options={options} />);
    expect(screen.queryByTestId('list')).toBeTruthy();
    expect(screen.queryByTestId('list').children?.length).toBe(2);
  });

  it('test render constom ListItem ', () => {
    const options = [{ label: 'List Item 1', value: '1' }, { label: ' List Item 2', value: '2' }]
    render(<List options={options} renderItem={(opt) => <span title="renderItem">{opt.label}</span>} />);
    expect(screen.queryAllByTitle('renderItem').length).toBe(2);
  })
  it('render List with collapse', () => {
    const mockClick = jest.fn();
    render(<List collapse={2} onClick={mockClick}>
      <List.Item value="1">List Item 1</List.Item>
      <Item disabled value="2">
        List Item 2
      </Item>
      <Item value="3">List Item 3</Item>
      <Item value="4">List Item 4</Item>
      <Item value="5">List Item 5</Item>
    </List>);


    expect(screen.queryByTestId('list')).toBeTruthy();
    expect(screen.queryByTestId('list').children?.length).toBe(3);
    fireEvent.click(screen.queryByTestId('list').children[0]);
    // click collapse-item should expand list
    fireEvent.click(screen.queryByTestId('list').children[2]);
    expect(mockClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByTestId('list').children?.length).toBe(5);
  })
  it('render Empty when no children', () => {
    const { container, rerender } = render(<List needEmpty />);


    expect(container.querySelector('.gio-list')).toBeTruthy();
    expect(container.querySelector('.gio-list--empty')).toBeTruthy()
    rerender(<List needEmpty={false} />);
    expect(container.querySelector('.gio-list')).toBeFalsy();
  })
  it('render custom Empty node when no children', () => {
    const { container } = render(<List needEmpty empty={<span>无数据</span>} />);

    expect(container.querySelector('.gio-list')).toBeTruthy();
    expect(container.querySelector('.gio-list--empty')).toBeTruthy();
    expect(screen.getByText('无数据')).toBeTruthy();
  })
  it('trigger change event', () => {
    const mockChange = jest.fn();
    const Demo = () => {
      const [value, setValue] = useState('');
      const handleChange = (v?: string) => {
        setValue(v);
        mockChange(v);
      };
      return <List value={value} onChange={handleChange}>
        <Item value="1">List Item 1</Item>
        <Item disabled value="2">
          List Item 2
        </Item>
        <Item value="3">List Item 3</Item>
        <Item value="4">List Item 4</Item>
        <Item value="5">List Item 5</Item>
      </List>
    };
    render(<Demo />);
    fireEvent.click(screen.queryByTestId('list').children[0]);
    expect(mockChange).toHaveBeenLastCalledWith('1');
  })
  it('test change event when model=multiple', () => {

    const mockChange = jest.fn();
    const mockMultipleOverflow = jest.fn();
    const Demo = () => {
      const [value, setValue] = useState([]);
      const handleChange = (v?: Array<string | number>) => {
        setValue(v);
        mockChange(v);
      };
      return <List model="multiple" max={3} value={value} onChange={handleChange} onMultipleOverflow={mockMultipleOverflow}>
        <Item value="1">List Item 1</Item>
        <Item disabled value="2">
          List Item 2
        </Item>
        <Item value="3">List Item 3</Item>
        <Item value="4">List Item 4</Item>
        <Item value="5">List Item 5</Item>
      </List>
    };
    render(<Demo />);
    expect(screen.queryAllByTestId('checkbox')?.length).toBe(5);
    fireEvent.click(screen.queryByTestId('list').children[0]);
    fireEvent.click(screen.queryByTestId('list').children[1]);
    fireEvent.click(screen.queryByTestId('list').children[2]);
    fireEvent.click(screen.queryByTestId('list').children[3]);
    expect(mockChange).toHaveBeenCalledTimes(3);
    expect(mockMultipleOverflow).toHaveBeenCalledTimes(1);
    expect(mockChange).toHaveBeenLastCalledWith(['1', '3', '4']);
  })


})

describe('Testing Cascader List', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  });

  afterEach(() => {
    jest.useRealTimers();
  });


  it('testing cascader', async () => {

    const mockChange = jest.fn();
    const Demo = () => {
      const [cascaderValue, setCascadervalue] = useState('1.1-1');
      return <List
        model="cascader"
        value={cascaderValue}
        onChange={(val) => {
          setCascadervalue(val as string);
          mockChange(val);
        }}
      >
        <CascaderItem label="1" value="1">
          <List>
            <Item label="1-1" value="1-1" />
            <Item label="1-2" value="1-2" />
          </List>
        </CascaderItem>
        <CascaderItem label="2" value="2">
          <List>
            <Item label="2-1" value="2-1" />
            <Item label="2-2" value="2-2" />
          </List>
        </CascaderItem>
        <CascaderItem label="3" value="3" />
        <CascaderItem label="4" value="4">
          <List>
            <CascaderItem label="4-1" value="4-1">
              <List>
                <Item label="4-1-1" value="4-1-1" />
                <Item label="4-1-2" value="4-1-2" />
              </List>
            </CascaderItem>
          </List>
        </CascaderItem>
      </List>
    }

    const { container, unmount } = render(<Demo />);
    expect(container.querySelector('.gio-cascader')).toBeTruthy();
    await act(async () => {
      userEvent.hover(screen.queryAllByTitle('2')?.[0], {});
      await sleep(600)
    })
    expect(screen.queryAllByTitle('2-1')[0]).toBeTruthy();

    fireEvent.click(screen.queryAllByTitle('2-1')[0]);

    expect(mockChange).toHaveBeenCalledTimes(1);
    expect(mockChange).toHaveBeenCalledWith("2.2-1");
    unmount();

  })
})