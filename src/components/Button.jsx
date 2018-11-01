import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppConsumer } from '../context/AppContext';

export default class Button extends Component {
  render() {
    return (
      <AppConsumer>
        {({ addItem }) => (
          ReactDOM.createPortal(
            <button
              onClick={() => addItem({ timestamp: Date.now() })}>
              { this.props.children }
            </button>,
            document.getElementById('button'),
          )
        )}
      </AppConsumer>
    )
  }
}
