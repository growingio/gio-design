import React, { Component, forwardRef, memo } from 'react';
import { composeRef, supportRef } from '../composeRef';

describe('ref', () => {
  describe('composeRef', () => {
    it('basic', () => {
      const refFunc1 = jest.fn();
      const refFunc2 = jest.fn();

      const mergedRef = composeRef(refFunc1, refFunc2);
      const testRefObj = {};
      if (typeof mergedRef === 'function') {
        mergedRef(testRefObj);
        expect(refFunc1).toHaveBeenCalledWith(testRefObj);
        expect(refFunc2).toHaveBeenCalledWith(testRefObj);
      } else {
        throw new Error('The mergedRef should be a function');
      }
    });

    it('object ref', () => {
      const ref1 = { current: null } as any;
      const ref2 = { current: null } as any;
      const mergedRef = composeRef(ref1, ref2);
      if (typeof mergedRef === 'function') {
        const refObj = {};
        mergedRef(refObj);
        expect(ref1.current).toBe(refObj);
        expect(ref2.current).toBe(refObj);
      }
    });
  });

  describe('supportRef', () => {
    it('Function Component should not support ref', () => {
      const FC = () => <div />;
      expect(supportRef(<FC />)).toBe(false);
    });

    it('forwardRef(FC) should support ref', () => {
      const FC = forwardRef(() => <div />);
      expect(supportRef(<FC />)).toBe(true);
    });

    it('Native tag should support ref', () => {
      expect(supportRef(<div />)).toBe(true);
    });

    it('memo(FC) should not support ref', () => {
      const FC = memo(() => <div />);
      expect(supportRef(<FC />)).toBe(false);
    });

    it('memo(forwardRef(FC)) should support ref', () => {
      const FC = memo(forwardRef(() => <div />));
      expect(supportRef(<FC />)).toBe(true);
    });

    it('Class Component should support ref', () => {
      // eslint-disable-next-line react/prefer-stateless-function
      class CC extends Component {
        render() {
          return <div />;
        }
      }
      expect(supportRef(<CC />)).toBe(true);
    });

    it('Only React Element support ref', () => {
      expect(supportRef('string')).toBe(false);
      expect(supportRef(123)).toBe(false);
      expect(supportRef({})).toBe(false);
      expect(supportRef(true)).toBe(false);
      expect(supportRef(null)).toBe(false);
      expect(supportRef(undefined)).toBe(false);
      expect(supportRef(Symbol('sym'))).toBe(false);
    });
  });
});
