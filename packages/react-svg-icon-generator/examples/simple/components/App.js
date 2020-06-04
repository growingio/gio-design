/* eslint-disable no-alert */
import React, { Component } from 'react';
import Icon from './Icon';

export default class App extends Component {
  render() {
    return (
      <div>
        Simple possible usage
        <Icon kind='clock' />

        Setup color and bounding width and height
        <Icon kind='close' color='#748' width={200} height={100} />

        Setup color and bounding width and height to size (square)
        <Icon kind='close' color='red' size={300} />

        Setup custom style and className
        <Icon kind="arrow_left" style={{transform: 'scaleX(-1)'}} className="custom-class" />

        Setup onClick behavior
        <Icon kind='close' onClick={() => alert('clicked on icon')} />

        Show all icons with description (for finding right icon)
        <Icon preview />
      </div>
    );
  }
}
