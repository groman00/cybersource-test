import React from 'react';
import ReactDOM from 'react-dom';
import { AppProvider } from './context/AppContext';
import Cart from './components/Cart';
import Button from './components/Button';

// Preserving original cybersource demo
require('./components/App.jsx');

// Create App with portal components
const PortalsApp = () => (
  <AppProvider>
    <Button>
      Add to Cart
    </Button>
    <Cart/>
  </AppProvider>
);

ReactDOM.render(
  <PortalsApp/>,
  document.getElementById('app'),
);
