import React, { Component } from 'react';

export default class CyberSourceInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instance: undefined, // Microform instance
      jwk: undefined,
      token: '',
    }
  }
  /**
   * Fetch key
   * Note: This should be done server side!
   */
  componentDidMount() {
    fetch('/key')
      .then((response) => response.json())
      .then(({ jwk }) => {
        this.setState({ jwk });
      });
  }
  /**
   * componentDidUpdate
   * @param {*} prevProps
   */
  componentDidUpdate(prevProps, prevState) {
    /* Initialize Microform when we have a jwk. */
    if (!prevState.jwk && typeof this.state.jwk === 'object') {
      this.createInput();
    }
    /* Bind all events when we have a Microform instance */
    if (!prevState.instance && this.state.instance) {
        this.eventsDemo();
    }
    /* Generate token */
    if (!prevProps.needsToken && this.props.needsToken) {
      this.generateToken();
    }
  }
  /**
   * Bind all form events
   */
  eventsDemo() {
    const { instance } = this.state;
    [
      'enabled',
      'disabled',
      'focus',
      'blur',
      'empty',
      'notEmpty',
      'cardTypeChange',
      'validationChange',
      'inputSubmitRequest',
      'tokenizeLoadStart',
      // 'autocomplete', // This event throws an error.
      // 'autocompleteChange' // '' '' '' '' ''
    ].forEach(event => instance.on(event, (data) => {
      console.log(event, data);
    }));
  }
  generateToken() {
    // Send in optional parameters from other parts of your payment form
    const options = {
      // cardExpirationMonth: //,
      // cardExpirationYear: //,
      // cardType: //
    };
    this.state.instance.createToken(options, (tokenError, response) => {
      if (tokenError) {
        console.log(tokenError)
        return;
      }
      this.setState({
        token: JSON.stringify(response)
      });
      this.props.onTokenCreated();
    });

  }
  createInput() {
    const { jwk, token } = this.state;
    // const { exampleInput } = this.props;
    // const computedStyles = window.getComputedStyle(exampleInput);
    // Set up microform with options
    FLEX.microform({
        keyId: jwk.kid,
        keystore: jwk,
        container: '#cardNumber-container',
        label: '#cardNumber-label',
        placeholder: 'Enter card number',
        styles: {
          input: {
            // Cherry pick computed styles needed for input text
            // 'font-size': computedStyles.fontSize,
            // 'font-family': computedStyles.fontFamily,
            // 'color': computedStyles.color,
          },
          ':focus': {
            'color': 'blue'
          },
          ':disabled': {
            'cursor': 'not-allowed'
          },
          'valid': {
            'color': '#3c763d'
          },
          'invalid': {
            'color': '#a94442'
          },
        },
        encryptionType: 'rsaoaep',
      },
      // Handle new microform instance
      (setupError, microformInstance) => {
        if (setupError) {
          console.log('setupError', setupError);
          return;
        }
        this.setState({
          instance: microformInstance
        });
      }
    );
  }
  render() {
    return (
      <div id="cardNumber-container" className="form-control microform-input">
        <input type="hidden" name="token" value={this.state.token}/>
      </div>
    );
  }
}
