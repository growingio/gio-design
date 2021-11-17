import { useState, useMemo, useCallback } from 'react';
import { SiderState } from './interfaces';

const useSiders = (): [SiderState[], (siderId: string) => void, (sider: SiderState) => void, [number, number]] => {
  const [siders, setSiders] = useState<SiderState[]>([]);

  const removeSider = (siderId: string) => {
    setSiders((_siders) => _siders.filter((_sider) => _sider.id !== siderId));
  };

  const updateSiders = useCallback((incomingSider: SiderState) => {
    setSiders((_siders) => [..._siders.filter((_sider) => _sider.id !== incomingSider.id), incomingSider]);
  }, []);

  const margin: [number, number] = useMemo(
    () => [
      siders.find((sider) => sider.suspendedPosition === 'left')?.collapsedWidth ?? 0,
      siders.find((sider) => sider.suspendedPosition === 'right')?.collapsedWidth ?? 0,
    ],
    [siders]
  );

  return [siders, removeSider, updateSiders, margin];
};

export default useSiders;
