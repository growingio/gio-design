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

const clear = (text: string) => {
  return (replaces: string[]) => {
    let replaceText = text;
    replaces.forEach((replace) => {
      while (replaceText.indexOf(replace) > -1) {
        replaceText = replaceText.replace(replace, '');
      }
    });
    return replaceText;
  };
};

const clear3D = (transform: string): string | Number[] => {
  if (!transform) {
    return transform;
  }
  if (transform.indexOf('translate3d') === -1) {
    return transform;
  }
  const text = clear(transform)(['translate3d(', 'px', ')']);
  return text.split(',').map((value) => Number(value));
};

const usePop = ({ referenceElement, popperElement, placement, modifiers, strategy }: UsePopProps) => {
  const { styles, attributes, ...popperProps } = usePopper(referenceElement, popperElement, {
    placement: placements[placement],
    modifiers,
    strategy,
  });
  if (popperElement) {
    const three = clear3D(styles.popper.transform);
    if (three && typeof three !== 'string') {
      const [x, y, z] = three;

      const divHeight = popperElement.offsetHeight;
      const winHeight = window.innerHeight;

      let yField = y < 0 ? 0 : y;
      yField = yField + divHeight > winHeight ? winHeight - divHeight : yField;

      styles.popper.transform = `translate3d(${x}px, ${yField}px, ${z}px)`;
    }
  }
  return { styles, attributes, ...popperProps };
};

export default usePop;
