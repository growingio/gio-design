import { act, render } from '@testing-library/react';
import React from 'react';
import Cascader from '../Cascader';

describe('<Cascader />', () => {
  it('Should render correctly', () => {
    const { getByDisplayValue } = render(
      <Cascader
        placeholder="Custom Placeholder"
        options={[
          {
            label: 'a',
            value: 'a',
          },
        ]}
      />
    );

    const trigger = getByDisplayValue('Custom Placeholder');

    expect(trigger).toBeInTheDocument();
  });

  it('Should render correctly with default value', () => {
    const { getByDisplayValue } = render(
      <Cascader
        placeholder="Custom Placeholder"
        options={[
          {
            label: 'a',
            value: 'a',
          },
        ]}
        value="a"
      />
    );

    const trigger = getByDisplayValue('a');

    expect(trigger).toBeInTheDocument();
  });

  it('Can select an option', async () => {
    const handleVisibleChange = jest.fn();
    const { getByDisplayValue, getByText } = render(
      <Cascader
        placeholder="Custom Placeholder"
        onVisibleChange={handleVisibleChange}
        options={[
          {
            label: 'a',
            value: 'a',
          },
        ]}
      />
    );

    const trigger = getByDisplayValue('Custom Placeholder');

    await act(async () => {
      trigger.click();
    });

    expect(handleVisibleChange).toHaveBeenCalledWith(true);

    const option = getByText('a');

    await act(async () => {
      option.click();
    });

    expect(trigger).toHaveValue('a');
  });

  it('Can clean the value when click the clear button', async () => {
    const handleClear = jest.fn();
    const { getByDisplayValue, getByText, getByTestId } = render(
      <Cascader
        placeholder="Custom Placeholder"
        allowClear
        onClear={handleClear}
        options={[
          {
            label: 'a',
            value: 'a',
          },
        ]}
      />
    );

    const trigger = getByDisplayValue('Custom Placeholder');

    await act(async () => {
      trigger.click();
    });

    const option = getByText('a');

    await act(async () => {
      option.click();
    });

    expect(trigger).toHaveValue('a');

    await act(async () => {
      trigger.click();
    });

    const clearButton = getByTestId('clean-button');

    await act(async () => {
      clearButton.click();
    });
    expect(handleClear).toHaveBeenCalled();
    expect(trigger).toHaveValue('Custom Placeholder');
  });

  it('Should render a custom trigger', async () => {
    const handleChange = jest.fn();
    const { getByText } = render(
      <Cascader
        options={[
          {
            label: 'a',
            value: 'a',
          },
        ]}
        customTrigger={() => <button type="button">Please Select</button>}
        onChange={handleChange}
      />
    );

    const trigger = getByText('Please Select');

    await act(async () => {
      trigger.click();
    });

    const option = getByText('a');

    await act(async () => {
      option.click();
    });

    expect(handleChange.mock.calls[0][0]).toBe('a');
  });

  it('Should render a title when value is empty', async () => {
    const { getByTitle } = render(
      <Cascader
        options={[
          {
            label: 'a',
            value: 'a',
          },
        ]}
        title="Custom Title"
      />
    );

    const trigger = getByTitle('Custom Title');
    expect(trigger).toBeInTheDocument();
  });

  it('Should hide prefix icon', () => {
    const { queryByText } = render(
      <Cascader
        placeholder="Custom Placeholder"
        hidePrefix
        triggerPrefix={<span>Custom Prefix</span>}
        value="a"
        options={[
          {
            label: 'a',
            value: 'a',
          },
        ]}
      />
    );

    expect(queryByText('Custom Prefix')).toBeNull();
  });

  it('Should render a custom separator', async () => {
    const { getByDisplayValue } = render(
      <Cascader
        placeholder="Custom Placeholder"
        separator="**"
        defaultValue="a.a-a"
        options={[
          {
            label: 'a',
            value: 'a',
            items: [
              {
                label: 'a-a',
                value: 'a-a',
              },
            ],
          },
        ]}
      />
    );

    expect(getByDisplayValue('a**a-a')).toBeInTheDocument();
  });

  it('Should render a custom valueSeparator', async () => {
    const { getByDisplayValue } = render(
      <Cascader
        placeholder="Custom Placeholder"
        valueSeparator="_"
        separator="_"
        defaultValue="a_a-a"
        options={[
          {
            label: 'a',
            value: 'a',
            items: [
              {
                label: 'a-a',
                value: 'a-a',
              },
            ],
          },
        ]}
      />
    );

    expect(getByDisplayValue('a_a-a')).toBeInTheDocument();
  });

  it('clean', async () => {
    const handleChange = jest.fn();
    const { getByTestId, getByText, getByDisplayValue } = render(
      <Cascader
        options={[{ label: 'a', value: 'a' }]}
        placeholder="Custom Placeholder"
        onChange={handleChange}
        allowClear
        defaultValue="a"
      />
    );
    const cleanButton = getByTestId('clean-button');

    await act(async () => {
      cleanButton.click();
    });

    const trigger = getByDisplayValue('Custom Placeholder');

    await act(async () => {
      trigger.click();
    });

    const option = getByText('a');

    await act(async () => {
      option.click();
    });

    expect(handleChange).toHaveBeenCalled();
  });
});
