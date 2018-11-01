import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppProvider, AppConsumer } from '../context/AppContext';

export default class Cart extends Component {
  render() {
    return (
      <AppConsumer>
        {({ items }) => (
          ReactDOM.createPortal(
            items.map((item, i) =>
              <div
                key={i}
                className="cart__item">
                { item.timestamp }
              </div>
            ),
            document.getElementById('cart'),
          )
        )}
      </AppConsumer>
    )
  }
}
