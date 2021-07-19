import React from 'react';
import { mount, render } from 'enzyme';
import Steps, { Step } from '..';

describe('Testing steps', () => {
  it('basic steps of no children', () => {
    // @ts-ignore
    const wrapper = render(<Steps />);
    expect(wrapper).toMatchSnapshot();
  });

  it('basic steps', () => {
    const wrapper = render(
      <Steps current={0}>
        <Step key="1" />
        <Step key="2" />
        <Step key="3" />
        <Step key="4" />
      </Steps>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('basic steps of having title', () => {
    const wrapper = render(
      <Steps>
        <Step key="1" title="title1" />
        <Step key="2" title="title2" />
        <Step key="3" title="title3" />
        <Step key="4" title="title4" />
        <Step key="5" title="title5" />
      </Steps>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly of having description', () => {
    const wrapper = render(
      <Steps>
        <Step key="1" description="description1" />
        <Step key="2" description="description2" />
        <Step key="3" description="description3" />
        <Step key="4" description="description4" />
      </Steps>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly of having title and description', () => {
    const wrapper = render(
      <Steps>
        <Step key="1" title="title1" description="description1" />
        <Step key="2" title="title2" description="description2" />
        <Step key="3" title="title3" description="description3" />
        <Step key="4" title="title4" description="description4" />
      </Steps>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('clickable steps', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Steps onClick={onClick}>
        <Step key="1" title="title1" description="description1" />
        <Step key="2" title="title2" description="description2" />
        <Step key="3" title="title3" description="description3" />
      </Steps>
    );
    wrapper.find('.gio-steps__item-container').at(1).simulate('click');
    expect(onClick).toHaveBeenCalled()
  });

  it('set current', () => {
    const steps = (
      <Steps current={3}>
        <Step key="1" title="title1" description="description1" />
        <Step key="2" title="title2" description="description2" />
        <Step key="3" title="title3" description="description3" />
      </Steps>
    );
    const wrapper = render(steps);
    expect(wrapper).toMatchSnapshot();

    const wrapper2 = render(React.cloneElement(steps, { current: -1 }));
    expect(wrapper2).toMatchSnapshot();
  });

  it('set finished', () => {
    const wrapper = render(
      <Steps>
        <Step finished key="1" title="title1" description="description1" />
        <Step finished key="2" title="title2" description="description2" />
        <Step finished key="3" title="title3" description="description3" />
      </Steps>
    );
    expect(wrapper.find('.gio-steps__item_finished')).toHaveLength(3);
  });
});
