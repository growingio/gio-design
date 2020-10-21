import '@gio-design/components/es/components/grid/style/index.css';

import React, { useState } from 'react';

import { Grid, Form, Radio, RadioGroup } from '@gio-design/components';

const { Item } = Form;

const options = {
  direction: ['row', 'row-reverse', 'column', 'column-reverse'],
  justify: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
  alignItems: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
  alignContent: ['stretch', 'center', 'flex-start', 'flex-end', 'space-between', 'space-around'],
  wrap: ['nowrap', 'wrap', 'wrap-reverse'],
};

type OptionKey = keyof typeof options;
const optionKeys = Object.keys(options) as OptionKey[];

interface InitState {
  [key: string]: string;
}

const initState: InitState = {};

optionKeys.forEach((key) => {
  const [value] = options[key];
  initState[key] = value;
});

const Base = (): JSX.Element => {
  const [formData, setFormData] = useState(initState);
  const onValuesChange = (value: any) => setFormData({ ...formData, ...value });

  return (
    <div>
      <Grid container gap={1} {...formData} className="box">
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
                {options[key as OptionKey].map((d) => (
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
