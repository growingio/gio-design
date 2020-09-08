import React from 'react';
import Tag from '../index';
import {
  isProrupt,
  isLarge,
  isPredifinedColor,
  isPredifinedStatus,
  isToggleClose,
  getTypeClass,
  getStatusClass,
  getColorClass,
  getDeleteToggleClass,
  getDisabledClass,
} from '../Tag';
import '@gio-design/components/es/components/Tag/style/index.css';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('<Tag />', () => {
  it('renders <Tag /> components', () => {
    const tree = renderer.create(<Tag />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have "gio-tag" class', () => {
    const tree = shallow(<Tag />);
    expect(tree.hasClass('gio-tag')).toBe(true);
  });

  it('should have "test-custom-tag" class', () => {
    const tree = shallow(<Tag customizePrefixCls="test-custom-tag" />);
    expect(tree.hasClass('test-custom-tag')).toBe(true);
  });

  it('should have "gio-tag-closable-toggle', () => {
    const tree = shallow(<Tag closable persistCloseIcon={false} />);
    tree.simulate('hover');
    expect(tree.hasClass('gio-tag-closable-toggle')).toBe(true);
    expect(tree.exists('.gio-tag-closable-icon')).toBe(true);
  });

  it('should onClose call back', () => {
    const onClose = (e) => {
      expect(true).toBe(true);
    };
    const tree = shallow(<Tag closable persistCloseIcon onClose={onClose} />);
    tree.find('.gio-tag-closable-icon').simulate('click');
  });
});

describe('Tag condition functions', () => {
  it('isPersistClose', () => {
    expect(isToggleClose(true, true)).toBe(false);
    expect(isToggleClose(true, false)).toBe(true);
    expect(isToggleClose(false, true)).toBe(false);
    expect(isToggleClose(false, false)).toBe(false);
  });
});
