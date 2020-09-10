import React from 'react';
import { mount } from 'enzyme';
import { StepModal } from '..';
import * as Steps from './steps';

const { multiBranchSteps, steps } = Steps;
describe('StepModal snapshot match', () => {
  it('should match basic StepModal snapshot.', () => {
    const wrapper = mount(
      <StepModal
        visible
        title="Modal Title"
        onClose={() => {
          console.log('close');
        }}
        onOk={() => {
          console.log('ok');
        }}
        afterClose={() => console.log('after close')}
        steps={steps}
        closeAfterOk
      >
        Modal Body
      </StepModal>
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should match multi branches StepModal snapshot.', () => {
    const wrapper = mount(
      <StepModal
        visible
        title="Modal Title"
        onClose={() => {
          console.log('close');
        }}
        onOk={() => {
          console.log('ok');
        }}
        afterClose={() => console.log('after close')}
        steps={multiBranchSteps}
        closeAfterOk
      >
        Modal Body
      </StepModal>
    );
    expect(wrapper.render()).toMatchSnapshot();
  });
});
