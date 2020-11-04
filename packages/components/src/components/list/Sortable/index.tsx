import React from 'react';
import createSortableItem, { ItemWithId } from './SortableItem';
import _ from 'lodash';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

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

export default class SortableCollection extends React.PureComponent<SortableCollectionProps, {}> {
  public static defaultProps = { container: 'div' };

  public static getDerivedStateFromProps(nextProps: SortableCollectionProps, state: any) {
    if (state.stateChanged) {
      return { ...state, stateChanged: false };
    }
    return { collection: nextProps.collection };
  }

  public state: any = {
    collection: this.props.collection,
    SortableItemClass: createSortableItem(),
    stateChanged: false,
  };

  public render() {
    const SortableItem = this.state.SortableItemClass;

    const children = this.state.collection.map((props: ItemWithId, i: number) => {
      const originalPosition = this.props.collection.indexOf(props);
      const key = this.props.getId ? this.props.getId(props, i) : props.value;
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
          template={this.props.template}
        />
      );
    });

    return (
      <DndProvider backend={HTML5Backend as any}>
        {React.createElement(
          this.props.container,
          _.omit(this.props, ['collection', 'container', 'onSorted', 'template']),
          children
        )}
      </DndProvider>
    );
  }

  private _handleHover = (originalSourcePosition: number, originalTargetPosition: number) => {
    const source = this.props.collection[originalSourcePosition];
    const currentSourcePosition = this.state.collection.indexOf(source);
    const target = this.props.collection[originalTargetPosition];
    const currentTargetPosition = this.state.collection.indexOf(target);
    console.log('====================================');
    console.log(this.state.collection);
    console.log('====================================');
    if (source) {
      const newCollection = [...this.state.collection];
      newCollection.splice(currentSourcePosition, 1);
      newCollection.splice(currentTargetPosition, 0, source);
      this.setState({ collection: newCollection, stateChanged: true });
    }
  };

  private _handleDrop = () => {
    if (this.props.collection !== this.state.collection) {
      this.props.onSorted(this.state.collection);
    }
  };

  private _handleCancel = () => {
    this.setState({ collection: this.props.collection, stateChanged: true });
  };
}
