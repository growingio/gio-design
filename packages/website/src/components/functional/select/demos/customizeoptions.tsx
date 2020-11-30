import React from 'react';
import { Select, Button } from '@gio-design/components';
import '@gio-design/components/es/components/select/style/index.css';
import '@gio-design/components/es/components/radio/style/css.js';


import { optionsWithoutGroup } from './options';

const CustomizeOptions = (): React.ReactNode => {
    return (
      <>
        <div>
          <Select options={optionsWithoutGroup} size='large' style={{ width: 140 }} placeholder="请选择" listRowHeight={50}>
            <Select.Group label="Manager" value='2'>
              <Select.Option value="jack">
                <div style={{height:'200px'}} className='customizeoptions'>
                  <Button type="secondary" disabled size="large">
                    jack
                  </Button>
                </div>
              </Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option>
            </Select.Group>
            <Select.Group label="Engineer" value='1'>
              <Select.Option value="Yiminghe">yiminghe</Select.Option>
            </Select.Group>
          </Select>
          <div style={{marginTop:'16px'}}>
            <Select options={[]} style={{width: 140}} placeholder="请选择" listRowHeight={50}>
              <Select.Option value="all">全部</Select.Option>
              <Select.Option value="online">已上线</Select.Option>
            </Select>
          </div>
          <div style={{marginTop:16}}>
            <Select options={[]} style={{width: 140}} placeholder="请选择" listRowHeight={50}>
              <Select.Group label="应用平台" value='platform'>
                <Select.Option value="all">全部</Select.Option>
                <Select.Option value="online">已上线</Select.Option>
              </Select.Group>
              
            </Select>
          </div>
        </div>
      </>
    );
};

export default CustomizeOptions;