import React from 'react';
import _ from 'lodash';
import { mount, render } from 'enzyme';
import Breadcrumb from '../index';

describe('Breadcrumb', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(_.noop);
  const routes = [
    {
      path: 'index',
      breadcrumbName: 'home',
    },
    {
      path: 'first',
      breadcrumbName: 'first',
      children: [
        {
          path: '/general',
          breadcrumbName: 'General',
        },
        {
          path: '/layout',
          breadcrumbName: 'Layout',
        },
        {
          path: '/navigation',
          breadcrumbName: 'Navigation',
        },
      ],
    },
    {
      path: 'second',
      breadcrumbName: 'second',
    },
    {
      path: 'third',
    },
  ];

  afterEach(() => {
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('warns on non-Breadcrumb.Item and non-Breadcrumb.Separator children', () => {
    const MyCom = () => <div>foo</div>;
    mount(
      <Breadcrumb>
        <MyCom />
      </Breadcrumb>
    );
    expect(errorSpy.mock.calls).toHaveLength(1);
    expect(errorSpy.mock.calls[0][0]).toMatch(
      "Warning: [gio: Breadcrumb] Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children"
    );
  });

  it('should allow Breadcrumb.Item is null or undefined', () => {
    const wrapper = render(
      <Breadcrumb>
        {null}
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        {undefined}
      </Breadcrumb>
    );
    expect(errorSpy).not.toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it('should not display Breadcrumb Item when its children is falsy', () => {
    const wrapper = render(
      <Breadcrumb>
        <Breadcrumb.Item />
        <Breadcrumb.Item>xxx</Breadcrumb.Item>
        <Breadcrumb.Item>yyy</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('filter React.Fragment', () => {
    const wrapper = render(
      <Breadcrumb separator="">
        <Breadcrumb.Item>Location</Breadcrumb.Item>
        <Breadcrumb.Separator>:</Breadcrumb.Separator>
        <>
          <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
          <Breadcrumb.Separator />
        </>
      </Breadcrumb>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render routes', () => {
    const wrapper = render(<Breadcrumb routes={routes} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render routes with params', () => {
    const wrapper = render(<Breadcrumb routes={routes} params={{ first: 1, last: 1 }} />); 
    expect(wrapper).toMatchSnapshot();
  });

  it('should accept undefined routes', () => {
    const wrapper = render(<Breadcrumb routes={undefined} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should support custom attribute', () => {
    const wrapper = render(
      <Breadcrumb data-custom="custom">
        <Breadcrumb.Item data-custom="custom-item">xxx</Breadcrumb.Item>
        <Breadcrumb.Item>yyy</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support React.Fragment and falsy children', () => {
    const wrapper = render(
      <Breadcrumb>
        <>
          <Breadcrumb.Item>yyy</Breadcrumb.Item>
          <Breadcrumb.Item>yyy</Breadcrumb.Item>
        </>
        <Breadcrumb.Item>yyy</Breadcrumb.Item>
        {0}
        {null}
        {undefined}
      </Breadcrumb>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should support Breadcrumb.Item default separator', () => {
    const MockComponent = () => (
      <span>
        <Breadcrumb.Item>Mock Node</Breadcrumb.Item>
      </span>
    );
    const wrapper = render(
      <Breadcrumb>
        <Breadcrumb.Item>Location</Breadcrumb.Item>
        <MockComponent />
        <Breadcrumb.Item>Application Center</Breadcrumb.Item>
      </Breadcrumb>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('can replace the content after :',() => {
    const route = [
      {
        path: 'components',
        breadcrumbName: '首页',
      },
      {
        path: 'basic',
        breadcrumbName: '一级面:包屑',
      },
      {
        path: 'breadcrumb',
        breadcrumbName: '二级面包屑',
      },
    ]
    const wrapper = render(
      <Breadcrumb routes={route} params={{面:'背',包:'条'}} />
    )
    expect(wrapper).toMatchSnapshot();
  })
});
