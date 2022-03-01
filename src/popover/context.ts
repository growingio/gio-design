import * as React from 'react';

interface TriggerContextProps {
  onPopupMouseDown: React.MouseEventHandler<HTMLElement>;
}

const TriggerContext = React.createContext<TriggerContextProps | null>(null);

export default TriggerContext;
