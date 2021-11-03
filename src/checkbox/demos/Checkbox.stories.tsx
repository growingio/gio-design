import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { withDesign } from 'storybook-addon-designs';
import Checkbox, { CheckboxGroup } from '../index';
import { CheckboxProps, CheckboxGroupProps, CheckboxValueType } from '../interface';
import '../style';
import Docs from './CheckboxPage';

export default {
  title: 'Upgraded/Checkbox',
  component: Checkbox,
  subcomponents: { CheckboxGroup },
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lLYusioN7e9ifkQnIXeT4G/GIO-Design-(Running-File)?node-id=4078%3A37260',
      allowFullscreen: true,
    },
    docs: {
      page: Docs,
    },
  },
} as Meta;

const DemoTemplate = () => {
  const [checked, setChecked] = React.useState(false);
  const handleChange = (e: any) => {
    setChecked(e.target.checked);
  };
  return (
    <>
      <table style={{ marginBottom: 50 }} className="table-demo">
        <tr>
          <th>Checkbox status</th>
          <th>Example</th>
        </tr>

        <tr>
          <td>Normal</td>
          <td>
            <Checkbox checked={checked} onChange={null}>
              我已阅读以下条款
            </Checkbox>
          </td>
        </tr>
        <tr>
          <td>checked</td>
          <td>
            <Checkbox checked onChange={handleChange}>
              我已阅读以下条款
            </Checkbox>
          </td>
        </tr>

        <tr>
          <td>Partially </td>
          <td>
            <Checkbox checked onChange={handleChange} indeterminate>
              我已阅读以下条款
            </Checkbox>
          </td>
        </tr>
        <tr>
          <td>Disable Normal</td>
          <td>
            <Checkbox disabled>我已阅读以下条款</Checkbox>
          </td>
        </tr>
        <tr>
          <td>Disable Checked</td>
          <td>
            <Checkbox checked disabled>
              我已阅读以下条款
            </Checkbox>
          </td>
        </tr>
        <tr>
          <td>Disable Partially Selected</td>
          <td>
            <Checkbox checked disabled indeterminate>
              我已阅读以下条款
            </Checkbox>
          </td>
        </tr>
        <tr>
          <td>color checked</td>
          <td>
            <Checkbox checked style={{ background: 'red', borderColor: 'red' }}>
              我已阅读以下条款
            </Checkbox>
          </td>
        </tr>
        <tr>
          <td>color indeterminate</td>
          <td>
            <Checkbox checked indeterminate style={{ background: 'red', borderColor: 'red' }}>
              我已阅读以下条款
            </Checkbox>
          </td>
        </tr>
      </table>
      <table className="table-demo">
        <tr>
          <th>Checkbox.Group</th>
          <th>layout</th>
        </tr>
        <tr>
          <td>vertical</td>
          <td>
            <Checkbox.Group
              layout="vertical"
              defaultValue={[2]}
              options={[
                { label: '我已阅读以下条款一', value: 1 },
                { label: '我已阅读以下条款二', value: 2 },
                { label: '我已阅读以下条款三', value: 3, disabled: true },
              ]}
            />
          </td>
        </tr>
        <tr>
          <td>horizontal</td>
          <td>
            <Checkbox.Group
              layout="horizontal"
              defaultValue={[2]}
              options={[
                { label: '我已阅读以下条款一', value: 1 },
                { label: '我已阅读以下条款二', value: 2 },
                { label: '我已阅读以下条款三', value: 3, disabled: true },
              ]}
            />
          </td>
        </tr>
      </table>
    </>
  );
};

export const Demo = DemoTemplate.bind({});

const Template: Story<CheckboxProps> = (args) => {
  const [checked, setChecked] = React.useState(true);
  const handleChange = (e: any) => {
    setChecked(e.target.checked);
  };
  return (
    <Checkbox {...args} checked={checked} onChange={handleChange}>
      我已阅读以下条款
    </Checkbox>
  );
};

const TemplateGroup: Story<CheckboxGroupProps<CheckboxValueType>> = (args) => <Checkbox.Group {...args} />;

export const Default = Template.bind({});

export const Indeterminate = Template.bind({});

Indeterminate.args = {
  indeterminate: true,
};

Default.args = {};
export const Group = TemplateGroup.bind({});

Group.args = {
  layout: 'horizontal',
  defaultValue: [2],
  options: [
    { label: '我已阅读以下条款一', value: 1 },
    { label: '我已阅读以下条款二', value: 2 },
    { label: '我已阅读以下条款三', value: 3, disabled: true },
  ],
};
