import '@gio-design/components/es/components/form/style/index.css';

import './index.less';

import React, { useState } from 'react';

import { Form, Input, Radio, Select, Toggles, Upload, Button } from '@gio-design/components';
import { SizeType } from '@gio-design/components/es/components/config-provider/SizeContext';
import Checkbox, { CheckboxGroup } from '@gio-design/components/es/components/checkbox';
import DatePicker from '@gio-design/components/es/components/date-picker';
import moment, { Moment } from 'moment';

import { props, action } from '../../upload/demos/commonSets';

const { Item, useForm } = Form;
const { Group } = Radio;
const options = ['0', '1', '2'].map((n) => ({ label: `option-${n}`, value: n }));

export interface Props {
  name: string;
  size?: SizeType;
}

const Inputs: React.FC<Props> = ({ name, size }: Props) => {
  const [form] = useForm();
  const [datepicker, setDatePicker] = useState(moment(new Date()));
  const [checkboxValues, setCheckboxValues] = useState(['0']);
  const onDatepickerChange = (d: Moment | null) => {
    if (d) setDatePicker(d);
  };
  const onClick = () => {
    console.log(form.getFieldsValue());
  };

  return (
    <Form form={form} name={name} size={size} initialValues={{ radio: 0, select: 0 }} layout="vertical">
      <Item name="input" label="Input">
        <Input />
      </Item>
      <Item name="radio" label="Radio">
        <Group>
          <Radio value={0}>Radio-1</Radio>
          <Radio value={1}>Radio-2</Radio>
          <Radio value={2}>Radio-3</Radio>
        </Group>
      </Item>
      <Item name="select" label="Select">
        <Select options={options} width={300} />
      </Item>
      <Item name="toggles" label="Toggles" valuePropName="checked">
        <Toggles />
      </Item>
      <Item name="checkbox" label="Checkbox">
        <CheckboxGroup defaultValue={checkboxValues} onChange={setCheckboxValues}>
          <Checkbox value="0">checkbox-0</Checkbox>
          <Checkbox value="1">checkbox-1</Checkbox>
          <Checkbox value="2">checkbox-2</Checkbox>
        </CheckboxGroup>
      </Item>
      <Item name="datepicker" label="Datepicker">
        <DatePicker
          showFooter
          value={datepicker}
          onChange={onDatepickerChange}
          onSelect={onDatepickerChange}
          format="YYYY/MM/DD"
        />
      </Item>
      <Item name="upload" label="Upload">
        <Upload action={action} {...props} />
      </Item>

      <Item>
        <Button type="primary" onClick={onClick}>
          提交
        </Button>
        <Button type="secondary">取消</Button>
      </Item>
    </Form>
  );
};

export default Inputs;
