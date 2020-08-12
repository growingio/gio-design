import * as React from 'react';
import { Drawer, Button, Radio } from '@gio-design/components';

export default class extends React.Component {
  public state = { visible: false, placement: 'left' };

  public showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  public onClose = () => {
    this.setState({
      visible: false,
    });
  };

  public onChange = (e: any) => {
    this.setState({
      placement: e.target.value,
    });
  };

  public render() {
    const { placement, visible } = this.state;
    return (
      <>
        <Radio.Group defaultValue={placement} onChange={this.onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group>
        <Button type="primary" onClick={this.showDrawer}>
          Open
        </Button>
        <Drawer
          title="Basic Drawer"
          placement={placement as any}
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key={placement}
        >
          <div style={{ width: '100%', height: '100%', padding: '16px', border: '1px dashed #DCDFED' }}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </div>
        </Drawer>
      </>
    );
  }
}
