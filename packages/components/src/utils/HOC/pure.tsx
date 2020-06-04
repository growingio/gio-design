import * as React from 'react';
type GetDisplayName = (x: React.ComponentType) => string;

export const getDisplayName: GetDisplayName = (Component) => Component.displayName || Component.name || 'Component';

function pure<P>(Component: React.FC<P>): React.ComponentType<P> {
  class HOC extends React.PureComponent<P> {
    public static displayName: string;
    public render() {
      return <Component {...this.props} />;
    }
  }
  HOC.displayName = `withPure(${getDisplayName(Component)})`;
  return HOC;
}

export default pure;
