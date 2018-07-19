import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import logo from '../logo.png';
import { Address, AccountHttp } from 'nem-library';
import nem from 'nem-sdk';
import '../App.css';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  accoutntInfo: {
    textAlign: 'left',
  },
  input: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class App extends Component {
  state = {
    address: process.env.REACT_APP_ADDRESS,
    account: '',
    balance: '',
    receiverAdd: '',
    amount: 0,
  };
  componentDidMount = () => {
    const address = new Address(this.state.address);

    new AccountHttp()
      .getFromAddress(address)
      .subscribe(accountInfoWithMetaData => {
        this.setState({
          account: accountInfoWithMetaData.publicAccount.publicKey,
          balance: accountInfoWithMetaData.balance,
        });
      });
  };
  formatXem = value => {
    let a = nem.utils.format.nemValue(value);

    if (Array.isArray(a)) {
      return a[0] + '.' + a[1];
    }
  };
  onhandleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Account</h1>
        </header>

        <div className={classes.accoutntInfo}>
          <p>Address: {this.state.address}</p>
          <p>Public Key: {this.state.account}</p>
          <p>Balance : {this.formatXem(this.state.balance.balance)} XEM</p>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
