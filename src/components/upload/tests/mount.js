import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Upload from '..';

export function mountTest(type) {
  describe('mount and unmount', () => {
    it(`${type} Upload could be updated and unmounted without errors`, () => {
      const wrapper = mount(<Upload type={type} />);
      expect(() => {
        wrapper.setProps({});
        wrapper.unmount();
      }).not.toThrow();
    });
  });
}

export function mountSnapshot(type) {
  describe('match snapshot', () => {
    it('should match snapshot', () => {
      const domTree = renderer.create(<Upload className="gio-customized-upload" disabled />).toJSON();
      expect(domTree).toMatchSnapshot();
    });
  });
}
