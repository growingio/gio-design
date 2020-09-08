import React from 'react';
import { render } from 'enzyme';
import Drawer from '..';

describe('Drawer', () => {
  it('render top drawer', () => {
    const wrapper = render(
      <Drawer visible height={400} placement="top" getContainer={false}>
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('have a title', () => {
    const wrapper = render(
      <Drawer visible title="Test Title" getContainer={false}>
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('closable is false', () => {
    const wrapper = render(
      <Drawer visible closable={false} getContainer={false}>
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('destroyOnClose is true', () => {
    const wrapper = render(
      <Drawer destroyOnClose visible={false} getContainer={false}>
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('have a footer', () => {
    const wrapper = render(
      <Drawer visible footer="Test Footer" getContainer={false}>
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('support closeIcon', () => {
    const wrapper = render(
      <Drawer visible closable closeIcon={<span>close</span>} width={400} getContainer={false}>
        Here is content of Drawer
      </Drawer>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
