import React from 'react';
import _ from 'lodash';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import createSortableItem, { ItemWithId } from './SortableItem';

export interface SortableCollectionProps {
  container: string;
  collection: ItemWithId[];
  onSorted: (collection: ItemWithId[]) => any;
  getId?: (item: ItemWithId, index: number) => string;
  template: React.ReactElement<any>;
}

export interface SortableCollectionState {
  collection: ItemWithId[];
  SortableItemClass: React.Component;
}

interface State {
  collections: ItemWithId[],
  SortableItemClass: any,
  stateChanged: boolean,
}

export default class SortableCollection extends React.PureComponent<SortableCollectionProps, State> {
  public static defaultProps = { container : 'div' };

  constructor(props:SortableCollectionProps){
    super(props);
    const { collection } = this.props;
    this.state = {
      collections: collection,
      SortableItemClass: createSortableItem(),
      stateChanged: false,
    }
  }

  public static getDerivedStateFromProps(nextProps: SortableCollectionProps, state: any) {
    if (state.stateChanged) {
      return { ...state, stateChanged: false };
    }
    return { collections: nextProps.collection };
  }

  private _handleHover = (originalSourcePosition: number, originalTargetPosition: number) => {
    const { collection } = this.props;
    const { collections } = this.state;
    const source = collection[originalSourcePosition];
    const currentSourcePosition = collections.indexOf(source);
    const target = collection[originalTargetPosition];
    const currentTargetPosition = collections.indexOf(target);
    if (source) {
      // eslint-disable-next-line react/no-access-state-in-setstate
      const newCollection = [...collections];
      newCollection.splice(currentSourcePosition, 1);
      newCollection.splice(currentTargetPosition, 0, source);
      this.setState({ collections: newCollection, stateChanged: true });
    }
  };

  private _handleDrop = () => {
    const { collection, onSorted } = this.props;
    const { collections } = this.state;
    if (collection !== collections) {
      onSorted(collections);
    }
  };

  private _handleCancel = () => {
    const { collection } = this.props;
    this.setState({ collections: collection, stateChanged: true });
  };

  public render() {
    const { collection, getId, template, container } = this.props;
    const { collections, SortableItemClass } = this.state;
    const SortableItem = SortableItemClass;

    const children = collections.map((props: ItemWithId, i: number) => {
      const originalPosition = collection.indexOf(props);
      const key = getId ? getId(props, i) : props.value;
      const canDrag = props.canDrag === false ? props.canDrag : true;
      return (
        <SortableItem
          sortData={props}
          canDrag={canDrag}
          index={i}
          key={key}
          position={originalPosition}
          onHover={this._handleHover}
          onDrop={this._handleDrop}
          onCancel={this._handleCancel}
          template={template}
        />
      );
    });

    return (
      <DndProvider backend={HTML5Backend as any}>
        {React.createElement(
          container,
          _.omit(this.props, ['collection', 'container', 'onSorted', 'template']),
          children
        )}
      </DndProvider>
    );
  }
}
