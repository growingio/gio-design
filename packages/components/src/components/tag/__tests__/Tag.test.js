import React from 'react';
import Tag from '../index';
import {
  isProrupt,
  isLarge,
  isPredifinedColor,
  isPredifinedStatus,
  isPersistClose,
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

  it('should have "gio-delete-toggle', () => {
    const tree = shallow(<Tag closable={true} persistCloseIcon={false} />);
    tree.simulate('hover');
    expect(tree.hasClass('gio-tag-delete-toggle')).toBe(true);
    expect(tree.exists('.gio-tag-close')).toBe(true);
  });

  it('should onClose call back', () => {
    const onClose = (e) => {
      expect(true).toBe(true);
    };
    const tree = shallow(<Tag closable={true} persistCloseIcon={true} onClose={onClose} />);
    tree.find('.gio-tag-close').simulate('click');
  });
});

describe('Tag condition functions', () => {
  it('isProrupt', () => {
    expect(isProrupt('prorupt', false)).toBe(true);
    expect(isProrupt('normal', true)).toBe(true);
  });
  it('isLarge', () => {
    expect(isLarge('large')).toBe(true);
  });
  it('isPredifinedColor', () => {
    expect(isPredifinedColor('beta')).toBe(true);
    expect(isPredifinedColor('new')).toBe(true);
    expect(isPredifinedColor('asdljalksdj')).toBe(false);
  });
  it('isPredifinedStatus', () => {
    expect(isPredifinedStatus('success')).toBe(true);
    expect(isPredifinedStatus('warning')).toBe(true);
    expect(isPredifinedStatus('asdljalksdj')).toBe(false);
  });
  it('isPersistClose', () => {
    expect(isPersistClose(false, true)).toBe(false);
    expect(isPersistClose(true, true)).toBe(true);
  });
});

describe('Tag conditional classes functions', () => {
  const prefix = 'gio-tag';
  it('getTypeClass', () => {
    expect(getTypeClass(prefix, 'normal')).toBe('');
    expect(getTypeClass(prefix, 'prorupt', true)).toBe('gio-tag-prorupt');
    expect(getTypeClass(prefix, 'large', true)).toBe('gio-tag-prorupt gio-tag-large');
  });
  it('getStatusClass', () => {
    expect(getStatusClass(prefix, 'success')).toBe('gio-tag-status-success');
  });
  it('getColorClass', () => {
    expect(getColorClass(prefix, 'beta')).toBe('gio-tag-color-beta');
  });
  it('getDeleteToggleClass', () => {
    expect(getDeleteToggleClass(prefix, false)).toBe('gio-tag-delete-toggle');
  });
  it('getDisabledClass', () => {
    expect(getDisabledClass(prefix, true)).toBe('gio-tag-disabled');
  });
});
