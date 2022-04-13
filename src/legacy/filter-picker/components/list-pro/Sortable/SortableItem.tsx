import React, { cloneElement } from 'react';
import classnames from 'classnames';
import { findDOMNode } from 'react-dom';
import reactDnd, { DragSource, DropTarget } from 'react-dnd';

export interface ItemWithId {
  value: string | number;
  canDrag: boolean;
}

export interface SortableItemProps {
  template: React.ReactElement<any>;
  index: number;
  position: number;
  sortData: ItemWithId;
  className?: string;
  canDrag: boolean;
  onDrop: () => any;
  onCancel: () => any;
  onHover: (sourcePosition: number, targetPosition: number) => any;
}

export interface WrappedSortableItemProps extends SortableItemProps {
  connectDragSource: reactDnd.ConnectDragSource;
  connectDropTarget: reactDnd.ConnectDropTarget;
  isDragging: boolean;
  isOver: boolean;
  prefixCls?: string;
}

const dragSource = {
  beginDrag(props: SortableItemProps) {
    return {
      position: props.position,
    };
  },

  endDrag(props: SortableItemProps, monitor: reactDnd.DragSourceMonitor) {
    if (monitor.didDrop()) {
      props.onDrop();
    } else {
      props.onCancel();
    }
  },

  canDrag(props: SortableItemProps) {
    return props.canDrag;
  },
};

const dropTarget = {
  hover(props: SortableItemProps, monitor: reactDnd.DropTargetMonitor) {
    const sourcePosition = (monitor.getItem() as SortableItemProps).position;
    const targetPosition = props.position;

    if (sourcePosition !== targetPosition) {
      props.onHover(sourcePosition, targetPosition);
    }
  },
};

function collectSource(connect: reactDnd.DragSourceConnector, monitor: reactDnd.DragSourceMonitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

function collectTarget(connect: reactDnd.DropTargetConnector, monitor: reactDnd.DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

interface State {
  hovered: boolean;
}

class Item extends React.PureComponent<WrappedSortableItemProps, State> {
  constructor(props: WrappedSortableItemProps) {
    super(props);
    this.state = {
      hovered: false,
    };
  }

  public componentDidMount() {
    const ref = this._createRef();
    const { connectDragSource, connectDropTarget } = this.props;
    /*eslint-disable */
    const domNode = findDOMNode(this.refs[ref]) as any as React.ReactElement<{}>;
    /* eslint-enable */
    connectDragSource(domNode);
    connectDropTarget(domNode);
  }

  private _onDragStart = () => {
    this.setState({
      hovered: false,
    });
  };

  private _onMouseEnter = () => {
    this.setState({
      hovered: true,
    });
  };

  private _onMouseLeave = () => {
    this.setState({
      hovered: false,
    });
  };

  private _createRef() {
    const { position, sortData } = this.props;
    const { value } = sortData;
    return `${value}${position}`;
  }

  public render() {
    const { isOver, template, sortData, index, className, isDragging, prefixCls = 'gio-sortable' } = this.props;
    const { hovered } = this.state;
    return cloneElement(template, {
      sortData,
      index,
      isOver,
      isDragging,
      ref: this._createRef(),
      onMouseEnter: this._onMouseEnter,
      onMouseLeave: this._onMouseLeave,
      onDragStart: this._onDragStart,
      className: classnames(className, `${prefixCls}-item`, {
        'is-over': isOver,
        'is-dragging': isDragging,
        'is-hovered': hovered,
      }),
    });
  }
}

export default () => {
  const type = 'item';
  return DragSource(type, dragSource, collectSource)(DropTarget(type, dropTarget, collectTarget)(Item));
};
