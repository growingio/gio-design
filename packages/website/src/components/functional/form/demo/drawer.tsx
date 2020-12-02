import '@gio-design/components/es/components/form/style/index.css';

import './index.less';

import React, { useState } from 'react';

import { Form, Alert, Drawer, Button, Input } from '@gio-design/components';
import { Close } from '@gio-design/icons';

const { Item, List, useForm } = Form;

const initialValues = {
  pagename: '官网首页',
  describe: '用于统计官网首页的浏览数据，误改勿删！',
  domain: 'www.growingio.com',
  pathname: '/features/',
  query: ['id=9785', 'campaign=9785'],
};

const initQueryList = ['id=9785', 'campaign=9785'];

export default (): JSX.Element => {
  const [form] = useForm();
  const [visible, setVisible] = useState(false);
  const [queryList, setQueryList] = useState(initQueryList);
  const addQueryField = () => {
    setQueryList([...queryList, '']);
  };

  return (
    <div>
      <Button onClick={() => setVisible(true)}>click me</Button>

      <Drawer
        title="事件详情"
        visible={visible}
        className="with-drawer"
        closable
        mask
        width={460}
        onClose={() => setVisible(false)}
      >
        <Form labelWidth={80} initialValues={initialValues} form={form}>
          <h3 className="headline">
            <div>
              <i className="count">1</i>
              <span>基本信息</span>
            </div>
          </h3>

          <Item label="页面名称" name="pagename">
            <Input />
          </Item>
          <Item label="描述" name="describe">
            <Input.TextArea placeholder="请输入描述" />
          </Item>

          <h3 className="headline">
            <div>
              <i className="count">2</i>
              <span>基本信息</span>
            </div>
            <a href="#any">如何定义一组页面？</a>
          </h3>

          <Alert
            showIcon
            size="small"
            // prettier-ignore
            message={(
              <div style={{wordBreak: 'break-all'}}>
                <span>现在定义的是页面 </span>
                <a href="#alert">www.growingio.com/features/</a>
                <span>，查询条件为</span>
                <a href="#alert">id=9785&#x26;campaign=9785</a>
                <span>。</span>
              </div>
            )}
          />

          <Item label="域名" name="domain">
            <Input />
          </Item>
          <Item label="路径" name="pathname">
            <Input />
          </Item>

          <List name="query">
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field, index) => (
                  <Item
                    {...field}
                    label={index === 0 ? '查询条件' : ''}
                    afterInput={
                      index > 1 ? (
                        <Button type="assist" onClick={() => remove(field.name)}>
                          <Close />
                        </Button>
                      ) : (
                        ''
                      )
                    }
                  >
                    <Input />
                  </Item>
                ))}

                <Item>
                  <a href="#any" onClick={() => add()}>
                    添加查询条件
                  </a>
                </Item>
              </div>
            )}
          </List>

          <Item>
            <Button
              onClick={() => {
                console.log(form.getFieldsValue());
              }}
            >
              提交
            </Button>
          </Item>
        </Form>
      </Drawer>
    </div>
  );
};
