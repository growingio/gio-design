/* eslint-disable no-console */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { isEqual } from 'lodash';
import Selection from '../Selection';
import List, { Item } from '..';
import { SelectionProps } from '../interface';
import { ListContextProps } from '../context';
import CheckboxItem from '../inner/CheckboxItem';

describe('testing Selection', () => {
  const originalError = console.error
  beforeAll(() => {
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return
      }
      originalError.call(console, ...args)
    }
  })

  afterAll(() => {
    console.error = originalError
  })
  it('render list wrapped by Selection', () => {
    const mockSelectionChange = jest.fn();
    const Select = () => <Selection onChange={v => mockSelectionChange(v)}>
      <List id="l1" title="列表1" >
        <Item value="1">List Item 1</Item>
        <Item disabled value="2">
          List Item 2
        </Item>

      </List>
      <List id="l2" title="列表2">

        <Item value="3">List Item 3,List Item 3,List Item 3,List Item 3,</Item>
        <Item value="4">
          List Item 4
        </Item>

      </List>
      <List needEmpty />
    </Selection>

    const { container } = render(<Select />);

    expect(container.querySelector('.gio-list--selection--title')).toBeTruthy();
    fireEvent.click(screen.getByText('List Item 1'));
    expect(mockSelectionChange).toHaveBeenCalledWith('1')
  });

  it('render list wrapped by Selection with prop[options] ', () => {
    const groupedListOptions: SelectionProps['options'] = [
      { groupId: 'g1', groupName: 'group 1', value: '1.1', label: 'item 1' },
      { groupId: 'g1', groupName: 'group 1', value: '1.2', label: 'item 2' },
      { groupId: 'g2', groupName: 'group 2', value: '2.1', label: 'item 3' },
      { groupId: 'g2', groupName: 'group 2', value: '2.2', label: 'item 4' },
    ]
    const mockSelectionChange = jest.fn();
    const Select = () => <Selection options={groupedListOptions} onChange={(v) => mockSelectionChange(v)} />

    const { container } = render(<Select />);

    expect(container.querySelector('.gio-list--selection--title')).toBeTruthy();
    fireEvent.click(screen.getByText('item 1'));
    expect(mockSelectionChange).toHaveBeenCalledWith('1.1')
  });
  it('render Selection List by children render function', () => {

    const Render = () => <Selection>
      {(context: ListContextProps) => {
        const { value } = context;
        return <><List id="l1" model='multiple' title="列表1" value={value} >
          <Item value="1">List Item 1</Item>
          <Item disabled value="2">
            List Item 2
          </Item>

        </List>
        </>
      }}
    </Selection>;

    render(<Render />);
    expect(screen.queryByText('List Item 1')).toBeTruthy()
  });

  it('render Selection List by children and options', () => {
    const options = [{ groupId: 'g2', groupName: 'group 2', value: '2.1', label: 'item 3' },
    { groupId: 'g2', groupName: 'group 2', value: '2.2', label: 'item 4' },]
    const Render = () => <Selection options={options}>
      <List id="l1" model='multiple' title="列表1"  >
        <Item value="1">List Item 1</Item>
        <Item disabled value="2">
          List Item 2
        </Item>

      </List>
    </Selection>;

    render(<Render />);
    expect(screen.queryByText('List Item 1')).toBeTruthy()
  });
  it('render Selection with recent children type', () => {
    const Recent: React.FC & { isRecent: boolean } = () => <List id="l1" model='multiple' title="列表1"  >
      <Item value="1">List Item 1</Item>
      <Item disabled value="2">
        List Item 2
      </Item>

    </List>;
    Recent.isRecent = true;


    const Render = () => <Selection ><Recent /></Selection>;

    render(<Render />);
    expect(screen.queryByText('List Item 1')).toBeTruthy()
  })

  it('render selection with context',()=>{
    const Render = () => (
      <List.Selection>
            {(context) => {
              const isEqualValue = isEqual(
                Array.from(context.options.values()).reduce((p, v) => [...p, v.value], []),
                context.value
              );
              return (
                <>
                  <CheckboxItem
                    selected={isEqualValue}
                    onClick={() => {
                      if (isEqualValue) {
                        context.onChange([]);
                      } else {
                        context.onChange(Array.from(context.options.keys()));
                      }
                    }}
                    label="全部"
                    value="all"
                  />

                  <List
                    options={[
                      { label: '1', value: '1',groupId:'1',groupName:'第一' },
                      { label: '2', value: '2',groupId:'1',groupName:'第一' },
                    ]}
                    id="id"
                    title="有item"
                  />
                </>
              );
            }}
          </List.Selection>
    )
    render(<Render />);

    expect(screen.queryByText('全部')).toBeTruthy()
  })

  it('render selection with context to be undefined',()=>{
    const Render = () => (
      <List.Selection>
            {() => undefined}
          </List.Selection>
    )
    render(<Render />);
    screen.debug();
    expect(screen.queryByText('全部')).not.toBeTruthy()
  })

  it('render selection with options',()=>{
    const Render = () => (
      <List.Selection options={[
        { label: '1', value: '1',groupId:'1',groupName:'第一' },
        { label: '2', value: '2',groupId:'1',groupName:'第一' },
      ]} />
    )
    render(<Render />);
    expect(screen.queryByText('1')).toBeTruthy()
  })

  it('render selection with option without group',()=>{
    const Render = () => (
      <List.Selection options={[
        { label: '1', value: '1'},
        { label: '2', value: '2'},
      ]} />
    )
    render(<Render />);
    expect(screen.queryByText('1')).toBeTruthy()
  })
})
