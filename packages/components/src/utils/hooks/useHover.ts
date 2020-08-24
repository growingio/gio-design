import { useCallback, useRef, MouseEvent } from 'react';
import useToggle from './useToggle';

export interface HoverOptions {
  delay?: number;
  onEnter?: (event: MouseEvent) => void;
  onLeave?: (event: MouseEvent) => void;
}

export interface HoverCallbacks {
  onMouseEnter: (event: MouseEvent) => void;
  onMouseLeave: (event: MouseEvent) => void;
}

export function useHover({ delay = 0, onEnter, onLeave }: HoverOptions = {}): [boolean, HoverCallbacks] {
  const [inHover, actions] = useToggle();
  const tick = useRef<any>(-1);
  const enter = useCallback(
    (e: MouseEvent) => {
      clearTimeout(tick.current);
      if (inHover) {
        return;
      }
      const trigger = () => {
        actions.setRight();
        onEnter?.(e);
      };
      if (delay) {
        tick.current = setTimeout(trigger, delay);
      } else {
        trigger();
      }
    },
    [delay, actions, onEnter]
  );
  const leave = useCallback(
    (e: MouseEvent) => {
      clearTimeout(tick.current);
      if (inHover) {
        return;
      }
      const trigger = () => {
        actions.setLeft();
        onLeave?.(e);
      };
      if (delay) {
        tick.current = setTimeout(trigger, delay);
      } else {
        trigger();
      }
    },
    [delay, actions, onLeave]
  );
  return [
    inHover,
    {
      onMouseEnter: enter,
      onMouseLeave: leave,
    },
  ];
}

export default useHover;
