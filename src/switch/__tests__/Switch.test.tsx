import { GameOutlined, ListOutlined } from "@gio-design/icons"
import { fireEvent, render, screen, act } from "@testing-library/react"
import React from "react"
import Switch from ".."
import Checkbox from "../../checkbox"

describe('Testing Switch', () => {
  it('render switch', () => {
    const { container } = render(<Switch defaultValue="A">
      <Switch.Item value="A" key="A" prefix={<GameOutlined />}>
        A
      </Switch.Item>
      <Switch.Item value="B" key="B" disabled prefix={<ListOutlined />}>
        B
      </Switch.Item>
    </Switch>);
    expect(container.querySelector('.gio-switch__group')).toBeTruthy();
    expect(screen.queryByTestId('switch')).toBeTruthy();
    expect(container.querySelectorAll('input[type="radio"]').length).toBe(2);
    expect(screen.getByRole('img', { name: 'game-outlined' })).toBeTruthy();

    expect(screen.getByDisplayValue('A')).toHaveAttribute('checked');
  });

  it('render switch with options', () => {
    const { container } = render(<Switch dataTestId="my-switch" defaultValue="A" options={['A', 'B']} />);
    expect(container.querySelector('.gio-switch__group')).toBeTruthy();
    expect(screen.queryByTestId('my-switch')).toBeTruthy();
    expect(container.querySelectorAll('input[type="radio"]').length).toBe(2);

    expect(screen.getByDisplayValue('A')).toHaveAttribute('checked');
  });
  it('should not render children when child type not  SwitchItem or no value provide', () => {
    const { container } = render(<Switch>
      <Checkbox value="A" key="A" >
        A
      </Checkbox>
      <Checkbox value="B" key="B">
        B
      </Checkbox>
      <Switch.Item />
      <span>C</span>
      D
    </Switch>);

    expect(container.querySelector('.gio-switch__group').childElementCount).toBe(0);

  });
  it('support size ', () => {
    const { container } = render(<Switch size="small">
      <Switch.Item value="A" key="A" prefix={<GameOutlined />}>
        A
      </Switch.Item>
      <Switch.Item value="B" key="B" prefix={<ListOutlined />}>
        B
      </Switch.Item>
    </Switch>);
    expect(container.querySelector('.gio-switch__group_small')).toBeTruthy();

  });
  it('controlled value,fire change event when click item ', () => {
    const Demo = () => {
      const [val, setVal] = React.useState<string | undefined>();
      return <Switch defaultValue="A" value={val} options={[{ value: 'A', label: 'A' }, { value: 'B', label: 'B' }]} onChange={(e) => {
        setVal(e.target.value);
      }} />
    }

    render(<Demo />);
    const items = screen.queryAllByTestId('switch-item');
    expect(items.length).toBe(2);
    expect(items[0]).toHaveClass('gio-switch-checked', { exact: false });

    act(() => {
      fireEvent.click(items[1]);
    });
    expect(items[1]).toHaveClass('gio-switch', 'gio-switch-checked');
    expect(items[0]).not.toHaveClass('gio-switch-checked', { exact: false });

  })
  it('jsx controlled value,fire change event when click item ', () => {
    const mockChange = jest.fn();
    const Demo = () => {
      const [val, setVal] = React.useState('A')
      return <Switch value={val} onChange={(e) => {
        setVal(e.target.value);
        mockChange(e);
      }}>
        <Switch.Item value="A" key="A" >
          A
        </Switch.Item>
        <Switch.Item value="B" key="B" >
          B
        </Switch.Item>
      </Switch>
    }

    render(<Demo />);
    const items = screen.queryAllByTestId('switch-item');

    expect(items.length).toBe(2);

    // expect(items[0]).toHaveClass('gio-switch', 'gio-switch-checked');
    act(() => {
      fireEvent.click(items[1]);
    });
    expect(mockChange).toHaveBeenCalled()
    // expect(items[1]).toHaveClass('gio-switch', 'gio-switch-checked');
    // expect(items[0]).not.toHaveClass('gio-switch-checked', { exact: false });

  })
})