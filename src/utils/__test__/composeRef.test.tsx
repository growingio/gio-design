/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable max-classes-per-file */
// @ts-nocheck
import React from 'react';
import { render } from '@testing-library/react';
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
      const ref1 = { current: null };
      const ref2 = { current: null };
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
    class Holder extends React.Component {
      render() {
        // eslint-disable-next-line react/destructuring-assignment
        return this.props.children;
      }
    }

    it('function component', () => {
      const holderRef = React.createRef();

      function FC() {
        return <div />;
      }

      render(
        <Holder ref={holderRef}>
          <FC />
        </Holder>
      );
      expect(supportRef(FC)).toBeFalsy();
      expect(supportRef((holderRef.current as any).props.children)).toBeFalsy();
    });

    it('arrow function component', () => {
      const holderRef = React.createRef();

      // Use eval since jest will convert arrow function to function
      // eslint-disable-next-line no-eval
      const FC = eval('() => null');
      render(
        <Holder ref={holderRef}>
          <FC />
        </Holder>
      );
      expect(supportRef(FC)).toBeFalsy();
      expect(supportRef((holderRef.current as any).props.children)).toBeFalsy();
    });

    it('forwardRef function component', () => {
      const holderRef = React.createRef();

      const FRC = React.forwardRef(() => <div />);
      render(
        <Holder ref={holderRef}>
          <FRC />
        </Holder>
      );
      expect(supportRef(FRC)).toBeTruthy();
      expect(supportRef(holderRef.current.props.children)).toBeTruthy();
    });

    it('class component', () => {
      const holderRef = React.createRef();

      class CC extends React.Component {
        constructor() {
          super();
          this.state = {};
        }

        render() {
          return null;
        }
      }
      render(
        <Holder ref={holderRef}>
          <CC />
        </Holder>
      );
      expect(supportRef(CC)).toBeTruthy();
      expect(supportRef(holderRef.current.props.children)).toBeTruthy();
    });

    it('memo of function component', () => {
      const holderRef = React.createRef();

      const FC = () => <div />;
      const MemoFC = React.memo(FC);
      render(
        <Holder ref={holderRef}>
          <MemoFC />
        </Holder>
      );
      expect(supportRef(MemoFC)).toBeFalsy();
      expect(supportRef(holderRef.current.props.children)).toBeFalsy();
    });

    it('memo of forwardRef function component', () => {
      const holderRef = React.createRef();

      const FRC = React.forwardRef(() => <div />);
      const MemoFC = React.memo(FRC);
      render(
        <Holder ref={holderRef}>
          <MemoFC />
        </Holder>
      );
      expect(supportRef(MemoFC)).toBeTruthy();
      expect(supportRef(holderRef.current.props.children)).toBeTruthy();
    });
  });
});
