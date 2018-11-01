import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppProvider, AppConsumer } from '../context/AppContext';

export default class Cart extends Component {
  render() {
    return (
      <AppConsumer>
        {({ items }) => (
          ReactDOM.createPortal(
            <div className="cartdemo">
              <h2 className="cartdemo__heading">Cart Items</h2>
              { items.map((item, i) =>
                <div
                  key={i}
                  className="cartdemo__item">
                  { item.timestamp }
                </div>
              ) }
            </div>,
            document.getElementById('cart'),
          )
        )}
      </AppConsumer>
    )
  }
}
