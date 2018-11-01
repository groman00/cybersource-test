import React, { Component } from 'react';

const Context = React.createContext({});

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      addItem: this.addItem.bind(this),
    };;
  }
  addItem(item) {
    this.setState(state => ({
      items: [...state.items, item],
    }));
  }
  render() {
    const { children } = this.props;
    return (
      <Context.Provider value={this.state}>
        {children}
      </Context.Provider>
    );
  }
}

export const AppConsumer = Context.Consumer;
