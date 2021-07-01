import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Progress from '../index';
import '@gio-design/components/es/components/Progress/style/index.css';

describe('<Progress />', () => {
  it('render active progress Component', () => {
    const tree = renderer.create(<Progress percent={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render sucess progress Component', () => {
    const tree = renderer.create(<Progress percent={100} status="success" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render error progress Component', () => {
    const tree = renderer.create(<Progress percent={1} status="exception" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render progress with no info', () => {
    const tree = renderer.create(<Progress percent={1} status="exception" showInfo={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('<Progress>', () => {
  it('should has customizePrefixCls class', () => {
    const tree = shallow(<Progress customizePrefixCls="custom-prefix" />);
    expect(tree.hasClass('custom-prefix-progress')).toBe(true);
  });
});

describe('<Progress>', () => {
  it('should render correct stroke width', () => {
    const tree = shallow(<Progress percent={30} />);
    expect(tree.find('.gio-progress-stroke').prop('style').width).toBe('30%');
  });

  it('should render correct stroke width', () => {
    const tree = shallow(<Progress percent={0} />);
    expect(tree.find('.gio-progress-stroke').prop('style').width).toBe('0%');
  });
});

describe('<Progress>', () => {
  it('with custom formater', () => {
    const tree = shallow(<Progress percent={10} format={(percent) => percent} />);
    expect(tree.find('.gio-progress-text').text()).toBe('10');
  });
});
