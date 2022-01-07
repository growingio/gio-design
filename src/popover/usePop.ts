import { PositioningStrategy } from '@popperjs/core';
import { Modifier, usePopper } from 'react-popper';
import { placements } from './interface';

export interface UsePopProps {
  referenceElement: any;
  popperElement: any;
  placement: string;
  modifiers: ReadonlyArray<Modifier<any>>;
  strategy: PositioningStrategy;
  container: HTMLElement;
}

const clear = (text: string) => (replaces: string[]) => {
  let replaceText = text;
  replaces.forEach((replace) => {
    while (replaceText.indexOf(replace) > -1) {
      replaceText = replaceText.replace(replace, '');
    }
  });
  return replaceText;
};

const clear3D = (transform: string): string | number[] => {
  if (!transform) {
    return transform;
  }

  if (transform.indexOf('translate3d') !== -1) {
    const text = clear(transform)(['translate3d(', 'px', ')']);
    return text.split(',').map((value) => Number(value));
  }
  if (transform.indexOf('translate') !== -1) {
    const text = clear(transform)(['translate(', 'px', ')']);
    return text.split(',').map((value) => Number(value));
  }
  return transform;
};

const getShowHeight = (container: any) => container?.offsetHeight || window.innerHeight;

const usePop = ({ referenceElement, popperElement, placement, modifiers, strategy, container }: UsePopProps) => {
  const { styles, attributes, ...popperProps } = usePopper(referenceElement, popperElement, {
    placement: placements[placement],
    modifiers,
    strategy,
  });
  if (popperElement) {
    const three = clear3D(styles?.popper?.transform as string);
    console.log(styles.popper);
    if (Array.isArray(three)) {
      const [x, y, z] = three;
      const divHeight = popperElement.offsetHeight;
      const winHeight = getShowHeight(container);
      console.log(winHeight);
      if (styles?.popper?.bottom === 'auto') {
        // let yField = y < 0 ? 0 : y;
        let yField = y;
        yField = yField + divHeight > winHeight ? winHeight - divHeight : yField;
        styles.popper.transform = `translate3d(${x}px, ${yField}px, ${z || 0}px)`;
      } else if (styles?.popper?.bottom === '0') {
        // const yField = y + divHeight > 0 ? 0 : y;
        const yField = y;
        styles.popper.transform = `translate3d(${x}px, ${yField}px, ${z || 0}px)`;
      }
    }
    console.log(styles.popper.transform);
  }
  return { styles, attributes, ...popperProps };
};

export default usePop;
