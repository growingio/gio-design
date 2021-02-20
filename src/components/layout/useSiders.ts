import { useState, useMemo, useCallback } from 'react';
import { SiderState } from './interfaces';

const useSiders = (): [
  SiderState[],
  number,
  (siderId: string) => void,
  (sider: SiderState) => void,
  [number, number]
] => {
  const [siders, setSiders] = useState<SiderState[]>([]);

  const removeSider = (siderId: string) => {
    setSiders((_siders) => _siders.filter((_sider) => _sider.id !== siderId));
  };

  const updateSiders = useCallback((incomingSider: SiderState) => {
    setSiders((_siders) => {
      return [..._siders.filter((_sider) => _sider.id !== incomingSider.id), incomingSider];
    });
  }, []);

  const sidersWidth = useMemo(() => siders.reduce((prev: number, current: SiderState) => prev + current.width, 0), [
    siders,
  ]);

  const margin: [number, number] = useMemo(
    () => [
      siders.find((sider) => sider.suspendedPosition === 'left')?.collapsedWidth ?? 0,
      siders.find((sider) => sider.suspendedPosition === 'right')?.collapsedWidth ?? 0,
    ],
    [siders]
  );

  return [siders, sidersWidth, removeSider, updateSiders, margin];
};

export default useSiders;
