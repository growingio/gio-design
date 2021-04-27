import React, { ComponentType } from 'react';
import { get, groupBy } from 'lodash';

type GetDisplayName = (x: ComponentType) => string;
export const getDisplayName: GetDisplayName = (Component) => Component.displayName || Component.name || 'Component';

const getGroupedOptions = (options: any[]) => {
  const hasNotGroup = !options.some((option: any) => {
    if (option?.groupLabel) {
      return true;
    } 
    return false;
  });

  if (hasNotGroup) {
    return options;
  }

  const groupedOptions = groupBy(options, 'groupLabel');
  return Object.keys(groupedOptions).reduce((opts: any[], groupKey: string) => {
    const group = get(groupedOptions, `${groupKey}.0.group`);
    const groupValue = get(groupedOptions, `${groupKey}.0.groupValue`);
    return opts.concat([
      {
        id: groupValue || groupKey,
        value: groupValue || groupKey,
        name: groupKey,
        label: groupKey,
        type: 'groupLabel',
        group,
      },
      ...groupedOptions[groupKey],
    ]);
  }, []);
};

export interface WithGroupedOptionsProps {
  options: any[];
  groups?: any[];
  originalOptions?: any[];
}

const withGroupedOptions = (Component: any, getGroupedFunc = getGroupedOptions): any => {
  class HOC extends React.PureComponent<any> {
    public static displayName = `GroupedOptionsProvider(${getDisplayName(Component)})`;

    public render() {
      const { options } = this.props;
      const groupedOptions = getGroupedOptions(options);
      let groups;
      if (getGroupedFunc === getGroupedOptions) {
        groups = groupedOptions;
      } else {
        groups = getGroupedFunc(options);
      }
      return (
        <Component {...this.props} options={groupedOptions} groups={groups} originalOptions={options} />
      );
    }
  }
  return HOC;
};

export default withGroupedOptions;
