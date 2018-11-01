import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CyberSourceInput from './CyberSourceInput';

/**
 * Microform Demo
 * Test CC #: 4111 1111 1111 1111
 */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.exampleInputRef = React.createRef();
    this.formRef = React.createRef();
    this.requestFormSubmit = this.requestFormSubmit.bind(this);
    this.onTokenCreated = this.onTokenCreated.bind(this);
    this.state = {
      needsToken: false
    }
  }
  /**
   * Trigger CardInput to generate a transaction token
   */
  requestFormSubmit() {
    this.setState({
      needsToken: true
    });
  }
  /**
   * Submit Form with token
   */
  onTokenCreated() {
    console.log('Token Created');
    this.setState({
      needsToken: false
    });
    this.formRef.current.submit();
  }
  render() {
    const {
      state,
      exampleInputRef,
      requestFormSubmit,
      onTokenCreated,
      formRef
    } = this;
    const { needsToken } = state
    return (
      <div className="microform-demo">
        <h6 className="text-warning">Open Console to see form field events</h6>
        <form ref={formRef} action="/payment" method="POST">
          <div className="form-group">
            <label htmlFor="example-email-input">Email address</label>
            <input ref={exampleInputRef} type="email" className="form-control" id="example-email-input" aria-describedby="emailHelp" placeholder="Enter email"/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label id="cardNumber-label">Card Number</label>
            <CyberSourceInput
              needsToken={needsToken}
              onTokenCreated={onTokenCreated}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={requestFormSubmit}>Pay</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('cybersource-app'),
);
