import React from 'react';
import { mount, render } from 'enzyme';
import Card from '../index';
import Avatar from '../../avatar';

describe('Testing Card', () => {
  it('should be stable', () => {
    const wrapper = render(
      <Card
        title='Title'
        footer='Footer'
        disabled={false}  
        clickable
        style={{ width: 300}}
      >
        <Card.Meta 
          title='Meta Title很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长' 
          description='卡片副标题很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长'
          image={<Avatar>L</Avatar>} 
        >
          这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。这里是卡片的描述，可以有很多很多字。
        </Card.Meta>
      </Card>
    );  
    expect(wrapper).toMatchSnapshot();
  });

  test('onClick can be called when disabled is false and clickable is true', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <Card
        title='Title'
        footer='Footer'
        disabled={false}  
        clickable
        style={{ width: 300}}
        onClick={onClick}
      />
    );
    wrapper.find('.gio-card').at(0).simulate('click');
    expect(onClick).toBeCalled();
    wrapper.setProps({ clickable: false });
    wrapper.find('.gio-card').at(0).simulate('click');
    expect(onClick).toBeCalledTimes(1);
    wrapper.setProps({ disabled: true });
    wrapper.find('.gio-card').at(0).simulate('click');
    expect(onClick).toBeCalledTimes(1);
  });

});