import { PositioningStrategy } from '@popperjs/core';
import { Modifier, usePopper } from 'react-popper';
import { placements } from './interface';

export interface UsePopProps {
  referenceElement: any;
  popperElement: any;
  placement: string;
  modifiers: ReadonlyArray<Modifier<any>>;
  strategy: PositioningStrategy;
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

const getMaxHeight = (element: HTMLElement, maxHeight = 0): number => {
  if (!element) {
    return maxHeight;
  }
  const elHeight = element.offsetHeight;
  const newMax = elHeight > maxHeight ? elHeight : maxHeight;
  if (element.parentElement) {
    return getMaxHeight(element.parentElement, newMax);
  }
  return newMax;
};

const usePop = ({ referenceElement, popperElement, placement, modifiers, strategy }: UsePopProps) => {
  const { styles, attributes, ...popperProps } = usePopper(referenceElement, popperElement, {
    placement: placements[placement],
    modifiers,
    strategy,
  });
  if (popperElement) {
    const three = clear3D(styles?.popper?.transform as string);
    if (Array.isArray(three)) {
      const [x, y, z] = three;
      const divHeight = popperElement.offsetHeight;
      const winHeight = getMaxHeight(referenceElement);

      if (styles?.popper?.bottom === 'auto') {
        let yField = y < 0 ? 0 : y;
        yField = yField + divHeight > winHeight ? winHeight - divHeight : yField;
        styles.popper.transform = `translate3d(${x}px, ${yField}px, ${z || 0}px)`;
      } else if (styles?.popper?.bottom === '0') {
        const maxYField = winHeight - (window.pageYOffset + window.innerHeight);
        const yField = y + divHeight > maxYField ? maxYField : y;
        styles.popper.transform = `translate3d(${x}px, ${yField}px, ${z || 0}px)`;
      }
    }
  }
  return { styles, attributes, ...popperProps };
};

export default usePop;
