import React, { useState } from 'react';
import { Grid, Form, Radio, RadioGroup } from '@gio-design/components';
import Partial from '../../checkbox/demo/partial';

import '@gio-design/components/es/components/grid/style/index.css';
import './style.less';

const { Item } = Form;

const options = {
  direction: ['row', 'row-reverse', 'column', 'column-reverse'],
  justify: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
  alignItems: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
  alignContent: ['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around'],
  wrap: ['wrap', 'nowrap', 'wrap-reverse'],
} as const;

type Options = typeof options;
type OptionKey = keyof Options;
const optionKeys = Object.keys(options) as Array<OptionKey>;

type InitState = {
  [P in OptionKey]: Options[P][number];
};
const initState = {} as InitState;

optionKeys.forEach((key) => {
  const [value] = options[key];
  (initState[key] as InitState[OptionKey]) = value;
});

const Base = (): JSX.Element => {
  const [formData, setFormData] = useState(initState);
  const onValuesChange = (value: Partial<InitState>) => setFormData({ ...formData, ...value });

  return (
    <div className="flex-props">
      <Grid container gap={1} {...(formData as unknown)} className="box demo">
        <Grid span={12}>span=12</Grid>
        <Grid span={3}>span=3</Grid>
        <Grid span={3}>span=6</Grid>
        <Grid span={3} style={{ height: 140 }}>
          span=3
        </Grid>
      </Grid>

      <div className="box">
        <Form initialValues={formData} onValuesChange={onValuesChange}>
          {optionKeys.map((key) => (
            <Item key={key} name={key} label={`${key}:`}>
              <RadioGroup>
                {(options[key] as readonly string[]).map((d) => (
                  <Radio key={d} value={d}>
                    {d}
                  </Radio>
                ))}
              </RadioGroup>
            </Item>
          ))}
        </Form>
      </div>
    </div>
  );
};

export default Base;
