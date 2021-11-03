import React from 'react';

const TabsContext = React.createContext<{ activeValue: React.Key }>({ activeValue: 0 });

export default TabsContext;
